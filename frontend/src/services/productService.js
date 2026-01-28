import api from './api';

export const productService = {
  // Productos públicos
  getActiveProducts: async () => {
    const response = await api.get('/products/active');
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Productos admin
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  toggleProductStatus: async (id) => {
    const response = await api.patch(`/products/${id}/toggle-status`);
    return response.data;
  },
};

export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};
