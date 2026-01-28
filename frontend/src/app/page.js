import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          🌿 Bienvenido a PlantShop
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre nuestra amplia variedad de plantas para tu hogar y jardín.
          Cuidamos cada detalle para que lleguen perfectas a tu casa.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/catalogo"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Ver Catálogo
          </Link>
          <Link
            href="/identificar"
            className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
          >
            📸 Identificar Planta
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-2">Plantas Saludables</h3>
            <p className="text-gray-600">
              Cada planta es cuidadosamente seleccionada y verificada
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Envío Seguro</h3>
            <p className="text-gray-600">
              Empaque especializado para que lleguen en perfecto estado
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💚</div>
            <h3 className="text-xl font-bold mb-2">Asesoría Gratuita</h3>
            <p className="text-gray-600">
              Te ayudamos a cuidar tus plantas con guías personalizadas
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
