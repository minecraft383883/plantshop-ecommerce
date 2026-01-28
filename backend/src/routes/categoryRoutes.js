const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY nombre');
    res.json({ categories: result.rows });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

module.exports = router;
