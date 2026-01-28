const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Rutas de órdenes
router.post('/create', authenticateToken, OrderController.createOrder);
router.get('/my-orders', authenticateToken, OrderController.getUserOrders);
router.get('/all', authenticateToken, isAdmin, OrderController.getAllOrders);
router.get('/:id', authenticateToken, OrderController.getOrderDetails);

module.exports = router;
