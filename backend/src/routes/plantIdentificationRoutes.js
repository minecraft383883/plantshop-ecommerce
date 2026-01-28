const express = require('express');
const router = express.Router();
const multer = require('multer');
const PlantIdentificationController = require('../controllers/plantIdentificationController');

// Configurar multer para memoria (no guardar en disco)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  },
});

router.post('/identify', upload.single('image'), PlantIdentificationController.identify);

module.exports = router;
