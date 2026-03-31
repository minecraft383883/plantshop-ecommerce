'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiDroplet, FiCheckCircle, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { dendrosferaService } from '@/services/dendrosferaService';
import useCartStore from '@/store/cartStore'; 
import Toast from '@/components/Toast';

export default function DendrosferaPage() {
  const [guides, setGuides] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guidePage, setGuidePage] = useState(1);
  const [guideSearch, setGuideSearch] = useState('');
  const GUIDES_PER_PAGE = 10;

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState(null);
  
  const addItem = useCartStore((state) => state.addItem); // NUEVO
  const router = useRouter();

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      const data = await dendrosferaService.getAllGuides();
      setGuides(data.guides || []);
    } catch (error) {
      console.error('Error cargando guías:', error);
    } finally {
      setLoading(false);
    }
  };


  

  const packages = [
    { id: 1, name: 'Paquete Básico', spheres: 50, price: 500, savings: 0 },
    { id: 2, name: 'Paquete Estándar', spheres: 150, price: 1350, savings: 150 },
    { id: 3, name: 'Paquete Premium', spheres: 300, price: 2400, savings: 600 },
  ];

  const handleAddToCart = (pkg) => {
  const product = {
    id: `dendrosfera-${pkg.id}`,
    nombre: pkg.name,
    precio: pkg.price,
    descripcion: `${pkg.spheres} esferas de Dendrosfera`,
    imagen: '/images/dendrosfera.jpg',
  };
  
  addItem(product);
  
   // ⬇️ AGREGAR ESTAS LÍNEAS (en lugar del alert)
  setToastData(pkg); // Guardar info del paquete
  setShowToast(true); // Mostrar el toast
  // ⬆️ FIN LÍNEAS NUEVAS
  
  // Mejor mensaje con opción de ir al carrito
  
};


  


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
 <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      title="Producto agregado al carrito"
      message={toastData ? `${toastData.name} - ${toastData.spheres} esferas` : ''}
      onAction={() => router.push('/carrito')}
      actionText="Ver Carrito"
      duration={3000}
    />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="font-bold text-lg">🌿 Nutriente Natural para Plantas</span>
          </div>
          <h1 className="text-6xl font-bold mb-6">Dendrosfera</h1>
          <p className="text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Mejora el crecimiento, rendimiento y salud de tus plantas con nuestro nutriente en esferas de liberación controlada
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/identificar"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg inline-flex items-center gap-2"
            >
              <FiDroplet size={24} />
              Identificar mi Planta
            </a>
            <a
              href="#paquetes"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition shadow-lg inline-flex items-center gap-2"
            >
              <FiShoppingCart size={24} />
              Ver Paquetes
            </a>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Por Qué Dendrosfera?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Crecimiento Acelerado',
                desc: 'Nutrientes de liberación controlada que estimulan el crecimiento saludable'
              },
              {
                icon: '💚',
                title: '100% Natural',
                desc: 'Formulación orgánica sin químicos dañinos para tus plantas y el ambiente'
              },
              {
                icon: '⏱️',
                title: 'Fácil Aplicación',
                desc: 'Solo aplica las esferas según el tipo de planta. Sin mezclas complicadas'
              },
              {
                icon: '🌿',
                title: 'Para Todo Tipo de Plantas',
                desc: 'Funciona en suculentas, plantas de interior, exterior, hierbas y más'
              },
              {
                icon: '📈',
                title: 'Resultados Visibles',
                desc: 'Hojas más verdes, flores más abundantes y plantas más resistentes'
              },
              {
                icon: '💧',
                title: 'Ahorro de Tiempo',
                desc: 'Aplicación semanal o quincenal según la planta. Olvídate de fertilizar diario'
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-green-50 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabla de Guía */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Guía de Uso por Tipo de Planta
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cada tipo de planta tiene necesidades diferentes. Consulta nuestra guía para saber la dosis exacta.
          </p>

          {/* Buscador */}
          <div className="relative max-w-md mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por tipo de planta..."
              value={guideSearch}
              onChange={(e) => { setGuideSearch(e.target.value); setGuidePage(1); }}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white transition"
            />
            {guideSearch && (
              <button
                onClick={() => { setGuideSearch(''); setGuidePage(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-lg leading-none"
                title="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Tipo de Planta</th>
                    <th className="px-6 py-4 text-left font-bold">Ejemplos</th>
                    <th className="px-6 py-4 text-left font-bold">Dosis</th>
                    <th className="px-6 py-4 text-left font-bold">Frecuencia</th>
                    <th className="px-6 py-4 text-left font-bold">Consumo/Mes</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = guides.filter(g =>
                      g.plant_type?.toLowerCase().includes(guideSearch.toLowerCase())
                    );
                    const paginated = filtered.slice(
                      (guidePage - 1) * GUIDES_PER_PAGE,
                      guidePage * GUIDES_PER_PAGE
                    );
                    if (paginated.length === 0) {
                      return (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                            🔍 No se encontraron plantas con &ldquo;{guideSearch}&rdquo;
                          </td>
                        </tr>
                      );
                    }
                    return paginated.map((guide, index) => (
                      <tr
                        key={guide.id}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="px-6 py-4 font-bold text-gray-800">{guide.plant_type}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{guide.examples}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{guide.dose_per_application}</td>
                        <td className="px-6 py-4 text-gray-600">{guide.frequency}</td>
                        <td className="px-6 py-4 font-semibold text-gray-800">{guide.monthly_consumption}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>

            {/* Paginación guías */}
            {(() => {
              const filtered = guides.filter(g =>
                g.plant_type?.toLowerCase().includes(guideSearch.toLowerCase())
              );
              const totalPages = Math.ceil(filtered.length / GUIDES_PER_PAGE);
              if (filtered.length <= GUIDES_PER_PAGE) return null;
              return (
                <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Mostrando{' '}
                    <span className="font-semibold">{(guidePage - 1) * GUIDES_PER_PAGE + 1}</span>
                    {' '}–{' '}
                    <span className="font-semibold">{Math.min(guidePage * GUIDES_PER_PAGE, filtered.length)}</span>
                    {' '}de{' '}
                    <span className="font-semibold">{filtered.length}</span> registros
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuidePage(p => Math.max(1, p - 1))}
                      disabled={guidePage === 1}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <FiChevronLeft size={16} />
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setGuidePage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                          page === guidePage
                            ? 'bg-green-600 text-white shadow'
                            : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setGuidePage(p => Math.min(totalPages, p + 1))}
                      disabled={guidePage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Siguiente
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="text-center mt-8">
            <a
              href="/identificar"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg"
            >
              <FiDroplet size={24} />
              ¿No sabes qué tipo es tu planta? Identifícala aquí
            </a>
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Elige Tu Paquete
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Selecciona el paquete que mejor se adapte a tus necesidades
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-8 border-2 transition hover:shadow-2xl ${
                  index === 1
                    ? 'border-green-500 bg-green-50 scale-105'
                    : 'border-gray-300 bg-white hover:border-green-400'
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full font-bold text-sm">
                    ⭐ MÁS POPULAR
                  </div>
                )}

                <div className="text-center">
                  <div className="text-5xl mb-4">
                    <FiPackage className="mx-auto text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    ${pkg.price}
                    <span className="text-lg text-gray-500"> MXN</span>
                  </div>
                  <p className="text-gray-600 mb-1">{pkg.spheres} esferas</p>
                  <p className="text-sm text-gray-500 mb-6">${(pkg.price / pkg.spheres).toFixed(2)} por esfera</p>

                  {pkg.savings > 0 && (
                    <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-2 mb-6">
                      <p className="text-yellow-800 font-bold text-sm">
                        🎉 Ahorra ${pkg.savings} MXN
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleAddToCart(pkg)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart size={20} />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Ver Tus Plantas Florecer?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Identifica tu planta y recibe recomendaciones personalizadas de uso
          </p>
          <a
            href="/identificar"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
          >
            <FiDroplet size={24} />
            Identificar Mi Planta Ahora
          </a>
        </div>
      </section>
    </div>
  );
}
