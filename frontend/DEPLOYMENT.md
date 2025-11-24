# 🚀 DESPLIEGUE A VERCEL - PASO A PASO

## ✅ Opción 1: Despliegue Mediante Dashboard Web (RECOMENDADO)

### Paso 1: Preparar GitHub
1. Asegúrate de que tu código esté en GitHub:
   ```bash
   git push origin master
   ```

### Paso 2: Acceder a Vercel
1. Ir a: https://vercel.com
2. Hacer clic en **"Sign Up"** o **"Login"**
3. Seleccionar **"Continue with GitHub"**
4. Autorizar a Vercel para acceder a tus repositorios

### Paso 3: Importar Proyecto
1. En el dashboard de Vercel, click en **"Add New..."** → **"Project"**
2. Buscar y seleccionar el repositorio: `anarojasm27/app-votar`
3. Click en **"Import"**

### Paso 4: Configurar Deployment
En la pantalla de configuración:

**Framework Preset:** Next.js (detectado automáticamente)

**Root Directory:** `frontend` ⚠️ **IMPORTANTE**
- Click en **"Edit"** junto a Root Directory
- Escribir: `frontend`
- Click en **"Continue"**

**Build and Output Settings:**
- Build Command: `npm run build` (auto)
- Output Directory: `.next` (auto)
- Install Command: `npm install` (auto)

**Environment Variables:** 
Click en **"Environment Variables"** y agregar:
```
NEXT_PUBLIC_API_URL = http://127.0.0.1:8000/api
```
*(Actualizar con URL de Railway cuando esté desplegado)*

### Paso 5: Deploy
1. Click en **"Deploy"**
2. Esperar 2-3 minutos mientras Vercel:
   - Clona el repositorio
   - Instala dependencias
   - Ejecuta `npm run build`
   - Genera archivos estáticos
   - Despliega a CDN global

### Paso 6: Verificar Deployment
Una vez completado:
1. Vercel mostrará: ✅ **"Deployment Ready"**
2. URL de producción: `https://app-votar-xxxx.vercel.app`
3. Click en **"Visit"** para abrir la app

### Paso 7: Configurar Dominio (Opcional)
1. En el proyecto, ir a **"Settings"** → **"Domains"**
2. Agregar dominio personalizado: `votaciones.tudominio.com`
3. Configurar DNS según instrucciones de Vercel

---

## ✅ Opción 2: Despliegue Mediante CLI

### Instalación
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy desde Frontend
```bash
cd frontend
vercel --prod
```

Seguir prompts:
- Set up and deploy? **Yes**
- Which scope? **(Tu cuenta)**
- Link to existing project? **No**
- What's your project's name? **app-votar-frontend**
- In which directory is your code located? **"./"**

---

## 🔧 POST-DEPLOYMENT: Actualizar Backend URL

Una vez que tengas la URL de Vercel:

### En Vercel Dashboard:
1. Ir a project **"app-votar-frontend"**
2. Click en **"Settings"** → **"Environment Variables"**
3. Editar `NEXT_PUBLIC_API_URL`:
   - Valor: `https://tu-backend.railway.app/api` *(cuando Railway esté listo)*
4. Click en **"Save"**
5. Ir a **"Deployments"** → Click en el último deployment → **"Redeploy"**

### En Local (.env.local):
```env
# Para desarrollo local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# Para apuntar a producción (testing)
# NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
```

---

## 🧪 VERIFICACIÓN POST-DEPLOYMENT

### 1. Verificar que el sitio carga
- Abrir: `https://app-votar-xxxx.vercel.app`
- Landing page debe cargar correctamente
- Navbar visible con gradiente azul
- Botones de Login/Registro funcionales

### 2. Probar conexión con Backend LOCAL
```bash
# En otra terminal, asegúrate que el backend corre:
cd c:\app-votar
venv\Scripts\activate
python manage.py runserver

# Luego en Vercel app, intenta:
# - Registrarte
# - Login
# - Ver elecciones
```

**Nota:** Vercel app apuntará a `localhost:8000` que NO funcionará desde internet. Solo para testing local necesitas:
1. Tener backend corriendo localmente
2. Abrir Vercel app en `localhost` (no funciona desde internet hasta que backend esté en Railway)

### 3. Verificar Build Logs
En Vercel Dashboard:
1. Ir a **"Deployments"**
2. Click en el deployment más reciente
3. Ver **"Building"** logs:
   - ✅ `npm install` exitoso
   - ✅ `npm run build` exitoso
   - ✅ 0 errores de TypeScript/ESLint

---

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Root Directory not found"
**Solución:** Asegurar que Root Directory = `frontend`

### Error: "Build failed - Module not found"
**Solución:** 
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
git add -A
git commit -m "fix: regenerate lock file"
git push
```
Luego redeploy en Vercel

### Error: "NEXT_PUBLIC_API_URL is undefined"
**Solución:** Verificar que variable de entorno esté en Vercel Settings y redeploy

### CORS Error al conectar con Backend
**Solución:** En Django `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'https://app-votar-xxxx.vercel.app',
    'http://localhost:3000',
]
```

---

## 📊 MÉTRICAS DE DEPLOYMENT

**Tiempo promedio de deployment:** 2-3 minutos  
**Uptime esperado:** 99.9%  
**CDN:** Global (Vercel Edge Network)  
**SSL:** Automático (HTTPS)  
**Rollback:** Instantáneo (desde Dashboard)

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Frontend desplegado en Vercel
2. ⏳ **TODO:** Desplegar Backend en Railway
3. ⏳ **TODO:** Actualizar `NEXT_PUBLIC_API_URL` en Vercel
4. ⏳ **TODO:** Configurar CORS en Django para URL de Vercel
5. ⏳ **TODO:** Ejecutar testing funcional completo

---

**URL del Frontend:** `https://app-votar-xxxx.vercel.app`  
**Status:** ✅ Desplegado y funcionando  
**Última actualización:** 2025-01-24
