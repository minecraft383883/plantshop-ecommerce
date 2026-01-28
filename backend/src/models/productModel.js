const db = require('../config/database');

class ProductModel {
  // Obtener todos los productos (admin)
  static async getAll() {
    const result = await db.query(
      `SELECT p.*, c.nombre as categoria_nombre 
       FROM products p 
       LEFT JOIN categories c ON p.categoria_id = c.id 
       ORDER BY p.created_at DESC`
    );
    return result.rows;
  }

  // Obtener solo productos activos (usuarios)
  static async getActive() {
    const result = await db.query(
      `SELECT p.*, c.nombre as categoria_nombre 
       FROM products p 
       LEFT JOIN categories c ON p.categoria_id = c.id 
       WHERE p.estado = 'activo' AND p.stock > 0
       ORDER BY p.created_at DESC`
    );
    return result.rows;
  }

  // Obtener producto por ID
  static async getById(id) {
    const result = await db.query(
      `SELECT p.*, c.nombre as categoria_nombre 
       FROM products p 
       LEFT JOIN categories c ON p.categoria_id = c.id 
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Crear producto
  static async create(productData) {
    const {
      nombre,
      nombre_cientifico,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id,
      cuidados,
      luz,
      riego,
      tamano,
      estado
    } = productData;

    const result = await db.query(
      `INSERT INTO products 
       (nombre, nombre_cientifico, descripcion, precio, stock, imagen_url, 
        categoria_id, cuidados, luz, riego, tamano, estado) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [nombre, nombre_cientifico, descripcion, precio, stock, imagen_url, 
       categoria_id, cuidados, luz, riego, tamano, estado || 'activo']
    );
    return result.rows[0];
  }

  // Actualizar producto
  static async update(id, productData) {
    const {
      nombre,
      nombre_cientifico,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id,
      cuidados,
      luz,
      riego,
      tamano,
      estado
    } = productData;

    const result = await db.query(
      `UPDATE products 
       SET nombre = $1, nombre_cientifico = $2, descripcion = $3, 
           precio = $4, stock = $5, imagen_url = $6, categoria_id = $7,
           cuidados = $8, luz = $9, riego = $10, tamano = $11, 
           estado = $12, updated_at = CURRENT_TIMESTAMP
       WHERE id = $13 
       RETURNING *`,
      [nombre, nombre_cientifico, descripcion, precio, stock, imagen_url, 
       categoria_id, cuidados, luz, riego, tamano, estado, id]
    );
    return result.rows[0];
  }

  // Eliminar producto
  static async delete(id) {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  // Cambiar estado (activo/inactivo)
  static async toggleStatus(id) {
    const result = await db.query(
      `UPDATE products 
       SET estado = CASE WHEN estado = 'activo' THEN 'inactivo' ELSE 'activo' END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 
       RETURNING *`,
      [id]
    );
    return result.rows[0];
  }

  // Actualizar stock
  static async updateStock(id, cantidad) {
    const result = await db.query(
      `UPDATE products 
       SET stock = stock + $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 
       RETURNING *`,
      [cantidad, id]
    );
    return result.rows[0];
  }

  // Buscar productos
  static async search(query) {
    const result = await db.query(
      `SELECT p.*, c.nombre as categoria_nombre 
       FROM products p 
       LEFT JOIN categories c ON p.categoria_id = c.id 
       WHERE p.estado = 'activo' 
       AND (LOWER(p.nombre) LIKE LOWER($1) 
            OR LOWER(p.nombre_cientifico) LIKE LOWER($1)
            OR LOWER(p.descripcion) LIKE LOWER($1))
       ORDER BY p.created_at DESC`,
      [`%${query}%`]
    );
    return result.rows;
  }
}

module.exports = ProductModel;
