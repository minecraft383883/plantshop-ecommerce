const db = require('./database');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('📋 Creando tablas...');
    
    const sqlPath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await db.query(sql);
    
    console.log('✅ Tablas creadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    process.exit(1);
  }
}

setupDatabase();
