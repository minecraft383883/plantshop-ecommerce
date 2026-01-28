'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import useAuthStore from '@/store/authStore';
import api from '@/services/api';
import { FiEye, FiArrowLeft } from 'react-icons/fi';

export default function AdminOrdenesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Esperar a que el componente esté montado (hidratación de Zustand)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Protección de ruta DESPUÉS de que esté montado
  useEffect(() => {
    if (!mounted) return; // Esperar a que se monte

    if (!isAuthenticated || user?.rol !== 'admin') {
      router.push('/');
      return;
    }
    
    loadOrders();
  }, [mounted, isAuthenticated, user, router]);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders/all');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error cargando órdenes:', error);
      alert('Error al cargar órdenes. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
      setSelectedOrder(orderId);
    } catch (error) {
      console.error('Error cargando detalles:', error);
    }
  };

  const getStatusColor = (estado) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      procesando: 'bg-blue-100 text-blue-800',
      enviado: 'bg-purple-100 text-purple-800',
      entregado: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  // Mostrar loading mientras se monta y verifica autenticación
  if (!mounted || !isAuthenticated || user?.rol !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Volver al Panel
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📦 Gestión de Órdenes
            </h1>
            <p className="text-gray-600">
              Administra todas las órdenes de compra ({orders.length} órdenes)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando órdenes...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No hay órdenes aún
            </h2>
            <p className="text-gray-600">
              Las órdenes de compra aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lista de Órdenes */}
            <div className="lg:col-span-2 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleViewDetails(order.id)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition ${
                    selectedOrder === order.id ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Orden #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Cliente: {order.user_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.user_email}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.estado)}`}>
                      {order.estado.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${parseFloat(order.total).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fecha</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(order.created_at).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <FiEye />
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>

            {/* Detalles de Orden */}
            <div className="lg:sticky lg:top-4 h-fit">
              {selectedOrder && orderDetails ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2">
                    Detalles Orden #{selectedOrder}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Cliente</p>
                      <p className="font-semibold text-gray-800">
                        {orders.find(o => o.id === selectedOrder)?.user_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {orders.find(o => o.id === selectedOrder)?.user_email}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estado</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(orderDetails.order.estado)}`}>
                        {orderDetails.order.estado.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Dirección de Envío</p>
                      <p className="font-semibold text-gray-800">
                        {orderDetails.order.direccion_envio}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                      <p className="font-semibold text-gray-800">
                        {orderDetails.order.telefono_contacto}
                      </p>
                    </div>

                    {orderDetails.order.notas && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Notas</p>
                        <p className="text-gray-700 italic text-sm">
                          {orderDetails.order.notas}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t-2 pt-4">
                    <h3 className="font-bold text-gray-800 mb-3">Productos</h3>
                    <div className="space-y-3">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.nombre_producto}
                            </p>
                            <p className="text-xs text-gray-600">
                              {item.cantidad} x ${parseFloat(item.precio_unitario).toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold text-gray-800">
                            ${parseFloat(item.subtotal).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-2 mt-4 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-green-600">
                        ${parseFloat(orderDetails.order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FiEye size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Selecciona una orden para ver los detalles
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
