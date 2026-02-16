const express = require('express');
const router = express.Router();
const DendrosferaController = require('../controllers/dendrosferaController');

// Obtener toda la guía (público)
router.get('/guides', DendrosferaController.getAllGuides);

// Obtener recomendación por tipo de planta (público)
router.get('/recommendation', DendrosferaController.getRecommendationByType);

// Obtener recomendación desde nombre científico (público)
router.post('/recommendation/from-species', DendrosferaController.getRecommendationFromSpecies);

module.exports = router;
