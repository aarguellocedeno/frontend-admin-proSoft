"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useInvoice } from "./InvoiceContext";
import { getProductos } from "../../lib/api";
import type { Producto } from "./InvoiceContext";

export default function ProductForm() {
  const { state, dispatch, addItemFromProduct } = useInvoice();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const prods = await getProductos();
        dispatch({ type: "SET_PRODUCTS", payload: prods });
        if (prods.length) setSelected(prods[0].product_id);
      } catch (err: unknown) {
        console.error(err);
        alert("⚠️ Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const producto: Producto | undefined = state.products.find(
    (p) => p.product_id === selected
  );

  const handleAdd = () => {
    if (!producto) return;
    addItemFromProduct(producto, qty);
    setQty(1);
  };

  return (
    <div className="card">
      <h2 className="mb-3 text-base font-semibold">Agregar producto</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        <select
          className="sm:col-span-2 rounded-xl border p-2 text-sm"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          disabled={loading || state.products.length === 0}
        >
          {state.products.map((p: Producto) => (
            <option key={p.product_id} value={p.product_id}>
              {p.name} —{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(p.price)}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="rounded-xl border p-2 text-sm"
          placeholder="Cantidad"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <input
          readOnly
          className="rounded-xl border bg-slate-50 p-2 text-sm"
          value={producto ? producto.product_id : ""}
          aria-label="Código del producto"
        />

        <button 
          onClick={handleAdd} 
          className="btn btn-brand" 
          disabled={!producto || loading}
        >
          <Plus className="h-4 w-4" />
          {loading ? "Cargando..." : "Agregar"}
        </button>
      </div>

      {loading && (
        <p className="mt-2 text-xs text-slate-500">Cargando productos del inventario...</p>
      )}
    </div>
  );
}

// "use client";

// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { useInvoice } from "./InvoiceContext";

// export default function ProductForm() {
//   const { dispatch } = useInvoice();
//   const [name, setName] = useState("");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [price, setPrice] = useState<number>(0);

//   function handleAdd() {
//     if (!name.trim() || quantity <= 0 || price < 0) return;
//     const id = crypto.randomUUID();
//     // dispatch({ type: "ADD_ITEM", payload: { id, name: name.trim(), quantity, price } });
//     setName("");
//     setQuantity(1);
//     setPrice(0);
//   }

//   return (
//     <div className="card">
//       <h2 className="mb-3 text-base font-semibold">Agregar producto</h2>
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
//         <input
//           className="sm:col-span-2 rounded-xl border p-2 text-sm"
//           placeholder="Nombre del producto"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           className="rounded-xl border p-2 text-sm"
//           placeholder="Cantidad"
//           min={1}
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           className="rounded-xl border p-2 text-sm"
//           placeholder="Precio unitario"
//           min={0}
//           value={price}
//           onChange={(e) => setPrice(Number(e.target.value))}
//         />
//         <button onClick={handleAdd} className="btn btn-brand">
//           <Plus className="h-4 w-4" />
//           Agregar
//         </button>
//       </div>
//     </div>
//   );
// }




