"use client";

import { useEffect, useMemo, useState } from "react";
// Tus helpers están en /lib/*.js según tu estructura:
import { getProductos, createProducto } from "@/app/lib/api";
// Estos componentes viven en app/inventario/components/*
import InventoryForm from "./components/InventoryForm";
import InventoryTable from "./components/InventoryTable";

export type Producto = {
  product_id: string;
  name: string;
  price: number;
  stock: number;
  min_stock: number;
};

const money = (v: number | string) =>
  (Number(v) || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

export default function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean | null }>({ text: "", ok: null });
  const [filtro, setFiltro] = useState("");

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      // Normaliza por si tu API cambia nombres de campos
      const normalizados: Producto[] = (data || []).map((p: any) => ({
        product_id: p.product_id ?? p._id ?? p.id ?? "",
        name: p.name ?? p.nombre ?? "",
        price: Number(p.price ?? p.precio ?? 0),
        stock: Number(p.stock ?? 0),
        min_stock: Number(p.min_stock ?? p.stockMin ?? p.stockMinimo ?? 0),
      }));
      setProductos(normalizados);
      setMsg({ text: "Inventario cargado ", ok: true });
    } catch (e: any) {
      console.error("[inventario] getProductos error:", e);
      setMsg({ text: "Error cargando inventario", ok: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const onCrear = async (form: {
    product_id: string;
    name: string;
    price: number;
    stock: number;
    min_stock: number;
  }) => {
    try {
      await createProducto(form.product_id, form.name, form.price, form.stock, form.min_stock);
      setMsg({ text: `Producto ${form.name} creado correctamente ✅`, ok: true });
      await cargarProductos(); // refresca la tabla después de crear
      return true;
    } catch (e: any) {
      console.error("[inventario] createProducto error:", e);
      setMsg({ text: e?.message || "Error al crear producto.", ok: false });
      return false;
    }
  };

  const filtrados = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter(
      (p) =>
        p.product_id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q)
    );
  }, [productos, filtro]);

  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inventario</h1>
          <p className="text-sm text-slate-600">Administra productos del catálogo</p>
        </div>
      </header>

      {/* Crear producto */}
      <section className="mb-6">
        <InventoryForm onCrear={onCrear} />
      </section>

      {/* Tabla de productos */}
      <section>
        {msg.text ? (
          <p className={`mb-3 text-sm ${msg.ok ? "text-emerald-600" : "text-red-600"}`}>{msg.text}</p>
        ) : null}

        <InventoryTable productos={filtrados} loading={loading} money={money} />
      </section>
    </main>
  );
}
