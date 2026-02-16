const PlantIdentificationService = require('../services/plantIdentificationService');
const SpeciesMappingModel = require('../models/speciesMappingModel');
const DendrosferaGuideModel = require('../models/dendrosferaGuideModel');

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

      // Identificar planta
      const result = await PlantIdentificationService.identifyPlant(req.file.buffer);

      if (!result.success) {
        return res.status(400).json(result);
      }

      // Obtener el primer resultado (el más probable)
      const topResult = result.results[0];
      
      // Intentar obtener recomendación de Dendrosfera
      let dendrosferaRecommendation = null;
      let plantType = null;
      let needsManualSelection = false;

      if (topResult && topResult.nombre_cientifico) {
        const mapping = await SpeciesMappingModel.getByScientificName(topResult.nombre_cientifico);
        
        if (mapping) {
          plantType = mapping.plant_type;
          dendrosferaRecommendation = await DendrosferaGuideModel.getByPlantType(plantType);
        } else {
          needsManualSelection = true;
          console.log('⚠️ Especie no mapeada:', topResult.nombre_cientifico);
        }
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
        // Nueva información de Dendrosfera
        dendrosfera: {
          plantType,
          recommendation: dendrosferaRecommendation,
          needsManualSelection
        }
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
