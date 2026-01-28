const OrderModel = require('../models/orderModel');

class OrderController {
  static async createOrder(req, res) {
    try {
      const { total, direccion_envio, telefono_contacto, notas, items } = req.body;
      const userId = req.user.id;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío' });
      }

      const order = await OrderModel.create({
        user_id: userId,
        total,
        direccion_envio,
        telefono_contacto,
        notas,
        items,
      });

      res.status(201).json({
        message: 'Orden creada exitosamente',
        order,
      });
    } catch (error) {
      console.error('Error creando orden:', error);
      res.status(500).json({ error: 'Error al crear orden' });
    }
  }

  static async getUserOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await OrderModel.getByUserId(userId);
      res.json({ orders });
    } catch (error) {
      console.error('Error obteniendo órdenes:', error);
      res.status(500).json({ error: 'Error al obtener órdenes' });
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.getById(id);

      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }

      const items = await OrderModel.getOrderItems(id);

      res.json({ order, items });
    } catch (error) {
      console.error('Error obteniendo detalle de orden:', error);
      res.status(500).json({ error: 'Error al obtener detalle' });
    }
  }

  static async getAllOrders(req, res) {
     try {
    const orders = await OrderModel.getAll();
    res.json({ orders });
  }  catch (error) {
    console.error('Error obteniendo todas las órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
    }
}

module.exports = OrderController;
