'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { FiCamera, FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';
import api from '@/services/api';

export default function IdentificarPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError('');
    }
  };

  const handleIdentify = async () => {
  if (!selectedImage) {
    setError('Por favor selecciona una imagen primero');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const formData = new FormData();
    formData.append('image', selectedImage);

    const response = await api.post('/plant-id/identify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      setResults(response.data.results);
      
      // Mostrar info si es modo demo
      if (response.data.demo) {
        setError('🧪 Modo Demo: Mostrando resultados de ejemplo. Para identificación real, contacta al administrador.');
      }
    } else {
      setError(response.data.error || 'No se pudo identificar la planta');
    }
  } catch (err) {
    console.error('Error identificando planta:', err);
    setError('Error de conexión. Verifica que el servidor esté activo.');
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResults(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🌿 Identificador de Plantas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Toma una foto o sube una imagen de una planta y descubre su nombre usando inteligencia artificial
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sección de carga de imagen */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📸 Captura tu Planta
              </h2>

              {!previewUrl ? (
                <div className="space-y-4">
                  {/* Input oculto */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-input"
                  />

                  {/* Botón cámara */}
                  <label
                    htmlFor="image-input"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl cursor-pointer hover:from-green-600 hover:to-green-700 transition shadow-lg"
                  >
                    <FiCamera size={24} />
                    <span className="text-lg font-semibold">Tomar Foto</span>
                  </label>

                  {/* Botón subir */}
                  <label
                    htmlFor="image-input"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
                  >
                    <FiUpload size={24} />
                    <span className="text-lg font-semibold">Subir Imagen</span>
                  </label>

                  {/* Consejos */}
                  <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h3 className="font-bold text-green-800 mb-2">💡 Consejos para mejores resultados:</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Toma la foto con buena iluminación</li>
                      <li>✓ Enfoca hojas, flores o frutos</li>
                      <li>✓ Asegúrate que la imagen esté nítida</li>
                      <li>✓ Acércate lo suficiente a la planta</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Preview de imagen */}
                  <div className="relative mb-6">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={handleReset}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  {/* Botón identificar */}
                  <button
                    onClick={handleIdentify}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Identificando...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle size={24} />
                        Identificar Planta
                      </>
                    )}
                  </button>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sección de resultados */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🔍 Resultados
              </h2>

              {!results ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <p className="text-gray-500">
                    Los resultados de identificación aparecerán aquí
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-xl p-4 transition hover:shadow-lg ${
                        index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Imagen */}
                        {result.imagen && (
                          <img
                            src={result.imagen}
                            alt={result.nombre_cientifico}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {index === 0 && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Mejor Match
                              </span>
                            )}
                            <span className="text-sm font-semibold text-gray-600">
                              {result.score}% confianza
                            </span>
                          </div>

                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {result.nombre_comun}
                          </h3>
                          <p className="text-sm italic text-gray-600 mb-2">
                            {result.nombre_cientifico}
                          </p>
                          <p className="text-xs text-gray-500">
                            Familia: {result.familia}
                          </p>

                          {result.wikipedia && (
                            <a
                              href={result.wikipedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                            >
                              Ver en Wikipedia →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA para ver catálogo */}
          {results && (
            <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                ¿Te gustó esta planta?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Explora nuestro catálogo para encontrar plantas similares
              </p>
              <a
                href="/catalogo"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Ver Catálogo de Plantas
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
