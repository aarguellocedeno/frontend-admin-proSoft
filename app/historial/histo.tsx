"use client";
import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, User, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Entrega {
  id: string;
  descripcion: string;
  peso: string;
  tipoTransporte: string;
  ubicacionRecogida: string;
  ubicacionEntrega: string;
  fechaEntrega: string;
  horaEntrega: string;
  estado: 'Entregado' | 'Fallido';
}

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  totalEntregas: number;
  entregasExitosas: number;
  entregas: Entrega[];
}

const HistorialEntregas = () => {
  // Datos de ejemplo (en producción vendrían de una base de datos)
  const [clientes] = useState<Cliente[]>([
    {
      id: '1',
      nombre: 'María García López',
      email: 'maria.garcia@email.com',
      telefono: '+57 300 123 4567',
      totalEntregas: 8,
      entregasExitosas: 7,
      entregas: [
        {
          id: 'e1',
          descripcion: 'Documentos legales',
          peso: '150',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Calle 50 #20-30, Medellín',
          ubicacionEntrega: 'Carrera 43A #1-50, Medellín',
          fechaEntrega: '2025-11-10',
          horaEntrega: '10:30',
          estado: 'Entregado'
        },
        {
          id: 'e2',
          descripcion: 'Medicamentos',
          peso: '300',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Calle 10 #32-15, Medellín',
          ubicacionEntrega: 'Carrera 70 #45-20, Medellín',
          fechaEntrega: '2025-11-08',
          horaEntrega: '14:15',
          estado: 'Entregado'
        },
        {
          id: 'e3',
          descripcion: 'Paquete electrónica',
          peso: '800',
          tipoTransporte: 'Robot',
          ubicacionRecogida: 'Carrera 52 #45-67, Medellín',
          ubicacionEntrega: 'Calle 33 #70-15, Medellín',
          fechaEntrega: '2025-11-05',
          horaEntrega: '16:45',
          estado: 'Fallido'
        }
      ]
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez Martínez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+57 301 987 6543',
      totalEntregas: 12,
      entregasExitosas: 11,
      entregas: [
        {
          id: 'e4',
          descripcion: 'Repuestos pequeños',
          peso: '450',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Calle 80 #50-20, Medellín',
          ubicacionEntrega: 'Carrera 48 #12-30, Medellín',
          fechaEntrega: '2025-11-12',
          horaEntrega: '09:00',
          estado: 'Entregado'
        },
        {
          id: 'e5',
          descripcion: 'Documentos certificados',
          peso: '200',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Carrera 43A #5-33, Medellín',
          ubicacionEntrega: 'Calle 10 Sur #48-70, Medellín',
          fechaEntrega: '2025-11-09',
          horaEntrega: '11:20',
          estado: 'Entregado'
        }
      ]
    },
    {
      id: '3',
      nombre: 'Ana Sofía Hernández',
      email: 'ana.hernandez@email.com',
      telefono: '+57 302 456 7890',
      totalEntregas: 5,
      entregasExitosas: 5,
      entregas: [
        {
          id: 'e6',
          descripcion: 'Muestras médicas',
          peso: '250',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Calle 30A #82-50, Medellín',
          ubicacionEntrega: 'Carrera 65 #8B-91, Medellín',
          fechaEntrega: '2025-11-11',
          horaEntrega: '15:30',
          estado: 'Entregado'
        },
        {
          id: 'e7',
          descripcion: 'Libros',
          peso: '950',
          tipoTransporte: 'Robot',
          ubicacionRecogida: 'Carrera 70 #52-20, Medellín',
          ubicacionEntrega: 'Calle 49 #63-80, Medellín',
          fechaEntrega: '2025-11-07',
          horaEntrega: '13:00',
          estado: 'Entregado'
        }
      ]
    },
    {
      id: '4',
      nombre: 'Luis Fernando Gómez',
      email: 'luis.gomez@email.com',
      telefono: '+57 304 321 0987',
      totalEntregas: 15,
      entregasExitosas: 14,
      entregas: [
        {
          id: 'e8',
          descripcion: 'Componentes electrónicos',
          peso: '600',
          tipoTransporte: 'Robot',
          ubicacionRecogida: 'Calle 53 #45-10, Medellín',
          ubicacionEntrega: 'Carrera 80 #30-45, Medellín',
          fechaEntrega: '2025-11-13',
          horaEntrega: '10:15',
          estado: 'Entregado'
        }
      ]
    },
    {
      id: '5',
      nombre: 'Patricia Ramírez Silva',
      email: 'patricia.ramirez@email.com',
      telefono: '+57 305 654 3210',
      totalEntregas: 3,
      entregasExitosas: 3,
      entregas: [
        {
          id: 'e9',
          descripcion: 'Ropa',
          peso: '400',
          tipoTransporte: 'Dron',
          ubicacionRecogida: 'Carrera 43A #1-50, Medellín',
          ubicacionEntrega: 'Calle 10 #32-40, Medellín',
          fechaEntrega: '2025-11-06',
          horaEntrega: '12:45',
          estado: 'Entregado'
        }
      ]
    }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Historial de Entregas</h1>
          <p className="text-gray-600">Consulta el registro de entregas por cliente</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de búsqueda y lista de clientes */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Cliente
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Nombre o email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {clientesFiltrados.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <User size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No se encontraron clientes</p>
                </div>
              ) : (
                clientesFiltrados.map(cliente => (
                  <button
                    key={cliente.id}
                    onClick={() => setClienteSeleccionado(cliente)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      clienteSeleccionado?.id === cliente.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{cliente.nombre}</h3>
                        <p className="text-xs text-gray-500 mt-1">{cliente.email}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {cliente.totalEntregas} envíos
                      </span>
                    </div>

                  </button>
                ))
              )}
            </div>
          </div>

          {/* Panel de detalles del cliente */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {!clienteSeleccionado ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                <Package size={64} className="mb-4 opacity-50" />
                <p className="text-lg">Selecciona un cliente para ver su historial</p>
              </div>
            ) : (
              <div>
                {/* Información del cliente */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <User size={28} className="text-indigo-600" />
                        {clienteSeleccionado.nombre}
                      </h2>
                      <p className="text-gray-600 mt-1">{clienteSeleccionado.email}</p>
                      <p className="text-gray-600">{clienteSeleccionado.telefono}</p>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Package size={18} className="text-blue-600" />
                        <span className="text-sm text-gray-600">Total Entregas</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {clienteSeleccionado.totalEntregas}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="text-sm text-gray-600">Exitosas</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {clienteSeleccionado.entregasExitosas}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Historial de entregas */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Historial de Entregas ({clienteSeleccionado.entregas.length})
                  </h3>

                  <div className="space-y-4 max-h-[calc(100vh-500px)] overflow-y-auto">
                    {clienteSeleccionado.entregas.map(entrega => (
                      <div
                        key={entrega.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{entrega.descripcion}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                {entrega.tipoTransporte}
                              </span>
                              <span className="text-xs text-gray-500">{entrega.peso}g</span>
                            </div>
                          </div>
                          <span
                            className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                              entrega.estado === 'Entregado'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {entrega.estado === 'Entregado' ? (
                              <CheckCircle size={16} />
                            ) : (
                              <XCircle size={16} />
                            )}
                            {entrega.estado}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-green-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-gray-500">Recogida:</p>
                              <p>{entrega.ubicacionRecogida}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-red-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-gray-500">Entrega:</p>
                              <p>{entrega.ubicacionEntrega}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-xs">
                                {new Date(entrega.fechaEntrega).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-xs">{entrega.horaEntrega}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialEntregas;