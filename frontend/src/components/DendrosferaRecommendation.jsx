'use client';

import { FiDroplet, FiCalendar, FiPackage, FiInfo, FiShoppingCart } from 'react-icons/fi';

export default function DendrosferaRecommendation({ recommendation, plantInfo, onAddToCart }) {
  if (!recommendation) return null;

  const calculateMonthlyPackage = (months) => {
    // Extraer número del consumo mensual (ej: "12–13 esferas/mes" → 12.5)
    const consumption = recommendation.monthly_consumption;
    const numbers = consumption.match(/\d+/g);
    if (!numbers) return { spheres: 0, months };
    
    const avg = numbers.length === 2 
      ? (parseInt(numbers[0]) + parseInt(numbers[1])) / 2 
      : parseInt(numbers[0]);
    
    return {
      spheres: Math.ceil(avg * months),
      months,
      monthlyAvg: avg
    };
  };

  const packages = [
    calculateMonthlyPackage(1),
    calculateMonthlyPackage(3),
    calculateMonthlyPackage(6),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 p-3 rounded-full">
            <FiDroplet size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Recomendación Dendrosfera</h2>
            {plantInfo && (
              <p className="text-green-100 text-sm">
                Para tu {plantInfo.nombre_comun} ({plantInfo.nombre_cientifico})
              </p>
            )}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
          <span className="text-sm font-semibold">Tipo: </span>
          <span className="text-lg font-bold">{recommendation.plant_type}</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-6 space-y-6">
        {/* Nivel de Necesidad */}
        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FiInfo size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Nivel de Necesidad</p>
            <p className="text-xl font-bold text-blue-700">{recommendation.need_level}</p>
          </div>
        </div>

        {/* Grid de Información */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Dosis */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <FiDroplet className="text-purple-600" size={20} />
              <p className="text-sm font-bold text-gray-700">Dosis por Aplicación</p>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {recommendation.dose_per_application}
            </p>
          </div>

          {/* Frecuencia */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <FiCalendar className="text-orange-600" size={20} />
              <p className="text-sm font-bold text-gray-700">Frecuencia</p>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {recommendation.frequency}
            </p>
          </div>

          {/* Consumo Mensual */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FiPackage className="text-green-600" size={20} />
              <p className="text-sm font-bold text-gray-700">Consumo Mensual</p>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {recommendation.monthly_consumption}
            </p>
          </div>
        </div>

        {/* Recomendaciones */}
        {recommendation.recommendations && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-bold text-gray-800 mb-1">Recomendaciones:</p>
                <p className="text-gray-700">{recommendation.recommendations}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ejemplos de Plantas */}
        {recommendation.examples && (
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Ejemplos de plantas de este tipo:</p>
            <p className="text-gray-800">{recommendation.examples}</p>
          </div>
        )}

        {/* Paquetes Sugeridos */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiShoppingCart size={24} />
            Paquetes Sugeridos
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-xl p-4 hover:border-green-500 hover:shadow-lg transition cursor-pointer"
                onClick={() => onAddToCart && onAddToCart(pkg)}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-semibold mb-1">
                    Plan {pkg.months} {pkg.months === 1 ? 'Mes' : 'Meses'}
                  </p>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {pkg.spheres}
                  </p>
                  <p className="text-sm text-gray-500">esferas totales</p>
                  <button
                    className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart && onAddToCart(pkg);
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
