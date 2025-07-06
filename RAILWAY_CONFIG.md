# Railway Frontend Environment Configuration

## Variables de entorno necesarias:
- `VITE_API_BASE_URL`: URL de tu API backend (ej: https://tu-backend.up.railway.app/api)

## Configuración del proyecto:
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`
- Port: Se toma automáticamente de $PORT

## Troubleshooting:
Si tienes el error "host not allowed", asegúrate de que:
1. El dominio de Railway esté en `allowedHosts` en vite.config.ts
2. Las variables de entorno estén configuradas correctamente
3. El build se completó sin errores

## Deploy:
Para redeplegar después de cambios en vite.config.ts:
1. Haz commit de los cambios
2. Push a tu repositorio
3. Railway detectará automáticamente los cambios y redeplegará
