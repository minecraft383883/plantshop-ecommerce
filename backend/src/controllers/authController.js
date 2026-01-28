const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
  // Registro de usuario
  static async register(req, res) {
    try {
      const { nombre, email, password, telefono, direccion } = req.body;

      // Validaciones
      if (!nombre || !email || !password) {
        return res.status(400).json({ 
          error: 'Nombre, email y contraseña son requeridos' 
        });
      }

      // Verificar si ya existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          error: 'El email ya está registrado' 
        });
      }

      // Crear usuario
      const newUser = await UserModel.create({
        nombre,
        email,
        password,
        telefono,
        direccion,
        rol: 'usuario'
      });

      // Generar token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, rol: newUser.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
        token
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }

  // Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: 'Credenciales incorrectas' 
        });
      }

      // Verificar contraseña
      const isValidPassword = await UserModel.verifyPassword(
        password, 
        user.password_hash
      );

      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Credenciales incorrectas' 
        });
      }

      // Generar token
      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        },
        token
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  // Obtener perfil
  static async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }
}

module.exports = AuthController;
