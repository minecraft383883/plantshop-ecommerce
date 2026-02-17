'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';
import useCartStore from '@/store/cartStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null); // ⬅️ NUEVO: Estado para el usuario
  const pathname = usePathname();
  const router = useRouter();
  
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  
  // ⬅️ ACTUALIZADO: Leer usuario Y carrito después de montar
  useEffect(() => {
    setMounted(true);
    // Leer usuario de localStorage solo en el cliente
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(storedUser);
    }
  }, []);
  
  const totalItems = mounted ? getTotalItems() : 0;
  const isAdmin = user?.rol === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // ⬅️ NUEVO: Actualizar estado
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/identificar', label: '🔍 Identificar Planta', highlight: true },
    { href: '/dendrosfera', label: 'Producto' },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition">
            <GiPlantSeed size={32} className="text-green-200" />
            <span className="text-2xl font-bold">Dendrosfera</span>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold transition ${
                  link.highlight
                    ? 'bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg'
                    : pathname === link.href
                    ? 'text-white border-b-2 border-white'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Acciones Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Carrito CON BADGE */}
            <Link
              href="/carrito"
              className="relative text-white hover:text-green-200 transition"
            >
              <FiShoppingCart size={24} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ⬇️ ACTUALIZADO: Usuario con mounted */}
            {mounted ? (
              user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-white hover:text-green-200 font-semibold"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <span className="text-white text-sm">Hola, {user.nombre}</span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-300 transition"
                    title="Cerrar sesión"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-green-50 transition"
                >
                  <FiUser size={18} />
                  Iniciar Sesión
                </Link>
              )
            ) : (
              // ⬅️ NUEVO: Placeholder mientras carga
              <div className="w-32 h-10 bg-white/20 rounded-lg animate-pulse"></div>
            )}
            {/* ⬆️ FIN ACTUALIZACIÓN */}
          </div>

          {/* Menú Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-700 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white py-2 px-4 hover:bg-green-600 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/carrito"
              className="block text-white py-2 px-4 hover:bg-green-600 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              🛒 Carrito {mounted && totalItems > 0 && `(${totalItems})`}
            </Link>
            
            {/* ⬇️ ACTUALIZADO: Menú mobile con mounted */}
            {mounted && (
              user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block text-white py-2 px-4 hover:bg-green-600 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white py-2 px-4 hover:bg-green-600 rounded"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block text-white py-2 px-4 hover:bg-green-600 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )
            )}
            {/* ⬆️ FIN ACTUALIZACIÓN */}
          </div>
        )}
      </div>
    </nav>
  );
}
