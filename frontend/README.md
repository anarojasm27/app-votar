# 🗳️ Sistema de Votaciones - Frontend

Frontend completo desarrollado con **Next.js 14 + Material UI + Recharts** para el Sistema de Votaciones en Línea.

## 🚀 Tecnologías

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Material UI 5 (@mui/material)
- **HTTP Client:** Axios con interceptores JWT
- **Gráficas:** Recharts (Bar & Pie charts)
- **Autenticación:** JWT (localStorage)
- **State Management:** React Context API
- **Lenguaje:** TypeScript

## 📦 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm 9+
- Backend corriendo en `http://127.0.0.1:8000` o actualizar `.env.local`

### Pasos

```bash
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL del backend

# 4. Ejecutar servidor de desarrollo
npm run dev

# 5. Abrir navegador
# http://localhost:3000
```

## 🔧 Configuración

### Variables de Entorno (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
# o para producción:
# NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
```

## 📁 Estructura del Proyecto

```
frontend/
├── app/
│   ├── layout.tsx              # Layout global con providers
│   ├── page.tsx                # Landing page
│   ├── login/page.tsx          # Página de login
│   ├── register/page.tsx       # Página de registro
│   ├── elections/
│   │   ├── page.tsx            # Lista de elecciones activas
│   │   └── [id]/
│   │       ├── vote/page.tsx   # Página de votación
│   │       └── results/page.tsx # Resultados con gráficas
│   └── history/page.tsx        # Historial de elecciones
├── components/
│   ├── Navbar.tsx              # Navbar responsive con gradient
│   ├── ProtectedRoute.tsx      # Guard para rutas autenticadas
│   └── LoadingSpinner.tsx      # Spinner de carga
├── context/
│   └── AuthContext.tsx         # Context de autenticación global
├── services/
│   ├── authService.ts          # API calls de autenticación
│   ├── electionService.ts      # API calls de elecciones
│   ├── voteService.ts          # API calls de votación
│   └── resultService.ts        # API calls de resultados
├── lib/
│   └── axios.ts                # Axios configurado con JWT interceptor
└── package.json
```

## 🎨 Características del Diseño

### Paleta de Colores Empresarial
- **Azul Principal:** `#1e3c72` 
- **Azul Secundario:** `#2a5298`
- **Gradiente:** `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`
- **Fondo:** `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`

### Componentes UI
✅ Navbar con gradient empresarial y links condicionales  
✅ Cards con hover effects (transform + box-shadow)  
✅ Botones con gradients y estados loading  
✅ Formularios con validación en tiempo real  
✅ Dialogs de confirmación con iconos  
✅ Gráficas interactivas (Recharts Bar & Pie)  
✅ Tablas con rankings y trofeos (top 3)  
✅ Chips para estados y porcentajes  
✅ Avatares para candidatos  

## 🔐 Flujo de Autenticación

1. **Registro** → `/register` → Guarda tokens JWT en localStorage → Redirige a `/elections`
2. **Login** → `/login` → Guarda tokens → Redirige a `/elections`
3. **Persistencia** → Al recargar, AuthContext verifica token y obtiene perfil
4. **Protected Routes** → `ProtectedRoute` component redirige a `/login` si no autenticado
5. **Logout** → Limpia localStorage y redirige a `/`

## 📊 Páginas Implementadas

### 🏠 Landing (/)
- Hero section con título y CTA
- 4 feature cards (Seguro, Tiempo Real, Fácil, Confiable)
- CTA section para registro
- Responsive design

### 🔐 Auth Pages
- **Login** (`/login`) - Form con email/password, manejo de errores
- **Register** (`/register`) - Form completo con validación de passwords

### 🗳️ Voting Pages
- **Elections List** (`/elections`) - Cards con elecciones activas, botones votar/resultados
- **Vote Page** (`/elections/[id]/vote`) - Verificación de voto previo, cards de candidatos, dialog de confirmación
- **Results Page** (`/elections/[id]/results`) - Gráficas Bar & Pie, tabla con rankings, **auto-polling cada 10s**
- **History** (`/history`) - Accordions con elecciones cerradas y ganadores

## 🔄 Funcionalidades Clave

### Interceptor Axios
```typescript
// Inyecta automáticamente el JWT token en todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Auto-Polling de Resultados
```typescript
// Actualización automática cada 10 segundos en /results
useEffect(() => {
  fetchResults();
  const interval = setInterval(fetchResults, 10000);
  return () => clearInterval(interval);
}, [electionId]);
```

### Verificación de Voto
```typescript
// Verifica si el usuario ya votó antes de mostrar opciones
const votedData = await hasVoted(electionId);
setAlreadyVoted(votedData.has_voted);
```

## 📈 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:3000)
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## ✅ Checklist de Funcionalidad

- [x] Landing page profesional
- [x] Registro de usuarios con validación
- [x] Login con JWT
- [x] Persistencia de sesión
- [x] Lista de elecciones activas
- [x] Vote page con verificación de voto previo
- [x] Confirmación de voto con dialog
- [x] Prevención de doble voto
- [x] Resultados con gráficas Recharts
- [x] Auto-polling de resultados (10s)
- [x] Historial de elecciones cerradas
- [x] Navbar responsive
- [x] Protected routes
- [x] Manejo de errores
- [x] Loading states
- [x] Diseño empresarial profesional

## 👤 Autor

**Ana Rojas**
- GitHub: [@anarojasm27](https://github.com/anarojasm27)

---

**Frontend 100% Completo y Funcional** ✅  
Conectado al backend Django + Supabase PostgreSQL
