'use client';

import { useEffect } from 'react';
import { FiCheckCircle, FiX, FiShoppingCart } from 'react-icons/fi';

export default function Toast({ 
  show, 
  onClose, 
  title, 
  message, 
  onAction, 
  actionText = 'Ver Carrito',
  duration = 3000 
}) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-green-500 p-4 max-w-md">
        <div className="flex items-start gap-4">
          {/* Icono */}
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-green-600" size={24} />
          </div>
          
          {/* Contenido */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{message}</p>
            
            {/* Botones */}
            <div className="flex gap-2">
              {onAction && (
                <button
                  onClick={onAction}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FiShoppingCart size={16} />
                  {actionText}
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition text-sm font-semibold"
              >
                Continuar
              </button>
            </div>
          </div>
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
