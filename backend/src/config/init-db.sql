-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'usuario' CHECK (rol IN ('usuario', 'admin')),
  telefono VARCHAR(20),
  direccion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos (plantas)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  nombre_cientifico VARCHAR(150),
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  imagen_url VARCHAR(500),
  categoria_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
  cuidados TEXT,
  luz VARCHAR(50),
  riego VARCHAR(50),
  tamano VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carrito
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  cantidad INTEGER DEFAULT 1 CHECK (cantidad > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(30) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado')),
  direccion_envio TEXT NOT NULL,
  telefono_contacto VARCHAR(20),
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de items de orden (detalle)
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  nombre_producto VARCHAR(150) NOT NULL,
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- Insertar categorías iniciales
INSERT INTO categories (nombre, descripcion) VALUES
('Plantas de Interior', 'Plantas ideales para espacios interiores con poca luz'),
('Plantas de Exterior', 'Plantas resistentes para jardines y patios'),
('Suculentas', 'Plantas que almacenan agua, requieren poco mantenimiento'),
('Cactus', 'Plantas desérticas con espinas'),
('Plantas Aromáticas', 'Hierbas y plantas con aroma'),
('Plantas Ornamentales', 'Plantas decorativas con flores o follaje llamativo')
ON CONFLICT (nombre) DO NOTHING;

-- Crear usuario admin por defecto
-- Password: admin123 (encriptado con bcrypt)
INSERT INTO users (nombre, email, password_hash, rol) VALUES
('Administrador', 'admin@plantas.com', '$2b$10$YourHashHere', 'admin')
ON CONFLICT (email) DO NOTHING;
