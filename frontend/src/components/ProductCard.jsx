'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import useCartStore from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    // Opcional: mostrar notificación
    alert(`✅ ${product.nombre} agregado al carrito`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Imagen */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {product.imagen_url && !imageError ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🌿
          </div>
        )}
        
        {/* Badge de stock bajo */}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
            ¡Últimas unidades!
          </div>
        )}
        
        {/* Sin stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Categoría */}
        {product.categoria_nombre && (
          <span className="text-xs text-green-600 font-semibold uppercase">
            {product.categoria_nombre}
          </span>
        )}

        {/* Nombre */}
        <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 line-clamp-2">
          {product.nombre}
        </h3>

        {/* Nombre científico */}
        {product.nombre_cientifico && (
          <p className="text-xs text-gray-500 italic mb-2">
            {product.nombre_cientifico}
          </p>
        )}

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.descripcion || 'Planta hermosa y saludable'}
        </p>

        {/* Info de cuidados */}
        <div className="flex gap-2 mb-3 text-xs text-gray-500">
          {product.luz && (
            <span className="bg-yellow-100 px-2 py-1 rounded">☀️ {product.luz}</span>
          )}
          {product.riego && (
            <span className="bg-blue-100 px-2 py-1 rounded">💧 {product.riego}</span>
          )}
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-2xl font-bold text-green-600">
              ${parseFloat(product.precio).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              Stock: {product.stock}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            title="Agregar al carrito"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
