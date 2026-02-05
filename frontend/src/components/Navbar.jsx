'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!mounted) {
    return (
      <nav className="bg-gradient-to-r from-[#5a7a3d] to-[#6b8e4a] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              🌿 <span>Dendrosfera</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-[#5a7a3d] to-[#6b8e4a] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold hover:text-[#CADBB7] transition-colors flex items-center gap-2"
          >
            🌿 <span className="hidden sm:inline">Dendrosfera</span><span className="sm:hidden">D</span>
          </Link>

          {/* Links centrales - Desktop */}
          <div className="hidden lg:flex space-x-8">
            <Link 
              href="/" 
              className="hover:text-[#CADBB7] transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="hover:text-[#CADBB7] transition-colors font-medium"
            >
              Productos
            </Link>
            <Link 
              href="/catalogo" 
              className="hover:text-[#CADBB7] transition-colors font-medium"
            >
              Catálogo de Plantas
            </Link>
            <Link 
              href="/identificar" 
              className="hover:text-[#CADBB7] transition-colors font-medium"
            >
              📸 Identificar
            </Link>
            {isAuthenticated && user?.rol === 'admin' && (
              <Link 
                href="/admin" 
                className="hover:text-[#CADBB7] transition-colors font-bold"
              >
                Panel Admin
              </Link>
            )}
            {isAuthenticated && user?.rol !== 'admin' && (
              <Link 
                href="/mis-compras" 
                className="hover:text-[#CADBB7] transition-colors font-medium"
              >
                Mis Compras
              </Link>
            )}
          </div>

          {/* Iconos derecha - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Carrito */}
            <Link 
              href="/carrito" 
              className="relative hover:text-[#CADBB7] transition-colors"
            >
              <FiShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CADBB7] text-[#485935] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Hola, <span className="font-semibold">{user?.nombre}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-[#CADBB7] transition-colors flex items-center gap-2"
                  title="Cerrar sesión"
                >
                  <FiLogOut size={20} />
                  <span className="text-sm font-medium">Salir</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-white text-[#485935] px-6 py-2 rounded-lg font-semibold hover:bg-[#CADBB7] hover:text-[#485935] transition-all flex items-center gap-2 shadow-md"
              >
                <FiUser size={20} />
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link href="/carrito" className="relative">
              <FiShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CADBB7] text-[#485935] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:text-[#CADBB7] transition-colors"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#6b8e4a] rounded-b-lg shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-3">
              <Link 
                href="/" 
                className="block py-3 px-4 hover:bg-[#5a7a3d] rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Inicio
              </Link>
              <Link 
                href="/productos" 
                className="block py-3 px-4 hover:bg-[#5a7a3d] rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                🛍️ Productos
              </Link>
              <Link 
                href="/catalogo" 
                className="block py-3 px-4 hover:bg-[#5a7a3d] rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                🌱 Catálogo de Plantas
              </Link>
              <Link 
                href="/identificar" 
                className="block py-3 px-4 hover:bg-[#5a7a3d] rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                📸 Identificar Planta
              </Link>
              
              {isAuthenticated && user?.rol === 'admin' && (
                <Link 
                  href="/admin" 
                  className="block py-3 px-4 bg-[#CADBB7] text-[#485935] rounded-lg transition-colors font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ⚙️ Panel Admin
                </Link>
              )}
              
              {isAuthenticated && user?.rol !== 'admin' && (
                <Link 
                  href="/mis-compras" 
                  className="block py-3 px-4 hover:bg-[#5a7a3d] rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📦 Mis Compras
                </Link>
              )}

              <div className="border-t border-[#CADBB7]/30 my-4"></div>

              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-4 py-2 text-sm">
                    Hola, <span className="font-semibold">{user?.nombre}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-white text-[#485935] rounded-lg font-semibold hover:bg-[#CADBB7] transition-all flex items-center justify-center gap-2"
                  >
                    <FiLogOut size={20} />
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="block py-3 px-4 bg-white text-[#485935] rounded-lg font-semibold hover:bg-[#CADBB7] transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUser className="inline mr-2" size={20} />
                  Entrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
