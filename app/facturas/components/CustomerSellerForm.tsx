"use client";
</div>


<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
{/* Cliente */}
<fieldset className="space-y-2">
<legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cliente</legend>
<input
className="w-full rounded-xl border p-2 text-sm"
placeholder="Nombre completo"
value={customer.name}
onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { name: e.target.value } })}
/>
<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
<input
className="rounded-xl border p-2 text-sm"
placeholder="Documento"
value={customer.document ?? ""}
onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { document: e.target.value } })}
/>
<input
className="rounded-xl border p-2 text-sm"
placeholder="Teléfono"
value={customer.phone ?? ""}
onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { phone: e.target.value } })}
/>
</div>
<input
className="w-full rounded-xl border p-2 text-sm"
placeholder="Correo electrónico"
value={customer.email ?? ""}
onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { email: e.target.value } })}
/>
<input
className="w-full rounded-xl border p-2 text-sm"
placeholder="Dirección"
value={customer.address ?? ""}
onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { address: e.target.value } })}
/>
</fieldset>


{/* Vendedor */}
<fieldset className="space-y-2">
<legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vendedor</legend>
<input
className="w-full rounded-xl border p-2 text-sm"
placeholder="Nombre del vendedor"
value={seller.name}
onChange={(e) => dispatch({ type: "SET_SELLER", payload: { name: e.target.value } })}
/>
<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
<input
className="rounded-xl border p-2 text-sm"
placeholder="Identificación"
value={seller.document ?? ""}
onChange={(e) => dispatch({ type: "SET_SELLER", payload: { document: e.target.value } })}
/>
<input
className="rounded-xl border p-2 text-sm"
placeholder="Correo"
value={seller.email ?? ""}
onChange={(e) => dispatch({ type: "SET_SELLER", payload: { email: e.target.value } })}
/>
</div>
</fieldset>
</div>


<div className="mt-4 flex items-start gap-2">
<BadgeCheck className="mt-2 h-4 w-4 text-slate-500" />
<textarea
className="w-full rounded-xl border p-3 text-sm"
placeholder="Notas de la factura (opcional)"
value={notes ?? ""}
onChange={(e) => dispatch({ type: "SET_NOTES", payload: e.target.value })}
rows={3}
/>
</div>
</div>
);
}