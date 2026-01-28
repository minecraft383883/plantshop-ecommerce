'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
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
      <nav className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">
              🌿 PlantShop
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-green-100 transition">
            🌿 PlantShop
          </Link>

          {/* Links centrales */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-green-100 transition">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-green-100 transition">
              Catálogo
            </Link>
            <Link href="/identificar" className="hover:text-green-100 transition">
              📸 Identificar
            </Link>
            {isAuthenticated && user?.rol === 'admin' && (
              <Link href="/admin" className="hover:text-green-100 transition font-semibold">
                Panel Admin
              </Link>
            )}
            {isAuthenticated && user?.rol !== 'admin' && (
            <Link href="/mis-compras" className="hover:text-green-100 transition">
             Mis Compras
            </Link>)}
          </div>

          {/* Iconos derecha */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            <Link href="/carrito" className="relative hover:text-green-100 transition">
              <FiShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:block text-sm">
                  Hola, <span className="font-semibold">{user?.nombre}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-green-100 transition flex items-center gap-1"
                  title="Cerrar sesión"
                >
                  <FiLogOut size={20} />
                  <span className="hidden md:inline text-sm">Salir</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hover:text-green-100 transition flex items-center gap-2"
              >
                <FiUser size={24} />
                <span className="hidden md:inline">Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
