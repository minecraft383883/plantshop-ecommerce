'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import useAuthStore from '@/store/authStore';
import { productService, categoryService } from '@/services/productService';
import ProductTable from '@/components/admin/ProductTable';
import ProductFormModal from '@/components/admin/ProductFormModal';
import { FiPlus, FiPackage, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';


export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    lowStock: 0,
    totalValue: 0,
  });

  // Protección de ruta
  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (isAuthenticated && user?.rol === 'admin') {
      loadData();
    }
  }, [isAuthenticated, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getCategories(),
      ]);
      
      setProducts(productsData.products);
      setCategories(categoriesData.categories);
      
      // Calcular estadísticas
      const activeProducts = productsData.products.filter(p => p.estado === 'activo');
      const lowStockProducts = productsData.products.filter(p => p.stock < 5 && p.stock > 0);
      const totalValue = productsData.products.reduce((sum, p) => sum + (p.precio * p.stock), 0);
      
      setStats({
        total: productsData.products.length,
        active: activeProducts.length,
        lowStock: lowStockProducts.length,
        totalValue: totalValue,
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await productService.deleteProduct(productId);
      alert('✅ Producto eliminado exitosamente');
      loadData();
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('❌ Error al eliminar producto');
    }
  };

  const handleToggleStatus = async (productId) => {
    try {
      await productService.toggleProductStatus(productId);
      alert('✅ Estado actualizado');
      loadData();
    } catch (error) {
      console.error('Error cambiando estado:', error);
      alert('❌ Error al cambiar estado');
    }
  };

  const handleModalClose = (reload) => {
    setShowModal(false);
    setEditingProduct(null);
    if (reload) {
      loadData();
    }
  };

  if (!isAuthenticated || user?.rol !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛠️ Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestiona tu inventario de plantas
          </p>
        </div>

        {/* Estadísticas */}{/* Estadísticas */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Total Productos</p>
        <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
      </div>
      <FiPackage className="text-blue-500" size={40} />
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Productos Activos</p>
        <p className="text-3xl font-bold text-green-600">{stats.active}</p>
      </div>
      <div className="text-green-500 text-4xl">✓</div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Stock Bajo</p>
        <p className="text-3xl font-bold text-orange-600">{stats.lowStock}</p>
      </div>
      <FiAlertCircle className="text-orange-500" size={40} />
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Valor Inventario</p>
        <p className="text-3xl font-bold text-green-600">
          ${stats.totalValue.toFixed(2)}
        </p>
      </div>
      <FiDollarSign className="text-green-500" size={40} />
    </div>
  </div>
</div>

{/* Nueva sección: Accesos Rápidos */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <Link
    href="/admin/ordenes"
    className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">📦 Ver Órdenes</h3>
      <div className="bg-white/20 p-3 rounded-full">
        <FiPackage size={28} />
      </div>
    </div>
    <p className="text-blue-100">Gestiona todas las compras realizadas</p>
  </Link>

  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white cursor-default">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">🌿 Inventario</h3>
      <div className="bg-white/20 p-3 rounded-full">
        <FiPackage size={28} />
      </div>
    </div>
    <p className="text-green-100">Gestiona productos y stock (estás aquí)</p>
  </div>

  <Link
    href="/catalogo"
    className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:from-purple-600 hover:to-purple-700 transition transform hover:scale-105"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">👁️ Ver Tienda</h3>
      <div className="bg-white/20 p-3 rounded-full">
        <FiPackage size={28} />
      </div>
    </div>
    <p className="text-purple-100">Ver como lo ven tus clientes</p>
  </Link>
</div>




        {/* Botón Agregar */}
        <div className="mb-6">
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
          >
            <FiPlus size={20} />
            Agregar Producto
          </button>
        </div>

        {/* Tabla de Productos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        ) : (
          <ProductTable
            products={products}
            categories={categories}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Modal de Formulario */}
      {showModal && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
