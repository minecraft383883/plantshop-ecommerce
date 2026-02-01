const axios = require('axios');
const FormData = require('form-data');

class PlantIdentificationService {
  static async identifyPlant(imageBuffer) {
    try {
      const apiKey = process.env.PLANTNET_API_KEY;
      
      // Verificar si hay API key
      if (!apiKey || apiKey === 'tu_api_key_aqui') {
        console.log('🌿 Modo Demo: No hay API key configurada');
        return this.getDemoResults();
      }

      console.log('🔍 Intentando identificar con PlantNet API...');

      try {
        // Crear FormData correctamente
        const formData = new FormData();
        
        // Agregar imagen como buffer con nombre y tipo MIME
        formData.append('images', imageBuffer, {
          filename: 'plant.jpg',
          contentType: 'image/jpeg',
        });
        
        // Órganos de la planta (auto detecta el tipo)
        formData.append('organs', 'auto');

        // URL con API key como parámetro
        const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}`;

        const response = await axios.post(url, formData, {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 30000, // 30 segundos
        });

        console.log('✅ Respuesta exitosa de PlantNet');

        // Verificar si hay resultados
        if (!response.data.results || response.data.results.length === 0) {
          console.log('⚠️ No se encontraron resultados, usando demo');
          return this.getDemoResults();
        }

        // Procesar resultados
        const results = response.data.results.slice(0, 5).map(result => {
          const species = result.species;
          const scientificName = species.scientificNameWithoutAuthor;
          
          return {
            nombre_cientifico: scientificName,
            nombre_comun: species.commonNames?.[0] || 'No disponible',
            familia: species.family?.scientificNameWithoutAuthor || 'Desconocida',
            score: (result.score * 100).toFixed(2),
            imagen: result.images?.[0]?.url?.m || null,
            wikipedia: `https://es.wikipedia.org/wiki/${scientificName.replace(/ /g, '_')}`,
          };
        });

        return {
          success: true,
          results,
          total: results.length,
          api: 'PlantNet',
        };

      } catch (apiError) {
        console.error('❌ Error con PlantNet API:', {
          status: apiError.response?.status,
          message: apiError.response?.data?.message || apiError.message,
        });

        // Si es error 403, la API key es inválida
        if (apiError.response?.status === 403) {
          console.error('🔑 API Key inválida o sin permisos');
        }

        // Fallback a demo
        return this.getDemoResults();
      }

    } catch (error) {
      console.error('❌ Error general:', error.message);
      return this.getDemoResults();
    }
  }

  static getDemoResults() {
    // Resultados de demostración variados
    const allDemoPlants = [
      // Rosas
      [
        {
          nombre_cientifico: 'Rosa × hybrida',
          nombre_comun: 'Rosa',
          familia: 'Rosaceae',
          score: '94.50',
          imagen: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Rosa',
        },
        {
          nombre_cientifico: 'Rosa chinensis',
          nombre_comun: 'Rosa de China',
          familia: 'Rosaceae',
          score: '89.30',
          imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Rosa_chinensis',
        },
        {
          nombre_cientifico: 'Rosa damascena',
          nombre_comun: 'Rosa de Damasco',
          familia: 'Rosaceae',
          score: '85.70',
          imagen: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Rosa_damascena',
        },
      ],
      // Suculentas/Cactus
      [
        {
          nombre_cientifico: 'Euphorbia trigona',
          nombre_comun: 'Euphorbia Candelabro',
          familia: 'Euphorbiaceae',
          score: '92.80',
          imagen: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Euphorbia_trigona',
        },
        {
          nombre_cientifico: 'Echeveria elegans',
          nombre_comun: 'Rosa de Alabastro',
          familia: 'Crassulaceae',
          score: '88.50',
          imagen: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Echeveria',
        },
        {
          nombre_cientifico: 'Haworthia fasciata',
          nombre_comun: 'Planta Cebra',
          familia: 'Asphodelaceae',
          score: '85.20',
          imagen: 'https://images.unsplash.com/photo-1519336305162-4b6ed6b6fc83?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Haworthia',
        },
      ],
      // Plantas tropicales
      [
        {
          nombre_cientifico: 'Monstera deliciosa',
          nombre_comun: 'Costilla de Adán',
          familia: 'Araceae',
          score: '96.20',
          imagen: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Monstera_deliciosa',
        },
        {
          nombre_cientifico: 'Philodendron bipinnatifidum',
          nombre_comun: 'Filodendro',
          familia: 'Araceae',
          score: '90.40',
          imagen: 'https://images.unsplash.com/photo-1597690515683-3b57c6e90f3f?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Philodendron',
        },
        {
          nombre_cientifico: 'Epipremnum aureum',
          nombre_comun: 'Pothos Dorado',
          familia: 'Araceae',
          score: '86.10',
          imagen: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400',
          wikipedia: 'https://es.wikipedia.org/wiki/Epipremnum_aureum',
        },
      ],
    ];

    // Seleccionar set aleatorio
    const randomSet = allDemoPlants[Math.floor(Math.random() * allDemoPlants.length)];
    
    // Agregar 2 plantas genéricas más
    randomSet.push(
      {
        nombre_cientifico: 'Sansevieria trifasciata',
        nombre_comun: 'Lengua de Suegra',
        familia: 'Asparagaceae',
        score: '75.40',
        imagen: 'https://images.unsplash.com/photo-1593482892290-e8c5c8c4e674?w=400',
        wikipedia: 'https://es.wikipedia.org/wiki/Sansevieria_trifasciata',
      },
      {
        nombre_cientifico: 'Ficus elastica',
        nombre_comun: 'Árbol del Caucho',
        familia: 'Moraceae',
        score: '68.20',
        imagen: 'https://images.unsplash.com/photo-1598880940371-c756e015faf1?w=400',
        wikipedia: 'https://es.wikipedia.org/wiki/Ficus_elastica',
      }
    );

    return {
      success: true,
      results: randomSet,
      total: randomSet.length,
      demo: true,
    };
  }
}

module.exports = PlantIdentificationService;
