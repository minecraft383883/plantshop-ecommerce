import api from './api';

export const dendrosferaService = {
  // Obtener todas las guías
  getAllGuides: async () => {
    const response = await api.get('/dendrosfera/guides');
    return response.data;
  },

  // Obtener recomendación por tipo de planta
  getRecommendationByType: async (plantType) => {
    const response = await api.get(`/dendrosfera/recommendation?plantType=${plantType}`);
    return response.data;
  },

  // Obtener recomendación desde nombre científico
  getRecommendationFromSpecies: async (scientificName) => {
    const response = await api.post('/dendrosfera/recommendation/from-species', {
      scientificName
    });
    return response.data;
  },
};
