"use client";

import { useEffect, useState, useCallback } from "react";
import { getUsers } from "@/app/lib/api";
import UserForm from "./components/UserForm";
import UsersTable, { UserRow } from "./components/UsersTable";

export default function ClientesPage() {
  // Lista local (opcional) solo con los que se creen en esta sesión
  const [users, setUsers] = useState<UserRow[]>([]);

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-semibold">Gestión de Usuarios</h1>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Crear usuario (POST /auth/users) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-medium">Crear usuario</h2>
          <UserForm
            // Cuando se cree, lo agregamos a la lista local (opcional)
            onCreated={(u) =>
              setUsers((prev) => [
                ...prev,
                { username: u.username, role: u.roleText ?? u.role ?? "user" },
              ])
            }
          />
        </div>

        {/* Lista de usuarios creados (opcional, solo locales) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium">Usuarios creados (local)</h2>
          </div>
          <UsersTable users={users} loading={false} />
        </div>
      </section>
    </main>
  );
}