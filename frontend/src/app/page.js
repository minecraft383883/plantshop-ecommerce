'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiShoppingCart, FiCheckCircle, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProductosPage() {
  const [guides, setGuides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dendrosfera/guides`)
      .then(res => res.json())
      .then(data => setGuides(data))
      .catch(err => console.error(err));
  }, []);

  // Cálculos de paginación
  const totalPages = Math.ceil(guides.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGuides = guides.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll suave a la tabla
    document.getElementById('tabla-guias')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Dendrosfera 🌿</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Nutrición inteligente de liberación prolongada para todas tus plantas
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <FiCheckCircle size={24} />
              <span>6 meses de nutrición</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle size={24} />
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle size={24} />
              <span>Fácil de usar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Liberación Prolongada</h3>
              <p className="text-gray-600">
                Nutrientes que se liberan gradualmente por 6 meses, sin riesgo de sobre-fertilización
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fácil Aplicación</h3>
              <p className="text-gray-600">
                Solo coloca las esferas en el sustrato. Sin mezclas ni mediciones complicadas
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">100% Natural</h3>
              <p className="text-gray-600">
                Formulación orgánica segura para plantas, mascotas y el medio ambiente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guía de Uso con Paginación */}
      <section className="py-16 bg-white" id="tabla-guias">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Guía de Uso por Tipo de Planta
            </h2>
            <p className="text-xl text-gray-600">
              Recomendaciones específicas para cada tipo de planta
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold">Tipo de Planta</th>
                    <th className="px-4 py-4 text-left font-semibold">Ejemplos</th>
                    <th className="px-4 py-4 text-left font-semibold">Dosis</th>
                    <th className="px-4 py-4 text-left font-semibold">Frecuencia</th>
                    <th className="px-4 py-4 text-left font-semibold">Consumo Mensual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentGuides.map((guide, index) => (
                    <tr key={index} className="hover:bg-green-50 transition">
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {guide.plant_type}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {guide.examples}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                          {guide.dose_per_application}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {guide.frequency}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-green-600">
                        {guide.monthly_consumption}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Controles de Paginación */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Info de página */}
                <div className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold">{startIndex + 1}</span> a{' '}
                  <span className="font-semibold">{Math.min(endIndex, guides.length)}</span> de{' '}
                  <span className="font-semibold">{guides.length}</span> tipos de plantas
                </div>

                {/* Botones de navegación */}
                <div className="flex items-center gap-2">
                  {/* Anterior */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow'
                    }`}
                  >
                    <FiChevronLeft size={18} />
                    Anterior
                  </button>

                  {/* Números de página */}
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Mostrar solo 5 páginas alrededor de la actual
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold transition ${
                              currentPage === pageNum
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 3 ||
                        pageNum === currentPage + 3
                      ) {
                        return (
                          <span key={pageNum} className="w-10 h-10 flex items-center justify-center">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Siguiente */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow'
                    }`}
                  >
                    Siguiente
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para nutrir tus plantas?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Identifica tu planta y obtén recomendaciones personalizadas de Dendrosfera
          </p>
          <a
            href="/identificar"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl"
          >
            <FiShoppingCart size={24} />
            Identificar Mi Planta
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
