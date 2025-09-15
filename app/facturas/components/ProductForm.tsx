"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useInvoice } from "./InvoiceContext";

export default function ProductForm() {
  const { dispatch } = useInvoice();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  function handleAdd() {
    if (!name.trim() || quantity <= 0 || price < 0) return;
    const id = crypto.randomUUID();
    dispatch({ type: "ADD_ITEM", payload: { id, name: name.trim(), quantity, price } });
    setName("");
    setQuantity(1);
    setPrice(0);
  }

  return (
    <div className="card">
      <h2 className="mb-3 text-base font-semibold">Agregar producto</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        <input
          className="sm:col-span-2 rounded-xl border p-2 text-sm"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="rounded-xl border p-2 text-sm"
          placeholder="Cantidad"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          className="rounded-xl border p-2 text-sm"
          placeholder="Precio unitario"
          min={0}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={handleAdd} className="btn btn-brand">
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>
    </div>
  );
}


