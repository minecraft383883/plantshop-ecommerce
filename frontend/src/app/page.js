import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FiCheckCircle, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Dendrosfera */}
      <section className="relative bg-gradient-to-br from-[#5a7a3d] to-[#6b8e4a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                DENDROSFERA
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-[#CADBB7] font-light">
                Microesferas nutritivas para tus plantas
              </p>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Cultivamos el cambio desde casa. Cuida tus plantas de forma consciente, 
              eficiente y sostenible con nuestra innovadora tecnología de liberación 
              controlada de nutrientes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/catalogo"
                className="bg-white text-[#485935] px-8 sm:px-10 py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-[#CADBB7] transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Catálogo de Plantas
              </Link>
              <Link
                href="/productos"
                className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-white hover:text-[#485935] transition-all"
              >
                Comprar Microesferas
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ¿Quiénes somos? */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#485935] mb-8 text-center">
              ¿Quiénes somos?
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                Somos <span className="font-bold text-[#5a7a3d]">Dendrosfera</span>, un proyecto joven que nace de la curiosidad, la creatividad y 
                el deseo de generar impacto positivo. Creemos en las ideas que crecen, 
                evolucionan y se fortalecen cuando se trabajan en comunidad, igual que los 
                ecosistemas naturales.
              </p>
              <p>
                Nos mueve la innovación con propósito, la experimentación y el aprendizaje 
                constante. En Dendrosfera conectamos pensamiento creativo, conciencia 
                ambiental y acción, para desarrollar propuestas que buscan transformar la forma 
                en que entendemos y cuidamos nuestro entorno.
              </p>
              <p className="text-xl font-semibold text-[#485935]">
                Más que un proyecto, somos una comunidad en crecimiento. Un espacio para 
                quienes quieren crear, compartir y ser parte de algo que deja raíz y futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo nace Dendrosfera? */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#FBFBFB] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#485935] mb-8 text-center">
              ¿Cómo nace Dendrosfera?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
              <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed order-2 md:order-1">
                <p>
                  <span className="font-bold text-[#5a7a3d]">Dendrosfera</span> nace de una idea simple pero poderosa: 
                  <span className="font-semibold"> el cambio comienza en casa</span>. Surge con la intención de crear conciencia desde los hogares, fomentando 
                  una cultura de cuidado, respeto y conexión con la naturaleza desde lo cotidiano.
                </p>
                <p>
                  A partir de esta visión, desarrollamos nuestro producto: <span className="font-bold text-[#485935]">microesferas nutritivas 
                  para plantas</span>, diseñadas para liberar nutrientes de forma eficiente y apoyar el 
                  crecimiento saludable de las plantas, incluso en espacios pequeños.
                </p>
                <p className="text-[#5a7a3d] font-medium">
                  Son una herramienta accesible para que cualquier persona pueda participar activamente 
                  en el cuidado del entorno, empezando desde su propio hogar.
                </p>
              </div>
              
              {/* Imagen de microesferas - puedes agregar la imagen del documento */}
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-[#CADBB7] to-[#93A267] rounded-2xl p-8 shadow-xl">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-6xl mb-4">🌱</div>
                    <h3 className="text-2xl font-bold text-[#485935] mb-3">Microesferas Nutritivas</h3>
                    <p className="text-gray-600">
                      Tecnología innovadora de liberación controlada de nutrientes para tus plantas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ODS - Objetivos de Desarrollo Sostenible */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#485935] mb-6 text-center">
                Alineados con los Objetivos de Desarrollo Sostenible
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[#F5F5F0] rounded-xl">
                  <div className="bg-[#5a7a3d] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-bold text-[#485935] mb-2">Salud y Bienestar</h4>
                  <p className="text-sm text-gray-600">
                    Promoviendo hogares y espacios más verdes y saludables
                  </p>
                </div>
                
                <div className="text-center p-6 bg-[#F5F5F0] rounded-xl">
                  <div className="bg-[#5a7a3d] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    11
                  </div>
                  <h4 className="font-bold text-[#485935] mb-2">Ciudades Sostenibles</h4>
                  <p className="text-sm text-gray-600">
                    Impulsando una cultura ambiental desde casa hacia la ciudad
                  </p>
                </div>
                
                <div className="text-center p-6 bg-[#F5F5F0] rounded-xl">
                  <div className="bg-[#5a7a3d] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    15
                  </div>
                  <h4 className="font-bold text-[#485935] mb-2">Vida de Ecosistemas</h4>
                  <p className="text-sm text-gray-600">
                    Fortaleciendo el cuidado de plantas y biodiversidad
                  </p>
                </div>
              </div>
              
              <p className="text-center text-lg sm:text-xl text-[#485935] font-semibold mt-8">
                Sembrar conciencia hoy, desde casa, es cultivar un futuro más sostenible para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#485935] text-center mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Innovación, compromiso y pasión por el medio ambiente en cada microesfera
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Innovación */}
            <div className="bg-gradient-to-br from-[#CADBB7] to-[#93A267] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiTrendingUp className="text-[#485935] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#485935] mb-4 text-center">Innovación</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Tecnología de liberación controlada desarrollada con investigación científica
              </p>
            </div>

            {/* Sustentabilidad */}
            <div className="bg-gradient-to-br from-[#CADBB7] to-[#93A267] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiCheckCircle className="text-[#485935] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#485935] mb-4 text-center">Sustentabilidad</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Compromiso real con el medio ambiente y prácticas responsables
              </p>
            </div>

            {/* Accesibilidad */}
            <div className="bg-gradient-to-br from-[#CADBB7] to-[#93A267] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiUsers className="text-[#485935] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#485935] mb-4 text-center">Accesibilidad</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Soluciones al alcance de todos para cultivar desde cualquier hogar
              </p>
            </div>

            {/* Comunidad */}
            <div className="bg-gradient-to-br from-[#CADBB7] to-[#93A267] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FiAward className="text-[#485935] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-[#485935] mb-4 text-center">Comunidad</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Crecemos juntos compartiendo conocimiento y experiencias
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Guía Viva */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#5a7a3d] to-[#6b8e4a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Guía Viva Dendrosfera
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-4 leading-relaxed">
              Cada planta es distinta, y en Dendrosfera creemos que cuidarlas también debería serlo.
            </p>
            <p className="text-base sm:text-lg text-[#CADBB7] mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestro catálogo de plantas con recomendaciones precisas sobre la dosis 
              correcta de microesferas nutritivas. Sin complicaciones, sin exceso, con conciencia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/catalogo"
                className="inline-block bg-white text-[#485935] px-10 py-4 rounded-lg text-lg font-bold hover:bg-[#CADBB7] transition-all transform hover:scale-105 shadow-xl"
              >
                Explorar Catálogo de Plantas
              </Link>
              <Link
                href="/identificar"
                className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-[#485935] transition-all"
              >
                📸 Identificar mi Planta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c3a21] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-xl mb-4 text-[#CADBB7]">Dendrosfera</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Microesferas nutritivas para tus plantas. Cultivamos conciencia desde casa.
              </p>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-lg mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-[#CADBB7] transition">Inicio</Link></li>
                <li><Link href="/productos" className="hover:text-[#CADBB7] transition">Productos</Link></li>
                <li><Link href="/catalogo" className="hover:text-[#CADBB7] transition">Catálogo de Plantas</Link></li>
                <li><Link href="/nosotros" className="hover:text-[#CADBB7] transition">Nosotros</Link></li>
              </ul>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-lg mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: info@dendrosfera.com</li>
                <li>WhatsApp: +52 (81) 1234-5678</li>
                <li>Reynosa, Tamaulipas</li>
              </ul>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-lg mb-4">Síguenos</h4>
              <div className="flex justify-center sm:justify-start space-x-4 mb-4">
                <a href="#" className="hover:text-[#CADBB7] transition text-2xl">📘</a>
                <a href="#" className="hover:text-[#CADBB7] transition text-2xl">📷</a>
                <a href="#" className="hover:text-[#CADBB7] transition text-2xl">🐦</a>
              </div>
              <Link 
                href="/qr"
                className="inline-block bg-[#5a7a3d] hover:bg-[#6b8e4a] px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                📱 Compartir QR
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2026 Dendrosfera. Todos los derechos reservados. | Más que un proyecto, una comunidad en crecimiento 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
