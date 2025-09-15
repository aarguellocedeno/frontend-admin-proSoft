"use client";
import { motion, Reorder } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useInvoice } from "./InvoiceContext";


export default function ItemsTable() {
const { state, dispatch } = useInvoice();
const items = state.items;


return (
<div className="card">
<h2 className="mb-3 text-base font-semibold">Ítems agregados</h2>
{items.length === 0 ? (
<p className="text-sm text-slate-500">Aún no has agregado productos.</p>
) : (
<div className="overflow-x-auto">
<table className="min-w-full text-sm">
<thead>
<tr className="text-left text-slate-500">
<th className="px-3 py-2">Producto</th>
<th className="px-3 py-2">Cantidad</th>
<th className="px-3 py-2">Precio</th>
<th className="px-3 py-2">Subtotal</th>
<th className="px-3 py-2"></th>
</tr>
</thead>
<tbody>
{items.map((item) => {
const subtotal = item.quantity * item.price;
return (
<motion.tr
key={item.id}
initial={{ opacity: 0, y: 6 }}
animate={{ opacity: 1, y: 0 }}
className="border-t"
>
<td className="px-3 py-2">
<input
className="w-full rounded-lg border p-2"
value={item.name}
onChange={(e) =>
dispatch({ type: "UPDATE_ITEM", payload: { id: item.id, patch: { name: e.target.value } } })
}
/>
</td>
<td className="px-3 py-2">
<input
type="number"
min={1}
className="w-24 rounded-lg border p-2"
value={item.quantity}
onChange={(e) =>
dispatch({ type: "UPDATE_ITEM", payload: { id: item.id, patch: { quantity: Number(e.target.value) } } })
}