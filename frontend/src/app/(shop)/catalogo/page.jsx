'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { productService, categoryService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { FiSearch } from 'react-icons/fi';

export default function CatalogoPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getActiveProducts(),
        categoryService.getCategories(),
      ]);
      setProducts(productsData.products);
      setCategories(categoriesData.categories);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadData();
      return;
    }
    
    try {
      const data = await productService.searchProducts(searchQuery);
      setProducts(data.products);
    } catch (error) {
      console.error('Error buscando:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.categoria_id === parseInt(selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌿 Catálogo de Plantas
          </h1>
          <p className="text-gray-600">
            Descubre nuestra colección de plantas saludables
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="mb-8 space-y-4">
          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar plantas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Buscar
            </button>
          </form>

          {/* Categorías */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id.toString())}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === cat.id.toString()
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">😕 No hay productos disponibles</p>
            <p className="text-gray-400 mt-2">Intenta con otra categoría o búsqueda</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {filteredProducts.length} producto{filteredProducts.length !== 1 && 's'} encontrado{filteredProducts.length !== 1 && 's'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
