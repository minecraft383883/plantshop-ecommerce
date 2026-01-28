const ProductModel = require('../models/productModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

class ProductController {
  // Obtener todos los productos (Admin)
  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json({ products });
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  // Obtener productos activos (Público)
  static async getActiveProducts(req, res) {
    try {
      const products = await ProductModel.getActive();
      res.json({ products });
    } catch (error) {
      console.error('Error obteniendo productos activos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  // Obtener producto por ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getById(id);

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({ product });
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  // Crear producto con imagen
  static async createProduct(req, res) {
    try {
      const productData = req.body;

      // Validaciones básicas
      if (!productData.nombre || !productData.precio) {
        return res.status(400).json({ 
          error: 'Nombre y precio son requeridos' 
        });
      }

      let imagen_url = null;

      // Si hay imagen, subirla a Cloudinary
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'catalogo-plantas',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        imagen_url = uploadResult.secure_url;
      }

      // Crear producto con la URL de la imagen
      const newProduct = await ProductModel.create({
        ...productData,
        imagen_url,
      });

      res.status(201).json({
        message: 'Producto creado exitosamente',
        product: newProduct,
      });
    } catch (error) {
      console.error('Error creando producto:', error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  }

  // Actualizar producto
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;

      // Verificar si el producto existe
      const existingProduct = await ProductModel.getById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      let imagen_url = existingProduct.imagen_url;

      // Si hay nueva imagen, subirla
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'catalogo-plantas',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        imagen_url = uploadResult.secure_url;
      }

      // Actualizar producto
      const updatedProduct = await ProductModel.update(id, {
        ...productData,
        imagen_url,
      });

      res.json({
        message: 'Producto actualizado exitosamente',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error actualizando producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  // Eliminar producto
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const deletedProduct = await ProductModel.delete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({
        message: 'Producto eliminado exitosamente',
        product: deletedProduct,
      });
    } catch (error) {
      console.error('Error eliminando producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }

  // Cambiar estado activo/inactivo
  static async toggleProductStatus(req, res) {
    try {
      const { id } = req.params;

      const updatedProduct = await ProductModel.toggleStatus(id);

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json({
        message: `Producto ${updatedProduct.estado}`,
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error cambiando estado:', error);
      res.status(500).json({ error: 'Error al cambiar estado' });
    }
  }

  // Buscar productos
  static async searchProducts(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({ error: 'Parámetro de búsqueda requerido' });
      }

      const products = await ProductModel.search(q);
      res.json({ products });
    } catch (error) {
      console.error('Error buscando productos:', error);
      res.status(500).json({ error: 'Error al buscar productos' });
    }
  }
}

module.exports = ProductController;
