const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // ← CAMBIO: siempre SSL para Railway
});

// Probar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err);
  } else {
    console.log('✅ Conectado a PostgreSQL exitosamente');
    console.log('📍 Database:', client.database);
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
