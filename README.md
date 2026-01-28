# 🌿 PlantShop - E-commerce de Plantas

Sistema completo de comercio electrónico para la venta de plantas con identificación por IA.

## 🚀 Características

- 🛒 Carrito de compras funcional
- 🔐 Autenticación con JWT
- 👤 Sistema de roles (Admin/Usuario)
- 📦 Gestión de órdenes
- 🖼️ Upload de imágenes a Cloudinary
- 🤖 Identificación de plantas con IA (PlantNet API)
- 📱 Diseño responsive
- ⚡ Next.js 15 con App Router

## 🛠️ Tecnologías

### Backend
- Node.js
- Express
- PostgreSQL
- JWT
- Cloudinary
- PlantNet API

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Zustand

## 📦 Instalación Local

### Prerequisitos
- Node.js v18 o superior
- PostgreSQL v14 o superior
- Cuenta en Cloudinary
- API Key de PlantNet

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
