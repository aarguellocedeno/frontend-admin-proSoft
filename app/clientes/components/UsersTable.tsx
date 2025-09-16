"use client";

export type UserRow = {
  username: string;
  role: string;
};

export default function UsersTable({
  users,
  loading,
}: {
  users: UserRow[];
  loading: boolean;
}) {
  if (loading) return <p className="text-sm text-slate-500">Cargando…</p>;

  if (!users.length) {
    return (
      <p className="text-sm text-slate-500">
        No hay usuarios creados en esta sesión.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-3 py-2">Usuario</th>
            <th className="px-3 py-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.username} className="border-t border-slate-100">
              <td className="px-3 py-2">{u.username}</td>
              <td className="px-3 py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
