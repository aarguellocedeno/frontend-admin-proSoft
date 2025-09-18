"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  RefreshCw,
  Filter,
  BarChart3,
  LineChart as LineIcon,
} from "lucide-react";

// ===== Helpers de formato =====
const currencyCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n || 0);

const todayISO = () => new Date().toISOString().slice(0, 10);
const addDays = (iso: string, d: number) => {
  const x = new Date(iso + "T00:00:00");
  x.setDate(x.getDate() + d);
  return x.toISOString().slice(0, 10);
};

// ===== Tipos (ahora ligados a facturas) =====
type Summary = {
  totalRevenue: number;      // suma de totales de facturas
  invoiceCount: number;      // número de facturas
  avgTicket: number;         // totalRevenue / invoiceCount
};

type SeriesPoint = { date: string; revenue: number; invoices: number };

type TopProduct = { name: string; revenue: number; units: number };

// ===== Base de API (sin process.env en el cliente) =====
const getClientApiBase = () => {
  if (typeof window !== "undefined" && (window as any).__API_BASE__) {
    return String((window as any).__API_BASE__);
  }
  return ""; // cadena vacía -> usaremos "/api" como prefijo
};

const apiUrl = (path: string) => {
  const base = getClientApiBase();
  if (path.startsWith("/")) {
    return base ? `${base}${path}` : `/api${path}`;
  }
  return base ? `${base}/${path}` : `/api/${path}`;
};

async function fetchJSON<T>(url: string) {
  const r = await fetch(url, { credentials: "include" });
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()) as T;
}

// ===== Endpoints basados en FACTURAS =====
// Puedes implementarlos en tus microservicios o proxyear en app/api/billing/reports/*
//  - GET /billing/reports/summary?from&to -> { totalRevenue, invoiceCount, avgTicket }
//  - GET /billing/reports/timeseries?from&to&groupBy -> [{ date, revenue, invoices }]
//  - GET /billing/reports/top-products?from&to&limit -> [{ name, revenue, units }]

async function getSummary(from: string, to: string): Promise<Summary> {
  const url = apiUrl(`/billing/reports/summary?from=${from}&to=${to}`);
  try {
    return await fetchJSON<Summary>(url);
  } catch {
    // Mock fallback
    const totalRevenue = 913_000_000;
    const invoiceCount = 4132;
    return {
      totalRevenue,
      invoiceCount,
      avgTicket: invoiceCount ? Math.round(totalRevenue / invoiceCount) : 0,
    };
  }
}

async function getTimeSeries(from: string, to: string, groupBy: "day" | "week" | "month"): Promise<SeriesPoint[]> {
  const url = apiUrl(`/billing/reports/timeseries?from=${from}&to=${to}&groupBy=${groupBy}`);
  try {
    return await fetchJSON<SeriesPoint[]>(url);
  } catch {
    // Mock diaria 14 días
    const days = 14;
    return Array.from({ length: days }, (_, i) => ({
      date: addDays(from, i),
      revenue: 20_000_000 + Math.round(Math.random() * 12_000_000) + i * 600_000,
      invoices: 35 + Math.round(Math.random() * 15) + Math.floor(i * 0.7),
    }));
  }
}

async function getTopProducts(from: string, to: string, limit = 8): Promise<TopProduct[]> {
  const url = apiUrl(`/billing/reports/top-products?from=${from}&to=${to}&limit=${limit}`);
  try {
    return await fetchJSON<TopProduct[]>(url);
  } catch {
    // Mock
    return [
      { name: "Camiseta ProSoft", revenue: 180_000_000, units: 940 },
      { name: "Pantalón Flex",  revenue: 125_000_000, units: 510 },
      { name: "Chaqueta Ligera", revenue: 98_000_000,  units: 300 },
      { name: "Gorra Urban",     revenue: 84_000_000,  units: 270 },
      { name: "Saco Clásico",    revenue: 79_000_000,  units: 190 },
    ].slice(0, limit);
  }
}

// ===== Pronóstico simple (suavizamiento exponencial) =====
function forecastExponential(series: SeriesPoint[], steps = 6, alpha = 0.35) {
  if (!series.length) return [] as { date: string; forecast: number }[];
  const sorted = [...series].sort((a, b) => (a.date < b.date ? -1 : 1));
  let level = sorted[0].revenue;
  for (let i = 1; i < sorted.length; i++) {
    level = alpha * sorted[i].revenue + (1 - alpha) * level;
  }
  const lastDate = sorted[sorted.length - 1].date;
  const out: { date: string; forecast: number }[] = [];
  for (let k = 1; k <= steps; k++) {
    level = alpha * level + (1 - alpha) * level; // sin tendencia/seasonal para simplificar
    out.push({ date: addDays(lastDate, k), forecast: level });
  }
  return out;
}

// ===== Hook de datos del dashboard =====
function useDashboardData() {
  const [from, setFrom] = useState(addDays(todayISO(), -13));
  const [to, setTo] = useState(todayISO());
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("day");

  const [summary, setSummary] = useState<Summary | null>(null);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const [s, ts, tp] = await Promise.all([
        getSummary(from, to),
        getTimeSeries(from, to, groupBy),
        getTopProducts(from, to, 8),
      ]);
      setSummary(s);
      setSeries(ts);
      setTopProducts(tp);
    } catch (e: any) {
      setError(e?.message || "No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, groupBy]);

  const forecast = useMemo(() => forecastExponential(series, 6, 0.35), [series]);

  // ====== Smoke tests ======
  useEffect(() => {
    console.assert(apiUrl("/billing/reports/summary").startsWith("/api"), "apiUrl debe prefijar /api sin __API_BASE__");
    console.assert(currencyCOP(123456) === new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(123456), "currencyCOP debe formatear igual que Intl");
    const f = forecastExponential([{ date: "2025-01-01", revenue: 1000, invoices: 2 }], 3, 0.5);
    console.assert(f.length === 3, "forecast debe generar 3 pasos");
    console.assert(addDays("2025-01-01", 1) === "2025-01-02", "addDays básico");
  }, []);

  return {
    from,
    to,
    setFrom,
    setTo,
    groupBy,
    setGroupBy,
    summary,
    series,
    topProducts,
    forecast,
    loading,
    error,
    refresh,
  };
}

// ===== UI Components =====
function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>
  );
}

function KpiCards({ summary }: { summary: Summary | null }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><DollarSign size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Ingresos</p>
            <p className="text-xl font-semibold">{currencyCOP(summary?.totalRevenue || 0)}</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sky-50 p-3 text-sky-600"><FileText size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Facturas</p>
            <p className="text-xl font-semibold">{summary?.invoiceCount ?? 0}</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><TrendingUp size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Ticket promedio</p>
            <p className="text-xl font-semibold">{currencyCOP(summary?.avgTicket || 0)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FiltersBar({
  from,
  to,
  setFrom,
  setTo,
  groupBy,
  setGroupBy,
  refreshing,
  onRefresh,
}: {
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  groupBy: "day" | "week" | "month";
  setGroupBy: (v: "day" | "week" | "month") => void;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border p-2 text-sm" />
            <span className="px-1 text-slate-400">—</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border p-2 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500" />
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as any)}
              className="rounded-lg border p-2 text-sm"
            >
              <option value="day">Por día</option>
              <option value="week">Por semana</option>
              <option value="month">Por mes</option>
            </select>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700 disabled:opacity-60"
        >
          <RefreshCw size={16} /> Actualizar
        </button>
      </div>
    </Card>
  );
}

function SalesTrend({ series, forecast }: { series: SeriesPoint[]; forecast: { date: string; forecast: number }[] }) {
  const data = useMemo(() => {
    const f = forecast.map((x) => ({ ...x, type: "Forecast" }));
    const s = series.map((x) => ({ ...x, type: "Real" }));
    return [
      ...s.map((x) => ({ date: x.date, Real: x.revenue })),
      ...f.map((x) => ({ date: x.date, Forecast: x.forecast })),
    ].sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [series, forecast]);


}


export default function SalesDashboardPage() {
  const {
    from,
    to,
    setFrom,
    setTo,
    groupBy,
    setGroupBy,
    summary,
    series,
    topProducts,
    forecast,
    loading,
    error,
    refresh,
  } = useDashboardData();

  const apiSource = typeof window !== "undefined" && (window as any).__API_BASE__ ? (window as any).__API_BASE__ : "/api (proxy)";

  return (
    <main className="mx-auto max-w-7xl p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard de Ventas (Facturas)</h1>
        <p className="text-sm text-slate-500">Ingresos, número de facturas, ticket promedio, tendencias y top productos</p>
      </header>

      <FiltersBar
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        refreshing={loading}
        onRefresh={refresh}
      />

      {error && (
        <div className="my-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <section className="mt-4 space-y-4">
        <KpiCards summary={summary} />

      </section>
    </main>
  );
}
