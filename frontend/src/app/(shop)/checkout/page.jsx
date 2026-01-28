'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import api from '@/services/api';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  
  const [formData, setFormData] = useState({
    direccion_envio: '',
    telefono_contacto: '',
    notas: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (items.length === 0) {
      router.push('/carrito');
      return;
    }
    
    // Prellenar con datos del usuario
    if (user) {
      setFormData({
        direccion_envio: user.direccion || '',
        telefono_contacto: user.telefono || '',
        notas: '',
      });
    }
  }, [isAuthenticated, items, user, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Crear orden
      const orderData = {
        total: getTotalPrice(),
        direccion_envio: formData.direccion_envio,
        telefono_contacto: formData.telefono_contacto,
        notas: formData.notas,
        items: items.map(item => ({
          product_id: item.id,
          nombre_producto: item.nombre,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
          subtotal: item.precio * item.cantidad,
        })),
      };

      const response = await api.post('/orders/create', orderData);

      // Limpiar carrito
      clearCart();

      // Redirigir a confirmación
      alert('✅ ¡Orden creada exitosamente! Número de orden: ' + response.data.order.id);
      router.push('/');
    } catch (err) {
      console.error('Error creando orden:', err);
      setError(err.response?.data?.error || 'Error al procesar la orden');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/carrito" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4">
            <FiArrowLeft className="mr-2" />
            Volver al Carrito
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <FiLock className="text-green-600" />
            Checkout Seguro
          </h1>
          <p className="text-gray-600">
            Completa tu información para finalizar la compra
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📦 Información de Envío
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={user?.nombre || ''}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Dirección de Envío <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="direccion_envio"
                  value={formData.direccion_envio}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Teléfono de Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono_contacto"
                  value={formData.telefono_contacto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="8112345678"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Instrucciones especiales para la entrega..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Procesando...' : '✅ Confirmar Pedido'}
              </button>
            </form>
          </div>

          {/* Resumen */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📋 Resumen de Compra
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <img
                      src={item.imagen_url || '/placeholder.png'}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.nombre}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.cantidad} x ${parseFloat(item.precio).toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-800">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  <span className="font-semibold text-green-600">GRATIS</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)} MXN</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800 font-semibold mb-2">
                🔒 Compra 100% Segura
              </p>
              <p className="text-xs text-blue-700">
                Tu información está protegida con encriptación SSL de 256 bits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
