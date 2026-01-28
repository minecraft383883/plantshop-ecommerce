const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Rutas protegidas
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;
