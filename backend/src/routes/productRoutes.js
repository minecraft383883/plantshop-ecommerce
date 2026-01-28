const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Rutas públicas
router.get('/active', ProductController.getActiveProducts);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProductById);

// Rutas protegidas (solo admin)
router.get('/', authenticateToken, isAdmin, ProductController.getAllProducts);

router.post('/',
  authenticateToken,
  isAdmin,
  upload.single('imagen'),
  ProductController.createProduct
);

router.put('/:id',
  authenticateToken,
  isAdmin,
  upload.single('imagen'),
  ProductController.updateProduct
);

router.delete('/:id',
  authenticateToken,
  isAdmin,
  ProductController.deleteProduct
);

router.patch('/:id/toggle-status',
  authenticateToken,
  isAdmin,
  ProductController.toggleProductStatus
);

module.exports = router;
