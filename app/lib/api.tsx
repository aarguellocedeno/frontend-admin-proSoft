const API_BASES = {
  auth: "http://localhost:8000/auth",
  inventory: "http://localhost:8001/inventory",
  billing: "http://localhost:4003/billing",
  print: "http://localhost:4004/print",
  notifications: "http://localhost:4005/notifications"
} as const;

type UserRole = "admin" | "seller" | "viewer" | string;

type User = {
  id?: string;
  username: string;
  role: UserRole;
  email?: string;
};

type Product = {
  product_id: string;
  name: string;
  price: number;
  stock: number;
  min_stock?: number;
};

type InvoiceItemInput = {
  product_id: string;
  quantity: number;
};

type InvoiceItem = InvoiceItemInput & {
  price?: number;
  name?: string;
};

type Invoice = {
  id: string;
  folio?: string;
  cliente: string;
  items: InvoiceItem[];
  total?: number;
  created_at?: string;
};

type AlertLog = {
  id?: string;
  level?: "info" | "warning" | "error" | string;
  message: string;
  created_at?: string;
};

async function request<T>(
  base: string,
  endpoint: string,
  options: RequestInit = {},
  useAuth = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (useAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${base}${endpoint}`, {
    ...options,
    headers,
  });

  if (useAuth && response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    window.location.href = "/";
    throw new Error("Sesión expirada, por favor inicia sesión nuevamente.");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Error en la petición");
  }

  return response.json() as Promise<T>;
}

export function login(username: string, password: string) {
  return request<{ token: string; user?: User }>(API_BASES.auth, "/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }, false);
}

export function getMe() {
  return request<User>(API_BASES.auth, "/me");
}

export function createUser(username: string, password: string, role: UserRole) {
  return request<User>(API_BASES.auth, "/users", {
    method: "POST",
    body: JSON.stringify({ username, password, role }),
  });
}

export function getUsers() {
  return request<User[]>(API_BASES.auth, "/users");
}

// ===== INVENTARIO =====
export function getProductos() {
  return request<Product[]>(API_BASES.inventory, "/products");
}

export function createProducto(productId: string, name: string, price: number, stock: number, minStock: number) {
  return request<Product>(API_BASES.inventory, "/products", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      name,
      price,
      stock,
      min_stock: minStock,
    }),
  });
}

// ===== FACTURAS =====
export function getFacturas() {
  return request<Invoice[]>(API_BASES.billing, "/facturas");
}

export function getFactura(id: string) {
  return request<Invoice>(API_BASES.billing, `/facturas/${id}`);
}

export function createFactura(cliente: string, productos: InvoiceItemInput[]) {
  return request<Invoice>(API_BASES.billing, "/facturas", {
    method: "POST",
    body: JSON.stringify({ cliente, productos }),
  });
}

export function imprimirFactura(id: string) {
  return request<{ success?: boolean; message?: string }>(API_BASES.billing, `/facturas/${id}/imprimir`, {
    method: "POST",
  });
}

export function descargarFactura(id: string) {
  return request<unknown>(API_BASES.print, `/facturas/${id}`);
}

// ===== ALERTAS =====
export function getAlertas() {
  return request<AlertLog[]>(API_BASES.notifications, "/logs");
}
