'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { FiX, FiUpload, FiImage } from 'react-icons/fi';

export default function ProductFormModal({ product, categories, onClose }) {
  const isEditing = !!product;
  
  const [formData, setFormData] = useState({
    nombre: '',
    nombre_cientifico: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: '',
    cuidados: '',
    luz: '',
    riego: '',
    tamano: '',
    estado: 'activo',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        nombre_cientifico: product.nombre_cientifico || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        categoria_id: product.categoria_id || '',
        cuidados: product.cuidados || '',
        luz: product.luz || '',
        riego: product.riego || '',
        tamano: product.tamano || '',
        estado: product.estado || 'activo',
      });
      setImagePreview(product.imagen_url);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      if (imageFile) {
        submitData.append('imagen', imageFile);
      }

      if (isEditing) {
        await productService.updateProduct(product.id, submitData);
        alert('✅ Producto actualizado exitosamente');
      } else {
        await productService.createProduct(submitData);
        alert('✅ Producto creado exitosamente');
      }

      onClose(true);
    } catch (err) {
      console.error('Error guardando producto:', err);
      setError(err.response?.data?.error || 'Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 p-4 overflow-y-auto pt-5">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header con mejor contraste */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {isEditing ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-white hover:text-gray-200 transition p-2 hover:bg-white/10 rounded-lg"
            title="Cerrar"
          >
            <FiX size={28} />
          </button>
        </div>

        {/* Form con mejor espaciado */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-r-lg">
              <p className="font-semibold">⚠️ Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Sección: Información Básica */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
              📋 Información Básica
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Nombre de la Planta <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Ej: Monstera Deliciosa"
                />
              </div>

              {/* Nombre Científico */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Nombre Científico
                </label>
                <input
                  type="text"
                  name="nombre_cientifico"
                  value={formData.nombre_cientifico}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Ej: Monstera deliciosa"
                />
              </div>
            </div>
          </div>

          {/* Sección: Precio e Inventario */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
              💰 Precio e Inventario
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {/* Precio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Precio (MXN) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-600 font-bold text-lg">$</span>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 text-gray-900 font-bold text-lg bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                    placeholder="450.00"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 text-gray-900 font-bold text-lg bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="10"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 font-bold bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                >
                  <option value="activo">✅ Activo</option>
                  <option value="inactivo">❌ Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Categoría y Características */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500">
              🏷️ Categoría y Características
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {/* Categoría */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 font-bold bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                >
                  <option value="">-- Selecciona una categoría --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="font-semibold">
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tamaño */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Tamaño
                </label>
                <input
                  type="text"
                  name="tamano"
                  value={formData.tamano}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Ej: Pequeño, Mediano, Grande"
                />
              </div>

              {/* Luz */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  ☀️ Requerimiento de Luz
                </label>
                <input
                  type="text"
                  name="luz"
                  value={formData.luz}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Ej: Luz indirecta brillante"
                />
              </div>

              {/* Riego */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  💧 Frecuencia de Riego
                </label>
                <input
                  type="text"
                  name="riego"
                  value={formData.riego}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                  placeholder="Ej: 1 vez por semana"
                />
              </div>
            </div>
          </div>

          {/* Sección: Descripciones */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500">
              📝 Descripciones
            </h3>
            <div className="space-y-6">
              {/* Descripción */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Descripción del Producto
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition resize-none"
                  placeholder="Describe las características principales de la planta..."
                />
              </div>

              {/* Cuidados */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Guía de Cuidados
                </label>
                <textarea
                  name="cuidados"
                  value={formData.cuidados}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 text-gray-900 font-medium bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition resize-none"
                  placeholder="Instrucciones detalladas de cuidado..."
                />
              </div>
            </div>
          </div>

          {/* Sección: Imagen */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-pink-500">
              📸 Imagen del Producto
            </h3>
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Upload button */}
              <label className="flex-shrink-0 cursor-pointer">
                <div className="flex flex-col items-center justify-center w-full md:w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 border-3 border-dashed border-gray-400 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                  <FiUpload className="text-gray-500 group-hover:text-green-600 mb-2" size={40} />
                  <span className="text-sm font-bold text-gray-700 group-hover:text-green-700 text-center px-4">
                    Click para subir imagen
                  </span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP</span>
                  <span className="text-xs text-gray-500">Máx. 5MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Preview */}
              {imagePreview && (
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700 mb-2">Vista Previa:</p>
                  <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:border-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? '⏳ Guardando...' : isEditing ? '✅ Actualizar Producto' : '✅ Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
