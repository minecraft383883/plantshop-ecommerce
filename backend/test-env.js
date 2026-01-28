require('dotenv').config();

console.log('=== TEST DE VARIABLES DE ENTORNO ===');
console.log('PLANTNET_API_KEY:', process.env.PLANTNET_API_KEY);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('PORT:', process.env.PORT);
console.log('===================================');

if (process.env.PLANTNET_API_KEY) {
  console.log('✅ API Key de PlantNet cargada correctamente');
} else {
  console.log('❌ API Key de PlantNet NO encontrada');
}
