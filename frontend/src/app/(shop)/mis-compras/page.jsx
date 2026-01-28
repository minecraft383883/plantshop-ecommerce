'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import useAuthStore from '@/store/authStore';
import api from '@/services/api';
import { FiPackage, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';

export default function MisComprasPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated, router]);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error cargando órdenes:', error);
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

  const getStatusEmoji = (estado) => {
    const emojis = {
      pendiente: '⏳',
      procesando: '📦',
      enviado: '🚚',
      entregado: '✅',
      cancelado: '❌',
    };
    return emojis[estado] || '📋';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 Mis Compras
          </h1>
          <p className="text-gray-600">
            Historial de tus pedidos y seguimiento
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando órdenes...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No tienes compras aún
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Empieza a llenar tu jardín con nuestras plantas!
            </p>
            <a
              href="/catalogo"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Ver Catálogo
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lista de Órdenes */}
            <div className="space-y-4">
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
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <FiCalendar size={14} />
                        {new Date(order.created_at).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.estado)}`}>
                      {getStatusEmoji(order.estado)} {order.estado.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiDollarSign />
                      <span className="font-semibold">Total:</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      ${parseFloat(order.total).toFixed(2)}
                    </span>
                  </div>

                  {order.direccion_envio && (
                    <div className="flex items-start gap-2 text-sm text-gray-600 mt-3 pt-3 border-t">
                      <FiMapPin className="mt-1 flex-shrink-0" size={14} />
                      <span className="line-clamp-2">{order.direccion_envio}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Detalles de Orden */}
            <div className="lg:sticky lg:top-4 h-fit">
              {selectedOrder && orderDetails ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2">
                    Detalles de la Orden #{selectedOrder}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estado</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(orderDetails.order.estado)}`}>
                        {getStatusEmoji(orderDetails.order.estado)} {orderDetails.order.estado.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fecha de Pedido</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(orderDetails.order.created_at).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
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
                        <p className="text-gray-700 italic">
                          {orderDetails.order.notas}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t-2 pt-4">
                    <h3 className="font-bold text-gray-800 mb-3">Productos</h3>
                    <div className="space-y-3">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.nombre_producto}
                            </p>
                            <p className="text-sm text-gray-600">
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
                        ${parseFloat(orderDetails.order.total).toFixed(2)} MXN
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
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
