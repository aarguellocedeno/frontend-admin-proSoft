"use client";
import React, { useState } from 'react';
import { Package, MapPin, Clock, Weight, Ruler, AlertCircle } from 'lucide-react';

interface Pedido {
  id: string;
  descripcion: string;
  peso: string;
  tipo: string;
  tamano: string;
  tipoTransporte: string;
  ubicacionRecogida: string;
  ubicacionEntrega: string;
  horario: string;
  fecha: string;
}

const ReservaPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState('');
  const [tipoTransporte, setTipoTransporte] = useState<'Dron' | 'Robot' | ''>('');
  const [formData, setFormData] = useState({
    descripcion: '',
    peso: '',
    tipo: '',
    tamano: '',
    ubicacionRecogida: '',
    ubicacionEntrega: '',
    horario: ''
  });

  const tiposProducto = [
    'Electrónica',
    'Alimentos',
    'Ropa',
    'Documentos',
    'Medicamentos',
    'Otros'
  ];

  const tamanosProducto = [
    'Pequeño (hasta 20x20 cm)',
    'Mediano (20x35 cm)',
    'Grande (35x50 cm)'
  ];

  // Festivos de Colombia 2025
  const festivos2025 = [
    '2025-01-01', '2025-01-06', '2025-03-24', '2025-04-17', '2025-04-18',
    '2025-05-01', '2025-06-02', '2025-06-23', '2025-06-30', '2025-07-20',
    '2025-08-07', '2025-08-18', '2025-10-13', '2025-11-03', '2025-11-17',
    '2025-12-08', '2025-12-25'
  ];

  const esFestivo = (fecha: string): boolean => {
    const fechaSolo = fecha.split('T')[0];
    return festivos2025.includes(fechaSolo);
  };

  const validarHorario = (fechaHora: string): { valido: boolean; mensaje: string } => {
    const fecha = new Date(fechaHora);
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    
    // Validar que sea fecha futura
    const ahora = new Date();
    if (fecha <= ahora) {
      return { valido: false, mensaje: 'La fecha y hora deben ser futuras' };
    }

    // Validar festivos
    if (esFestivo(fechaHora)) {
      return { valido: false, mensaje: 'No se pueden hacer reservas en días festivos' };
    }

    // Validar horario de operación (7:00 AM - 7:00 PM)
    const horaEnMinutos = hora * 60 + minutos;
    const inicioOperacion = 7 * 60; // 7:00 AM
    const finOperacion = 19 * 60; // 7:00 PM

    if (horaEnMinutos < inicioOperacion || horaEnMinutos >= finOperacion) {
      return { valido: false, mensaje: 'El horario de operación es de 7:00 AM a 7:00 PM' };
    }

    return { valido: true, mensaje: '' };
  };

  const getPesoMaximo = (): number => {
    return tipoTransporte === 'Dron' ? 500 : 1000;
  };

  const handleTransporteChange = (tipo: 'Dron' | 'Robot') => {
    setTipoTransporte(tipo);
    setError('');
    // Si hay un peso ingresado, verificar si es válido para el nuevo transporte
    if (formData.peso) {
      const pesoNum = parseFloat(formData.peso);
      const pesoMax = tipo === 'Dron' ? 500 : 1000;
      if (pesoNum > pesoMax) {
        setError(`El peso máximo para ${tipo} es ${pesoMax} gramos`);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setError('');
    
    // Validación especial para el peso
    if (name === 'peso') {
      const pesoNum = parseFloat(value);
      if (value && tipoTransporte) {
        const pesoMax = getPesoMaximo();
        if (pesoNum > pesoMax) {
          setError(`El peso máximo para ${tipoTransporte} es ${pesoMax} gramos`);
          return;
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setError('');

    // Validar tipo de transporte seleccionado
    if (!tipoTransporte) {
      setError('Por favor selecciona el tipo de transporte (Dron o Robot)');
      return;
    }

    // Validar campos vacíos
    if (!formData.descripcion || !formData.peso || !formData.tipo || !formData.tamano || 
        !formData.ubicacionRecogida || !formData.ubicacionEntrega || !formData.horario) {
      setError('Por favor completa todos los campos');
      return;
    }

    const pesoNum = parseFloat(formData.peso);
    const pesoMax = getPesoMaximo();

    // Validar peso según tipo de transporte
    if (pesoNum > pesoMax) {
      setError(`El peso máximo para ${tipoTransporte} es ${pesoMax} gramos`);
      return;
    }

    // Validar peso mínimo
    if (pesoNum <= 0) {
      setError('El peso debe ser mayor a 0 gramos');
      return;
    }

    // Validar horario
    const validacionHorario = validarHorario(formData.horario);
    if (!validacionHorario.valido) {
      setError(validacionHorario.mensaje);
      return;
    }

    const nuevoPedido: Pedido = {
      id: Date.now().toString(),
      ...formData,
      tipoTransporte,
      fecha: new Date().toLocaleDateString('es-ES')
    };

    setPedidos(prev => [...prev, nuevoPedido]);
    
    setFormData({
      descripcion: '',
      peso: '',
      tipo: '',
      tamano: '',
      ubicacionRecogida: '',
      ubicacionEntrega: '',
      horario: ''
    });
    setTipoTransporte('');

    alert(`Pedido reservado exitosamente. Se enviará mediante: ${tipoTransporte}`);
  };

  const eliminarPedido = (id: string) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sistema de Reserva de Pedidos</h1>
          <p className="text-gray-600">Entregas automáticas con drones y robots</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package className="text-indigo-600" />
              Nueva Reserva
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Selector de transporte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Transporte
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTransporteChange('Dron')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tipoTransporte === 'Dron'
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">Dron</div>
                      <div className="text-xs text-gray-600">Hasta 500g</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTransporteChange('Robot')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tipoTransporte === 'Robot'
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">Robot</div>
                      <div className="text-xs text-gray-600">Hasta 1000g</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del Producto
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe el producto a enviar..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Weight size={16} />
                    Peso (gramos)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    step="1"
                    min="1"
                    max={tipoTransporte ? getPesoMaximo() : 1000}
                    disabled={!tipoTransporte}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="0"
                  />
                  {tipoTransporte && (
                    <p className="text-xs text-gray-500 mt-1">
                      Máximo: {getPesoMaximo()}g
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Ruler size={16} />
                    Tamaño
                  </label>
                  <select
                    name="tamano"
                    value={formData.tamano}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {tamanosProducto.map(tam => (
                      <option key={tam} value={tam}>{tam}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Máximo: 50x50 cm</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Producto
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Seleccionar...</option>
                  {tiposProducto.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <MapPin size={16} className="text-green-600" />
                  Ubicación de Recogida
                </label>
                <input
                  type="text"
                  name="ubicacionRecogida"
                  value={formData.ubicacionRecogida}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Dirección completa de recogida"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <MapPin size={16} className="text-red-600" />
                  Ubicación de Entrega
                </label>
                <input
                  type="text"
                  name="ubicacionEntrega"
                  value={formData.ubicacionEntrega}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Dirección completa de entrega"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Clock size={16} />
                  Fecha y Hora Programada
                </label>
                <input
                  type="datetime-local"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Horario: 7:00 AM - 7:00 PM | No festivos</p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Reservar Pedido
              </button>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Pedidos Reservados ({pedidos.length})
            </h2>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {pedidos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No hay pedidos reservados aún</p>
                </div>
              ) : (
                pedidos.map(pedido => (
                  <div key={pedido.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{pedido.descripcion}</h3>
                        <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {pedido.tipoTransporte}
                        </span>
                      </div>
                      <button
                        onClick={() => eliminarPedido(pedido.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Weight size={14} className="text-gray-400" />
                        <span>{pedido.peso}g</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-gray-400" />
                        <span>{pedido.tipo}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Ruler size={14} className="text-gray-400" />
                        <span>{pedido.tamano}</span>
                      </div>
                      <div className="col-span-2 flex items-start gap-2 mt-2">
                        <MapPin size={14} className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs">{pedido.ubicacionRecogida}</span>
                      </div>
                      <div className="col-span-2 flex items-start gap-2">
                        <MapPin size={14} className="text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-xs">{pedido.ubicacionEntrega}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 mt-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-xs">{new Date(pedido.horario).toLocaleString('es-ES')}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Reservado el: {pedido.fecha}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaPedidos;