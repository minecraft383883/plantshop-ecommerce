'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FiDroplet, FiCheckCircle, FiTrendingUp, FiHeart, FiStar } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';

export default function HomePage() {
  const howItWorks = [
    {
      step: '1',
      icon: '📸',
      title: 'Identifica tu Planta',
      description: 'Sube una foto o toma una imagen de tu planta con tu cámara'
    },
    {
      step: '2',
      icon: '🤖',
      title: 'IA Analiza',
      description: 'Nuestra inteligencia artificial identifica el tipo de planta y sus necesidades'
    },
    {
      step: '3',
      icon: '💡',
      title: 'Recibe Recomendación',
      description: 'Obtén dosis exacta, frecuencia y cantidad mensual de Dendrosfera'
    },
    {
      step: '4',
      icon: '🛒',
      title: 'Compra y Aplica',
      description: 'Elige tu paquete ideal y ve resultados visibles en tus plantas'
    }
  ];

  const benefits = [
    { icon: <FiTrendingUp className="text-green-600" size={32} />, text: 'Crecimiento 2x más rápido' },
    { icon: <FiHeart className="text-red-500" size={32} />, text: 'Plantas más saludables' },
    { icon: <FiStar className="text-yellow-500" size={32} />, text: 'Hojas más verdes y brillantes' },
    { icon: <GiPlantSeed className="text-green-700" size={32} />, text: '100% Natural y Orgánico' },
  ];

  const testimonials = [
    {
      name: 'María González',
      plant: 'Monstera',
      text: 'Mis monsteras nunca habían crecido tan rápido. En solo 3 semanas vi hojas nuevas más grandes.',
      rating: 5
    },
    {
      name: 'Carlos Ramírez',
      plant: 'Suculentas',
      text: 'Perfecto para mis suculentas. La dosis exacta me ayudó a no sobre-fertilizar. ¡Recomendado!',
      rating: 5
    },
    {
      name: 'Ana Torres',
      plant: 'Orquídeas',
      text: 'Mis orquídeas florecieron más de lo normal. El identificador me dio las recomendaciones perfectas.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-95"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🌿</div>
          <div className="absolute bottom-20 right-20 text-9xl">🌱</div>
          <div className="absolute top-1/2 left-1/4 text-7xl">🍃</div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 animate-pulse">
              <span className="font-bold">🌿 Nutriente Natural de Liberación Controlada</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Transforma tus Plantas con <span className="text-green-200">Dendrosfera</span>
            </h1>
            
            <p className="text-2xl text-green-100 mb-8 leading-relaxed">
              Identifica tu planta con IA y recibe recomendaciones personalizadas de nutrición. 
              <span className="font-bold text-white"> Resultados visibles en semanas.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/identificar"
                className="bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-50 transition shadow-2xl inline-flex items-center justify-center gap-3 group"
              >
                <FiDroplet size={28} className="group-hover:scale-110 transition" />
                Identificar Mi Planta
              </Link>
              <Link
                href="/dendrosfera"
                className="bg-green-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-400 transition shadow-2xl inline-flex items-center justify-center gap-3"
              >
                Ver Producto
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  {benefit.icon}
                  <span className="font-semibold text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            En 4 simples pasos transforma la salud de tus plantas
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/identificar"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg"
            >
              Empezar Ahora
              <FiCheckCircle size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Por Qué Dendrosfera */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                ¿Por Qué Elegir Dendrosfera?
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Liberación Controlada', desc: 'Nutrientes que se liberan gradualmente según las necesidades de la planta' },
                  { title: 'Fácil de Usar', desc: 'Solo aplica las esferas. Sin mezclas, sin complicaciones' },
                  { title: 'Personalizado', desc: 'Recomendaciones específicas según el tipo de planta identificado' },
                  { title: 'Resultados Garantizados', desc: 'Crecimiento visible, hojas más verdes, flores más abundantes' },
                  { title: 'Eco-Friendly', desc: '100% natural, sin químicos dañinos para el ambiente' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <FiCheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-12 text-white shadow-2xl">
              <div className="text-center">
                <GiPlantSeed size={80} className="mx-auto mb-6 text-green-100" />
                <h3 className="text-3xl font-bold mb-4">Empieza Hoy</h3>
                <p className="text-green-100 text-lg mb-8">
                  Identifica tu planta en segundos y recibe recomendaciones personalizadas
                </p>
                <Link
                  href="/identificar"
                  className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
                >
                  Identificar Planta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Miles de plantas más felices gracias a Dendrosfera
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t-2 border-gray-200 pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">Propietario de {testimonial.plant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Dale a tus Plantas lo que Merecen
          </h2>
          <p className="text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
            Usa inteligencia artificial para identificar tus plantas y nutrirlas de forma personalizada
          </p>
          <Link
            href="/identificar"
            className="inline-flex items-center gap-3 bg-white text-green-600 px-12 py-6 rounded-xl font-bold text-xl hover:bg-green-50 transition shadow-2xl"
          >
            <FiDroplet size={28} />
            Empezar Ahora - Es Gratis
          </Link>
          <p className="mt-6 text-green-200 text-sm">
            ✓ Identificación gratuita ✓ Recomendaciones personalizadas ✓ Sin registro necesario
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiPlantSeed size={32} className="text-green-400" />
            <span className="text-2xl font-bold text-white">Dendrosfera</span>
          </div>
          <p className="mb-6">Nutriendo el futuro verde, una planta a la vez 🌿</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-white transition">Inicio</Link>
            <Link href="/identificar" className="hover:text-white transition">Identificar</Link>
            <Link href="/dendrosfera" className="hover:text-white transition">Producto</Link>
            <Link href="/auth/login" className="hover:text-white transition">Login</Link>
          </div>
          <p className="mt-8 text-xs">© 2026 Dendrosfera. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
