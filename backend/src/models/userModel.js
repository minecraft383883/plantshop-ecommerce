const db = require('../config/database');
const bcrypt = require('bcrypt');

class UserModel {
  // Buscar usuario por email
  static async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  // Crear nuevo usuario
  static async create(userData) {
    const { nombre, email, password, telefono, direccion, rol } = userData;
    
    // Encriptar contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      `INSERT INTO users (nombre, email, password_hash, telefono, direccion, rol) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, nombre, email, rol, created_at`,
      [nombre, email, password_hash, telefono, direccion, rol || 'usuario']
    );
    
    return result.rows[0];
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Buscar usuario por ID
  static async findById(id) {
    const result = await db.query(
      'SELECT id, nombre, email, rol, telefono, direccion, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = UserModel;
