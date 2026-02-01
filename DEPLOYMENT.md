# 🚀 Guía de Deployment en Vercel

## 🌿 PlantShop - Frontend Deployment

Sigue estos pasos para desplegar tu aplicación PlantShop en Vercel:

---

## 📌 Paso 1: Preparar el Repositorio

Asegúrate de que todos los cambios estén en GitHub:

```bash
git pull origin main
```

---

## 🔗 Paso 2: Conectar con Vercel

### Opción A: Desde la Web de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Click en **"Add New Project"**
4. Importa tu repositorio `plantshop-ecommerce`
5. Vercel detectará automáticamente Next.js

### Opción B: Desde la Terminal (CLI)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel
```

---

## ⚙️ Paso 3: Configurar el Proyecto

En la configuración de Vercel:

### 📁 Root Directory
```
frontend
```

### 🔧 Framework Preset
```
Next.js
```

### 💾 Build Command (default)
```
npm run build
```

### 📂 Output Directory (default)
```
.next
```

---

## 🔑 Paso 4: Configurar Variables de Entorno

En **Project Settings > Environment Variables**, agrega:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://plantshop-ecommerce-production.up.railway.app/api` | URL de tu backend en Railway |

---

## 🎉 Paso 5: Deploy!

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Instala las dependencias
   - Construye tu aplicación
   - La despliega globalmente

3. ¡Listo! Obtendrás una URL como:
   ```
   https://plantshop-ecommerce-tu-usuario.vercel.app
   ```

---

## ⚙️ Configuración Adicional

### Dominio Personalizado (Opcional)

1. Ve a **Project Settings > Domains**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### Auto-Deployment

Vercel desplegará automáticamente cuando hagas push a `main`:

```bash
git add .
git commit -m "Actualizar frontend"
git push origin main
```

🚀 Vercel detecta el push y redespliega automáticamente!

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Verifica que package.json tenga todas las dependencias
cd frontend
npm install
```

### Error: "Build failed"
```bash
# Prueba el build localmente primero
cd frontend
npm run build
```

### Error: "API not connecting"
- Verifica que `NEXT_PUBLIC_API_URL` esté configurada en Vercel
- Asegúrate de que tu backend en Railway esté funcionando

---

## 📊 Monitoreo

- **Analytics**: Ve a tu proyecto en Vercel > Analytics
- **Logs**: Project > Deployments > [tu deployment] > Function Logs
- **Performance**: Vercel te mostrará métricas de velocidad

---

## 🌿 ¡Felicidades!

Tu PlantShop está ahora desplegado en Vercel con:
- ✅ Deploy automático en cada push
- ✅ HTTPS gratis
- ✅ CDN global
- ✅ Previews de Pull Requests

🔗 **URL de Producción**: `https://tu-proyecto.vercel.app`
