const PlantIdentificationService = require('../services/plantIdentificationService');

class PlantIdentificationController {
  static async identify(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false,
          error: 'No se proporcionó imagen' 
        });
      }

      console.log('📸 Procesando imagen:', {
        size: `${(req.file.size / 1024).toFixed(2)} KB`,
        type: req.file.mimetype,
      });

      const result = await PlantIdentificationService.identifyPlant(req.file.buffer);

      if (!result.success) {
        return res.status(400).json(result);
      }

      // Agregar mensaje según el modo
      const message = result.demo 
        ? '🧪 Modo Demo: Resultados de prueba (configura API key para identificación real)'
        : '✅ Planta identificada con IA';

      res.json({
        success: true,
        message,
        results: result.results,
        total: result.total,
        demo: result.demo || false,
      });

    } catch (error) {
      console.error('❌ Error en controlador:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error interno al procesar la imagen' 
      });
    }
  }
}

module.exports = PlantIdentificationController;
