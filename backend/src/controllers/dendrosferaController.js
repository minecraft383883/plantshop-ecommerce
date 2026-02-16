const DendrosferaGuideModel = require('../models/dendrosferaGuideModel');
const SpeciesMappingModel = require('../models/speciesMappingModel');

class DendrosferaController {
  // Obtener toda la guía
  static async getAllGuides(req, res) {
    try {
      const guides = await DendrosferaGuideModel.getAll();
      res.json({ success: true, guides });
    } catch (error) {
      console.error('Error obteniendo guías:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener guías de Dendrosfera' 
      });
    }
  }

  // Obtener recomendación por tipo de planta
  static async getRecommendationByType(req, res) {
    try {
      const { plantType } = req.query;

      if (!plantType) {
        return res.status(400).json({ 
          success: false, 
          error: 'Parámetro plantType requerido' 
        });
      }

      const guide = await DendrosferaGuideModel.getByPlantType(plantType);

      if (!guide) {
        return res.status(404).json({ 
          success: false, 
          error: 'Tipo de planta no encontrado en la guía' 
        });
      }

      res.json({ success: true, recommendation: guide });
    } catch (error) {
      console.error('Error obteniendo recomendación:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener recomendación' 
      });
    }
  }

  // Obtener recomendación desde nombre científico
  static async getRecommendationFromSpecies(req, res) {
    try {
      const { scientificName } = req.body;

      if (!scientificName) {
        return res.status(400).json({ 
          success: false, 
          error: 'scientificName requerido' 
        });
      }

      // Buscar mapeo
      const mapping = await SpeciesMappingModel.getByScientificName(scientificName);

      if (!mapping) {
        return res.json({ 
          success: true, 
          needsManualSelection: true,
          message: 'Especie no encontrada en el mapeo. Selecciona manualmente el tipo de planta.',
          scientificName 
        });
      }

      // Obtener guía del tipo mapeado
      const guide = await DendrosferaGuideModel.getByPlantType(mapping.plant_type);

      res.json({ 
        success: true, 
        plantType: mapping.plant_type,
        recommendation: guide,
        needsManualSelection: false
      });
    } catch (error) {
      console.error('Error obteniendo recomendación desde especie:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al procesar recomendación' 
      });
    }
  }
}

module.exports = DendrosferaController;
