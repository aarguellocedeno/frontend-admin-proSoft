// Type declarations for api.js

export function login(username: string, password: string): Promise<any>;
export function getMe(): Promise<any>;
export function createUser(username: string, password: string, role: string): Promise<any>;
export function getUsers(): Promise<any>;

export function getProductos(): Promise<any[]>;
export function createProducto(productId: string, name: string, price: number, stock: number, minStock: number): Promise<any>;

export function getFacturas(): Promise<any[]>;
export function getFactura(id: string): Promise<any>;
export function createFactura(cliente: string, productos: any[]): Promise<any>;
export function imprimirFactura(id: string): Promise<any>;
export function descargarFactura(id: string): Promise<any>;

export function getAlertas(): Promise<any[]>;
