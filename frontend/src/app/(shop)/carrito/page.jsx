'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].cantidad = newQuantity;
    updatedCart[index].subtotal = updatedCart[index].precio * newQuantity;
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    if (confirm('¿Vaciar carrito?')) {
      localStorage.removeItem('cart');
      setCartItems([]);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      alert('Debes iniciar sesión para continuar');
      router.push('/auth/login');
      return;
    }
    router.push('/shop/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiShoppingCart size={36} className="text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">Mi Carrito</h1>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
              >
                <FiTrash2 size={20} />
                Vaciar Carrito
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            /* Carrito Vacío */
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-8">
                Identifica tu planta y agrega Dendrosfera con las recomendaciones personalizadas
              </p>
              <a
                href="/identificar"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg"
              >
                Identificar Mi Planta
                <FiArrowRight size={20} />
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex gap-6">
                      {/* Imagen */}
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                        🌿
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.nombre}</h3>
                        
                        {item.metadata && (
                          <div className="text-sm text-gray-600 mb-3 space-y-1">
                            <p>✓ Para: <span className="font-semibold">{item.metadata.plantCommonName || item.metadata.plantType}</span></p>
                            <p>✓ Plan: <span className="font-semibold">{item.metadata.plan.months} {item.metadata.plan.months === 1 ? 'mes' : 'meses'}</span></p>
                            <p>✓ Consumo estimado: <span className="font-semibold">{item.metadata.plan.monthlyConsumption}</span></p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          {/* Cantidad */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(index, item.cantidad - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                              −
                            </button>
                            <span className="font-bold text-lg">{item.cantidad}</span>
                            <button
                              onClick={() => updateQuantity(index, item.cantidad + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                              +
                            </button>
                            <span className="text-gray-600 text-sm ml-2">esferas</span>
                          </div>

                          {/* Precio */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">${item.precio.toFixed(2)} c/u</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${item.subtotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Eliminar */}
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío</span>
                      <span className="font-semibold text-green-600">GRATIS</span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-green-600">${total.toFixed(2)} MXN</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg flex items-center justify-center gap-2"
                  >
                    Proceder al Pago
                    <FiArrowRight size={24} />
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    ✓ Compra 100% segura ✓ Envío rápido
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
