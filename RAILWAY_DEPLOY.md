# Deploy to Railway - Frontend

## Pasos para desplegar en Railway:

### 1. Preparación
- ✅ Variables de entorno configuradas
- ✅ Scripts de build optimizados
- ✅ Configuración de Railway (railway.toml)

### 2. En Railway Dashboard
1. Crear nuevo proyecto
2. Conectar repositorio GitHub
3. Configurar variables de entorno:
   - `VITE_API_BASE_URL=https://tu-backend-django.railway.app/api`

### 3. Build Settings (automático con railway.toml)
- Build Command: `npm run build:railway`
- Start Command: `npm start`
- Output Directory: `dist`

### 4. Variables de entorno necesarias:
```
VITE_API_BASE_URL=https://tu-backend-django.railway.app/api
PORT=4173
```

### 5. Verificación post-despliegue:
- [ ] Frontend carga correctamente
- [ ] Conexión con backend funciona
- [ ] CORS configurado en Django
- [ ] Todas las rutas funcionan
