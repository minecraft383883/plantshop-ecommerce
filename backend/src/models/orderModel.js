const db = require('../config/database');

class OrderModel {
  static async create(orderData) {
    const { user_id, total, direccion_envio, telefono_contacto, notas, items } = orderData;

    // Iniciar transacción
    const client = await db.query('BEGIN');

    try {
      // Crear orden
      const orderResult = await db.query(
        `INSERT INTO orders (user_id, total, direccion_envio, telefono_contacto, notas, estado) 
         VALUES ($1, $2, $3, $4, $5, 'pendiente') 
         RETURNING *`,
        [user_id, total, direccion_envio, telefono_contacto, notas]
      );

      const order = orderResult.rows[0];

      // Insertar items de la orden
      for (const item of items) {
        await db.query(
          `INSERT INTO order_items (order_id, product_id, nombre_producto, cantidad, precio_unitario, subtotal) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [order.id, item.product_id, item.nombre_producto, item.cantidad, item.precio_unitario, item.subtotal]
        );

        // Reducir stock
        await db.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.cantidad, item.product_id]
        );
      }

      await db.query('COMMIT');
      return order;
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
  }

  static async getByUserId(userId) {
    const result = await db.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async getById(orderId) {
    const result = await db.query(
      `SELECT * FROM orders WHERE id = $1`,
      [orderId]
    );
    return result.rows[0];
  }

  static async getOrderItems(orderId) {
    const result = await db.query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      [orderId]
    );
    return result.rows;
  }
  static async getAll(){
    const result = await db.query(
        `SELECT o.*, u.nombre as user_name, u.email as user_email
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
    );
    return result.rows;
    }
}




module.exports = OrderModel;
