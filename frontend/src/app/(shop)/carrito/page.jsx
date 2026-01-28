'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

export default function CarritoPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId, productName) => {
    if (confirm(`¿Eliminar "${productName}" del carrito?`)) {
      removeItem(productId);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para continuar con la compra');
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (confirm('¿Vaciar todo el carrito?')) {
      clearCart();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalogo" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4">
            <FiArrowLeft className="mr-2" />
            Seguir Comprando
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛒 Mi Carrito
          </h1>
          <p className="text-gray-600">
            {totalItems === 0 ? 'Tu carrito está vacío' : `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Carrito Vacío */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              Agrega algunas plantas hermosas a tu colección
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <FiShoppingBag />
              Ir al Catálogo
            </Link>
          </div>
        ) : (
          /* Carrito con Productos */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de Productos */}
            <div className="lg:col-span-2 space-y-4">
              {/* Botón limpiar carrito */}
              {items.length > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
                  >
                    <FiTrash2 size={16} />
                    Vaciar carrito
                  </button>
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
                >
                  {/* Imagen */}
                  <div className="flex-shrink-0 w-full sm:w-32 h-32">
                    {item.imagen_url ? (
                      <img
                        src={item.imagen_url}
                        alt={item.nombre}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-4xl">
                        🌿
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {item.nombre}
                      </h3>
                      {item.nombre_cientifico && (
                        <p className="text-sm text-gray-500 italic mb-2">
                          {item.nombre_cientifico}
                        </p>
                      )}
                      <p className="text-xl font-bold text-green-600">
                        ${parseFloat(item.precio).toFixed(2)}
                      </p>
                    </div>

                    {/* Controles */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Cantidad */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                          disabled={item.cantidad <= 1}
                        >
                          <FiMinus size={16} />
                        </button>
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center font-bold text-gray-800 border-2 border-gray-300 rounded-lg py-1"
                          min="1"
                          max="99"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                          disabled={item.cantidad >= item.stock}
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      {/* Subtotal y eliminar */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-gray-800">
                            ${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.nombre)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Advertencia de stock */}
                    {item.cantidad >= item.stock && (
                      <p className="text-orange-600 text-sm mt-2 font-semibold">
                        ⚠️ Stock limitado: solo {item.stock} disponibles
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2">
                  📋 Resumen del Pedido
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Productos ({totalItems})</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">GRATIS</span>
                  </div>
                  <div className="border-t-2 pt-3 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-green-600">${total.toFixed(2)} MXN</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
                >
                  Proceder al Pago
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Envío gratis en compras mayores a $500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Garantía de plantas saludables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Pago seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
