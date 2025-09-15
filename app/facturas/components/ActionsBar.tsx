"use client";
import { motion } from "framer-motion";
import { useInvoice } from "./InvoiceContext";
import { Printer, Eraser, Hash } from "lucide-react";


export default function ActionsBar() {
const { dispatch, generateId, state } = useInvoice();


const handlePrint = () => {
if (!state.invoiceId) generateId();
setTimeout(() => window.print(), 50);
};


const handleClear = () => {
const ok = confirm("¿Seguro que deseas limpiar la factura actual?");
if (ok) dispatch({ type: "CLEAR" });
};


return (
<div className="card flex flex-col gap-2">
<motion.button whileTap={{ scale: 0.98 }} onClick={handlePrint} className="btn btn-brand">
<Printer className="h-4 w-4" /> Imprimir factura
</motion.button>
<div className="flex gap-2">
<motion.button whileTap={{ scale: 0.98 }} onClick={generateId} className="btn flex-1 btn-ghost">
<Hash className="h-4 w-4" /> Generar ID
</motion.button>
<motion.button whileTap={{ scale: 0.98 }} onClick={handleClear} className="btn flex-1 btn-ghost">
<Eraser className="h-4 w-4" /> Limpiar
</motion.button>
</div>
<p className="text-xs text-slate-500">Nota: el botón Imprimir abre el diálogo del navegador. En producción podrás conectar el guardado en base de datos y la generación de PDF.</p>
</div>
);
}