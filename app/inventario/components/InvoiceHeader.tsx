"use client";
import { motion } from "framer-motion";
import { useInvoice } from "./InvoiceContext";
import { Hash } from "lucide-react";


export default function InvoiceHeader() {
const {
state: { invoiceId, date },
dispatch,
generateId,
} = useInvoice();


return (
<header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
<div>
<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Inventario</h1>
<p className="mt-1 text-sm text-slate-600">Completa los datos y agrega productos.</p>
</div>


<div className="flex flex-wrap items-center gap-2">


<div className="card flex items-center gap-3">
<span className="text-xs uppercase tracking-wide text-slate-500">Factura</span>
<span className="font-mono text-sm">{invoiceId ?? "(sin id)"}</span>
</div>

</div>
</header>
);
}