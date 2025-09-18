"use client";

import { motion } from "framer-motion";
import { useInvoice } from "./InvoiceContext";
import { Printer, Eraser, Hash } from "lucide-react";
import { createFactura } from "../../lib/api";

export default function ActionsBar() {
  const { dispatch, generateId, state } = useInvoice();

  const saveInvoice = async () => {
    if (!state.items.length) {
      alert("⚠️ Agrega al menos un producto");
      return false;
    }
    if (!state.customer.name?.trim()) {
      alert("⚠️ Ingresa el nombre del cliente");
      return false;
    }

    // La API espera [{ product_id, quantity }]
    const productos = state.items.map((it) => {
      if (!it.productId) {
        alert("⚠️ Hay ítems sin productId. Agrega desde inventario o mapea productId manualmente.");
      }
      return { product_id: it.productId ?? it.id, quantity: it.quantity };
    });

    try {
      const resp = await createFactura(state.customer.name.trim(), productos);
      if (resp?.folio) {
        dispatch({ type: "GENERATE_ID", payload: String(resp.folio) });
      } else if (!state.invoiceId) {
        generateId();
      }
      alert("✅ Factura guardada correctamente");
      return true;
    } catch (err: any) {
      const msg = (err?.message || "").toLowerCase();
      if (msg.includes("insuficiente") || msg.includes("stock")) {
        alert("❌ Stock insuficiente. Ajusta las cantidades.");
      } else {
        alert("❌ No se pudo guardar la factura.\n" + (err?.message || ""));
      }
      return false;
    }
  };

  const handlePrint = async () => {
    const ok = await saveInvoice();
    if (ok) setTimeout(() => window.print(), 50);
  };

  const handleClear = () => {
    const ok = confirm("¿Seguro que deseas limpiar la factura actual?");
    if (ok) dispatch({ type: "CLEAR" });
  };

  return (
    <div className="card flex flex-col gap-2">
      <motion.button 
        whileTap={{ scale: 0.98 }} 
        onClick={handlePrint} 
        className="btn btn-brand"
      >
        <Printer className="h-4 w-4" /> 
        Guardar e imprimir
      </motion.button>

      <div className="flex gap-2">
        <motion.button 
          whileTap={{ scale: 0.98 }} 
          onClick={generateId} 
          className="btn flex-1 btn-ghost"
        >
          <Hash className="h-4 w-4" /> 
          Generar ID
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleClear} className="btn btn-ghost flex-1">
          <Eraser className="h-4 w-4" /> Limpiar
        </motion.button>
      </div>

      <p className="text-xs text-slate-500">
        Nota: “Guardar e imprimir” primero persiste la factura en tu API y luego abre el diálogo de impresión.
      </p>
    </div>
  );
}
