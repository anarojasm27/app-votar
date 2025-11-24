DESARROLLO FRONTEND - SISTEMA DE VOTACIONES

DATOS INICIALES REQUERIDOS
COPIAR Y COMPLETAR ANTES DE INICIAR:
# ═══════════════════════════════════════════════════
# DATOS INICIALES PARA DESARROLLO FRONTEND
# ═══════════════════════════════════════════════════

CONTEXTO_PROYECTO:
nombre: "app-votar"
tipo: "Frontend - Sistema de Votaciones"
stack: "Next.js 14 + React 18 + Material UI + Axios"
objetivo: "Desarrollar frontend completo al 100%"

ENTORNO_DESARROLLO:
sistema_operativo: "[Windows/Linux/macOS]"
node_version: "[EJECUTAR: node --version]"
npm_version: "[EJECUTAR: npm --version]"
directorio_trabajo: "[RUTA COMPLETA: /tu/ruta/app-votar]"
editor: "[VSCode/WebStorm/etc]"

BACKEND_ENDPOINTS:
# Backend ya desplegado del PLAN B
url_local: "http://127.0.0.1:8000/api"
url_produccion: "[https://tu-backend.railway.app/api]"
estado_backend: " COMPLETADO Y FUNCIONAL"

ENDPOINTS_DISPONIBLES:
# Ya validados en PLAN B
autenticacion:
- "POST /register/"
- "POST /login/"
- "GET /profile/"
- "POST /token/refresh/"
consulta:
- "GET /elections/"
- "GET /elections/{id}/"
- "GET /candidates/"
- "GET /candidates/{id}/"
votacion:
- "POST /vote/"
- "GET /has-voted/{id}/"
- "GET /results/{id}/"

- "GET /history/"

REPOSITORIO_GIT:
usar_github: "[Si/No]"
url_repositorio: "[https://github.com/usuario/repo o 'N/A']"
rama: "main"

CONFIGURACION:
puerto_desarrollo: "3000"
crear_usuarios_prueba: "Si"

CONTROL DE AVANCES
Fase Nombre Estado Checkpoint Validación Timestamp
1 Setup Next.js PENDIENTE - - -
2 Servicios y Auth PENDIENTE - - -
3 Layout y Base PENDIENTE - - -
4 Auth Pages PENDIENTE - - -
5 Voting Pages PENDIENTE - - -
6 Optimizaciones PENDIENTE - - -
7 Deploy y Docs PENDIENTE - - -
Estados: PENDIENTE | EN PROGRESO | COMPLETADO | ERROR
Métrica Global: 0% → Actualizar tras cada fase

ARQUITECTURA DEL FRONTEND
Stack:
• Framework: Next.js 14 (App Router)
• UI: React 18 + Material UI 5
• HTTP: Axios
• State: React Context API
• Charts: Recharts
• Auth: JWT (del backend)
Estructura Final:
frontend/
├── app/
│ ├── layout.js # Layout global + providers
│ ├── page.js # Landing page
│ ├── login/page.js # Login
│ ├── register/page.js # Registro

│ ├── elections/
│ │ ├── page.js # Lista elecciones
│ │ └── [id]/
│ │ ├── vote/page.js # Votación
│ │ └── results/page.js # Resultados
│ └── history/page.js # Historial
├── components/
│ ├── Navbar.js # Navbar global
│ ├── ProtectedRoute.js # HOC auth
│ ├── LoadingSpinner.js # Loading
│ ├── ElectionCard.js # Card elección
│ └── CandidateCard.js # Card candidato
├── context/
│ └── AuthContext.js # Estado auth global
├── services/
│ ├── authService.js # API auth
│ ├── electionService.js # API elections
│ ├── voteService.js # API voting
│ └── resultService.js # API results
├── lib/
│ └── axios.js # Axios config
├── public/
│ └── favicon.ico
├── .env.local # Variables (NO versionar)
├── .env.example # Plantilla
├── .gitignore
├── package.json
└── next.config.js

═══════════════════════════════════════════════════
FASE 1: SETUP Y CONFIGURACIÓN INICIAL
═══════════════════════════════════════════════════
OBJETIVO
Inicializar proyecto Next.js, instalar dependencias, configurar variables de entorno.
SECCIÓN 1.1: Verificación de Prerrequisitos
# Verificar Node.js (requerido 18+)
node --version

# Verificar npm
npm --version

# Navegar a directorio raíz (donde está backend/)
cd /ruta/a/app-votar

Node 18+ instalado
npm funcional
En directorio correcto

SECCIÓN 1.2: Inicialización de Next.js
# Crear proyecto Next.js
npx create-next-app@latest frontend

# Durante instalación, responder:
# ✔ Would you like to use TypeScript? ... No
# ✔ Would you like to use ESLint? ... Yes
# ✔ Would you like to use Tailwind CSS? ... No
# ✔ Would you like to use `src/` directory? ... No
# ✔ Would you like to use App Router? ... Yes
# ✔ Would you like to customize the default import alias? ... No

# Navegar a frontend
cd frontend

# Verificar estructura
ls -la
# Debe mostrar: app/, public/, package.json, next.config.js
Next.js 14 creado
App Router habilitado
Estructura creada

SECCIÓN 1.3: Instalación de Dependencias
# Material UI core
npm install @mui/material @emotion/react @emotion/styled

# Iconos MUI
npm install @mui/icons-material

# HTTP client
npm install axios

# Gráficos
npm install recharts

# JWT decode
npm install jwt-decode

# Verificar package.json
cat package.json | grep -E "mui|axios|recharts|jwt"

Todas las dependencias instaladas

SECCIÓN 1.4: Configuración de Variables de Entorno
Crear: .env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
Crear: .env.example
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api
Modificar: .gitignore (agregar)
.env.local
.env*.local
Variables configuradas
.env.local no se versionará

SECCIÓN 1.5: Test de Servidor de Desarrollo
npm run dev

# Abrir navegador: http://localhost:3000
# Debe mostrar página de bienvenida Next.js
# Ctrl+C para detener
Servidor funciona

CHECKPOINT FASE 1
• Next.js inicializado
• Dependencias instaladas
• Variables de entorno configuradas
• Servidor funcional
Actualizar tabla: Fase 1 COMPLETADO | Métrica: 14%

═══════════════════════════════════════════════════
FASE 2: SERVICIOS Y AUTENTICACIÓN
═══════════════════════════════════════════════════
OBJETIVO
Configurar Axios, crear servicios de API, implementar Context de autenticación.
SECCIÓN 2.1: Configuración de Axios
Crear: lib/axios.js
import axios from 'axios';

const api = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor: agregar token JWT automáticamente

api.interceptors.request.use(
(config) => {
if (typeof window !== 'undefined') {
const token = localStorage.getItem('access_token');
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
}
return config;
},
(error) => Promise.reject(error)
);

export default api;
Axios configurado con interceptor JWT

SECCIÓN 2.2: Servicios de API
Crear: services/authService.js
import api from '@/lib/axios';

export const register = async (data) => {
const response = await api.post('/register/', data);
return response.data;
};

export const login = async (email, password) => {
const response = await api.post('/login/', { email, password });
return response.data;
};

export const getProfile = async () => {
const response = await api.get('/profile/');
return response.data;
};
Crear: services/electionService.js
import api from '@/lib/axios';

export const getElections = async (status = null) => {
const url = status ? `/elections/?status=${status}` : '/elections/';
const response = await api.get(url);
return response.data;
};

export const getElectionDetail = async (id) => {
const response = await api.get(`/elections/${id}/`);
return response.data;
};
Crear: services/voteService.js
import api from '@/lib/axios';

export const hasVoted = async (electionId) => {
const response = await api.get(`/has-voted/${electionId}/`);
return response.data;
};

export const castVote = async (electionId, candidateId) => {
const response = await api.post('/vote/', {
election_id: electionId,
candidate_id: candidateId
});
return response.data;
};
Crear: services/resultService.js
import api from '@/lib/axios';

export const getResults = async (electionId) => {
const response = await api.get(`/results/${electionId}/`);
return response.data;
};

export const getHistory = async () => {
const response = await api.get('/history/');
return response.data;
};
4 servicios creados (12 funciones)

SECCIÓN 2.3: Context de Autenticación
Crear: context/AuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { register as registerAPI, login as loginAPI, getProfile } from '@/services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const router = useRouter();

// Verificar token al montar
useEffect(() => {
const checkAuth = async () => {
const token = localStorage.getItem('access_token');
if (token) {
try {
const userData = await getProfile();
setUser(userData);
} catch (error) {
localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');
}
}
setLoading(false);
};
checkAuth();
}, []);

const register = async (data) => {
try {
const response = await registerAPI(data);
localStorage.setItem('access_token', response.tokens.access);
localStorage.setItem('refresh_token', response.tokens.refresh);
setUser(response.user);
router.push('/elections');
return { success: true };
} catch (error) {
return { success: false, error: error.response?.data };
}
};

const login = async (email, password) => {
try {
const response = await loginAPI(email, password);
localStorage.setItem('access_token', response.tokens.access);
localStorage.setItem('refresh_token', response.tokens.refresh);
setUser(response.user);
router.push('/elections');

return { success: true };
} catch (error) {
return { success: false, error: error.response?.data };
}
};

const logout = () => {
localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');
setUser(null);
router.push('/');
};

return (
<AuthContext.Provider value={{ user, loading, register, login, logout }}>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
AuthContext completo

CHECKPOINT FASE 2
• Axios configurado
• 4 servicios de API creados
• AuthContext implementado
Actualizar tabla: Fase 2 COMPLETADO | Métrica: 28%

═══════════════════════════════════════════════════
FASE 3: LAYOUT Y COMPONENTES BASE
═══════════════════════════════════════════════════
OBJETIVO
Crear Navbar, configurar layout global con tema MUI, componente ProtectedRoute.
SECCIÓN 3.1: Componente Navbar
Crear: components/Navbar.js
'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
const { user, logout } = useAuth();

return (
<AppBar position="sticky">
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
Sistema de Votaciones
</Typography>

<Box sx={{ display: 'flex', gap: 2 }}>
<Button color="inherit" component={Link} href="/">
Inicio
</Button>

{user ? (
<>
<Button color="inherit" component={Link} href="/elections">
Elecciones
</Button>
<Button color="inherit" component={Link} href="/history">
Historial
</Button>
<Typography sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
{user.full_name}
</Typography>
<Button color="inherit" onClick={logout}>
Salir
</Button>
</>
) : (
<>
<Button color="inherit" component={Link} href="/login">
Iniciar Sesión
</Button>
<Button color="inherit" component={Link} href="/register">
Registrarse
</Button>
</>
)}
</Box>
</Toolbar>
</AppBar>
);
}

Navbar responsive creado

SECCIÓN 3.2: Layout Global
Modificar: app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
palette: {
primary: { main: '#1976d2' },
secondary: { main: '#dc004e' },
},
});

export const metadata = {
title: 'Sistema de Votaciones',
description: 'Plataforma de votaciones en línea segura y moderna',
};

export default function RootLayout({ children }) {
return (
<html lang="es">
<body className={inter.className}>
<AuthProvider>
<ThemeProvider theme={theme}>
<CssBaseline />
<Navbar />
<main>{children}</main>
</ThemeProvider>
</AuthProvider>
</body>
</html>
);
}
Layout con providers configurado

SECCIÓN 3.3: Componente ProtectedRoute

Crear: components/ProtectedRoute.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children }) {
const { user, loading } = useAuth();
const router = useRouter();

useEffect(() => {
if (!loading && !user) {
router.push('/login');
}
}, [loading, user, router]);

if (loading) {
return (
<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
<CircularProgress />
</Box>
);
}

return user ? children : null;
}
ProtectedRoute implementado

SECCIÓN 3.4: Componentes Reutilizables Base
Crear: components/LoadingSpinner.js
import { Box, CircularProgress } from '@mui/material';

export default function LoadingSpinner() {
return (
<Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
<CircularProgress />
</Box>
);
}
Componentes base creados

CHECKPOINT FASE 3

• Navbar creado
• Layout global configurado
• ProtectedRoute implementado
• Componentes reutilizables base
Actualizar tabla: Fase 3 COMPLETADO | Métrica: 42%

═══════════════════════════════════════════════════
FASE 4: PÁGINAS DE AUTENTICACIÓN
═══════════════════════════════════════════════════
OBJETIVO
Crear Landing, Login y Register con validaciones.
SECCIÓN 4.1: Landing Page
Modificar: app/page.js
'use client';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { HowToVote, Speed, Security } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
const { user } = useAuth();

return (
<Container maxWidth="lg">
<Box sx={{ textAlign: 'center', py: 8 }}>
<Typography variant="h2" gutterBottom>
Sistema de Votaciones en Línea
</Typography>
<Typography variant="h5" color="text.secondary" paragraph>
Realiza votaciones de forma segura, rápida y transparente
</Typography>

<Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
{user ? (
<Button variant="contained" size="large" component={Link} href="/elections">
Ver Elecciones
</Button>
) : (
<>
<Button variant="contained" size="large" component={Link} href="/login">
Iniciar Sesión
</Button>
<Button variant="outlined" size="large" component={Link} href="/register">

Registrarse
</Button>
</>
)}
</Box>

<Grid container spacing={4} sx={{ mt: 6 }}>
<Grid item xs={12} md={4}>
<Card>
<CardContent sx={{ textAlign: 'center' }}>
<Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
<Typography variant="h6">Seguro</Typography>
<Typography color="text.secondary">
Autenticación JWT y anonimato garantizado
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} md={4}>
<Card>
<CardContent sx={{ textAlign: 'center' }}>
<Speed sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
<Typography variant="h6">Tiempo Real</Typography>
<Typography color="text.secondary">
Resultados actualizados al instante
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} md={4}>
<Card>
<CardContent sx={{ textAlign: 'center' }}>
<HowToVote sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
<Typography variant="h6">Fácil de Usar</Typography>
<Typography color="text.secondary">
Interfaz intuitiva desde cualquier dispositivo
</Typography>
</CardContent>
</Card>
</Grid>
</Grid>
</Box>
</Container>

);
}
Landing page creada

SECCIÓN 4.2: Página de Login
Crear: app/login/page.js
'use client';
import { useState } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const { login } = useAuth();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);

const result = await login(email, password);

if (!result.success) {
setError(result.error?.error || 'Error al iniciar sesión');
}
setLoading(false);
};

return (
<Container maxWidth="sm" sx={{ mt: 8 }}>
<Card>
<CardContent sx={{ p: 4 }}>
<Typography variant="h4" gutterBottom textAlign="center">
Iniciar Sesión
</Typography>

{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

<Box component="form" onSubmit={handleSubmit}>

<TextField
label="Email"
type="email"
fullWidth
required
value={email}
onChange={(e) => setEmail(e.target.value)}
margin="normal"
/>
<TextField
label="Contraseña"
type="password"
fullWidth
required
value={password}
onChange={(e) => setPassword(e.target.value)}
margin="normal"
/>
<Button
type="submit"
variant="contained"
fullWidth
size="large"
disabled={loading}
sx={{ mt: 3 }}
>
{loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
</Button>
</Box>

<Typography textAlign="center" sx={{ mt: 2 }}>
¿No tienes cuenta? <Link href="/register">Regístrate</Link>
</Typography>
</CardContent>
</Card>
</Container>
);
}
Login funcional

SECCIÓN 4.3: Página de Registro
Crear: app/register/page.js
'use client';

import { useState } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
const [formData, setFormData] = useState({
full_name: '',
email: '',
password: '',
password_confirm: ''
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const { register } = useAuth();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

if (formData.password !== formData.password_confirm) {
setError('Las contraseñas no coinciden');
return;
}

setLoading(true);
const result = await register(formData);

if (!result.success) {
setError(result.error?.email?.[0] || 'Error al registrarse');
}
setLoading(false);
};

return (
<Container maxWidth="sm" sx={{ mt: 8 }}>
<Card>
<CardContent sx={{ p: 4 }}>
<Typography variant="h4" gutterBottom textAlign="center">
Registrarse
</Typography>

{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

<Box component="form" onSubmit={handleSubmit}>
<TextField
label="Nombre Completo"
fullWidth
required
value={formData.full_name}
onChange={(e) => setFormData({...formData, full_name: e.target.value})}
margin="normal"
/>
<TextField
label="Email"
type="email"
fullWidth
required
value={formData.email}
onChange={(e) => setFormData({...formData, email: e.target.value})}
margin="normal"
/>
<TextField
label="Contraseña"
type="password"
fullWidth
required
value={formData.password}
onChange={(e) => setFormData({...formData, password: e.target.value})}
margin="normal"
/>
<TextField
label="Confirmar Contraseña"
type="password"
fullWidth
required
value={formData.password_confirm}
onChange={(e) => setFormData({...formData, password_confirm: e.target.value})}
margin="normal"
/>
<Button
type="submit"
variant="contained"
fullWidth
size="large"
disabled={loading}

sx={{ mt: 3 }}
>
{loading ? <CircularProgress size={24} /> : 'Registrarse'}
</Button>
</Box>

<Typography textAlign="center" sx={{ mt: 2 }}>
¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
</Typography>
</CardContent>
</Card>
</Container>
);
}
Registro funcional

CHECKPOINT FASE 4
• Landing page
• Login con validación
• Register con validación
Actualizar tabla: Fase 4 COMPLETADO | Métrica: 57%

═══════════════════════════════════════════════════
FASE 5: PÁGINAS DE VOTACIÓN (CORE)
═══════════════════════════════════════════════════
OBJETIVO
Implementar lista de elecciones, votación, resultados e historial.
SECCIÓN 5.1: Lista de Elecciones
Crear: app/elections/page.js
'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getElections } from '@/services/electionService';

function ElectionsContent() {
const [elections, setElections] = useState([]);
const [loading, setLoading] = useState(true);
const router = useRouter();

useEffect(() => {

const fetchElections = async () => {
try {
const data = await getElections('active');
setElections(data);
} catch (error) {
console.error('Error:', error);
} finally {
setLoading(false);
}
};
fetchElections();
}, []);

if (loading) return <LoadingSpinner />;

return (
<Container maxWidth="lg" sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom>
Elecciones Activas
</Typography>

{elections.length === 0 ? (
<Typography color="text.secondary" sx={{ mt: 4 }}>
No hay elecciones activas en este momento
</Typography>
) : (
<Grid container spacing={3} sx={{ mt: 2 }}>
{elections.map((election) => (
<Grid item xs={12} md={6} key={election.id}>
<Card>
<CardContent>
<Typography variant="h6">{election.title}</Typography>
<Typography color="text.secondary" paragraph>
{election.description}
</Typography>
<Typography variant="body2">
Inicio: {new Date(election.start_date).toLocaleDateString()}
</Typography>
<Typography variant="body2">
Fin: {new Date(election.end_date).toLocaleDateString()}
</Typography>
</CardContent>
<CardActions>

<Button size="small" onClick={() => router.push(`/elections/${election.id}/vote`)}>
Votar
</Button>
<Button size="small" onClick={() => router.push(`/elections/${election.id}/results`)}>
Ver Resultados
</Button>
</CardActions>
</Card>
</Grid>
))}
</Grid>
)}
</Container>
);
}

export default function ElectionsPage() {
return (
<ProtectedRoute>
<ElectionsContent />
</ProtectedRoute>
);
}
Lista de elecciones

SECCIÓN 5.2: Página de Votación
Crear: app/elections/[id]/vote/page.js
'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button, Alert, Dialog, DialogTitle, DialogContent,
DialogActions, Avatar, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getElections } from '@/services/electionService';
import { hasVoted, castVote } from '@/services/voteService';
import api from '@/lib/axios';

function VoteContent({ params }) {
const [election, setElection] = useState(null);
const [candidates, setCandidates] = useState([]);
const [selectedCandidate, setSelectedCandidate] = useState('');
const [voted, setVoted] = useState(false);
const [loading, setLoading] = useState(true);

const [confirmDialog, setConfirmDialog] = useState(false);
const [error, setError] = useState('');
const router = useRouter();

useEffect(() => {
const fetchData = async () => {
try {
const electionData = await getElections();
const currentElection = electionData.find(e => e.id === params.id);
setElection(currentElection);

const candidatesRes = await api.get(`/candidates/?election=${params.id}`);
setCandidates(candidatesRes.data);

const votedData = await hasVoted(params.id);
setVoted(votedData.has_voted);
} catch (error) {
setError('Error al cargar datos');
} finally {
setLoading(false);
}
};
fetchData();
}, [params.id]);

const handleVote = async () => {
try {
await castVote(params.id, selectedCandidate);
setVoted(true);
setConfirmDialog(false);
} catch (error) {
setError(error.response?.data?.error || 'Error al votar');
setConfirmDialog(false);
}
};

if (loading) return <LoadingSpinner />;

if (voted) {
return (
<Container maxWidth="md" sx={{ mt: 4 }}>
<Alert severity="success">
Ya has votado en esta elección

</Alert>
<Button sx={{ mt: 2 }} onClick={() => router.push(`/elections/${params.id}/results`)}>
Ver Resultados
</Button>
</Container>
);
}

return (
<Container maxWidth="md" sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom>
{election?.title}
</Typography>
{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

<RadioGroup value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
{candidates.map((candidate) => (
<Box key={candidate.id} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mb: 2 }}>
<FormControlLabel
value={candidate.id}
control={<Radio />}
label={
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
<Avatar src={candidate.photo_url} alt={candidate.name} />
<Box>
<Typography variant="h6">{candidate.name}</Typography>
<Typography color="text.secondary">{candidate.description}</Typography>
</Box>
</Box>
}
/>
</Box>
))}
</RadioGroup>

<Button
variant="contained"
size="large"
disabled={!selectedCandidate}
onClick={() => setConfirmDialog(true)}
sx={{ mt: 3 }}
>
Confirmar Voto

</Button>

<Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
<DialogTitle>Confirmar Voto</DialogTitle>
<DialogContent>
¿Estás seguro de votar por {candidates.find(c => c.id === selectedCandidate)?.name}?
</DialogContent>
<DialogActions>
<Button onClick={() => setConfirmDialog(false)}>Cancelar</Button>
<Button onClick={handleVote} variant="contained">Confirmar</Button>
</DialogActions>
</Dialog>
</Container>
);
}

export default function VotePage({ params }) {
return (
<ProtectedRoute>
<VoteContent params={params} />
</ProtectedRoute>
);
}
Votación implementada

SECCIÓN 5.3: Resultados en Tiempo Real
Crear: app/elections/[id]/results/page.js
'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getResults } from '@/services/resultService';

export default function ResultsPage({ params }) {
const [results, setResults] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchResults = async () => {
const data = await getResults(params.id);
setResults(data);
setLoading(false);

};

fetchResults();
const interval = setInterval(fetchResults, 10000); // Poll cada 10s

return () => clearInterval(interval);
}, [params.id]);

if (loading) return <LoadingSpinner />;

return (
<Container maxWidth="lg" sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom>
Resultados: {results.election.title}
</Typography>
<Typography variant="h6" color="text.secondary" gutterBottom>
Total de votos: {results.total_votes}
</Typography>

<ResponsiveContainer width="100%" height={300}>
<BarChart data={results.results}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="candidate_name" />
<YAxis />
<Tooltip />
<Bar dataKey="votes" fill="#1976d2" />
</BarChart>
</ResponsiveContainer>

<Paper sx={{ mt: 4 }}>
<Table>
<TableHead>
<TableRow>
<TableCell>Candidato</TableCell>
<TableCell align="right">Votos</TableCell>
<TableCell align="right">Porcentaje</TableCell>
</TableRow>
</TableHead>
<TableBody>
{results.results.map((result) => (
<TableRow key={result.candidate_id}>
<TableCell>{result.candidate_name}</TableCell>
<TableCell align="right">{result.votes}</TableCell>

<TableCell align="right">{result.percentage}%</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</Paper>
</Container>
);
}
Resultados con polling

SECCIÓN 5.4: Historial
Crear: app/history/page.js
'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Chip } from
'@mui/material';
import { ExpandMore } from '@mui/icons-material';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getHistory } from '@/services/resultService';

export default function HistoryPage() {
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchHistory = async () => {
const data = await getHistory();
setHistory(data);
setLoading(false);
};
fetchHistory();
}, []);

if (loading) return <LoadingSpinner />;

return (
<Container maxWidth="lg" sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom>
Historial de Elecciones
</Typography>

{history.length === 0 ? (
<Typography color="text.secondary">No hay elecciones finalizadas</Typography>

) : (
history.map((item) => (
<Accordion key={item.election.id}>
<AccordionSummary expandIcon={<ExpandMore />}>
<Typography variant="h6">{item.election.title}</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography gutterBottom>Total de votos: {item.total_votes}</Typography>
<Typography gutterBottom>
Ganador: <Chip label={item.winner} color="success" />
</Typography>
<List>
{item.results.map((result, idx) => (
<ListItem key={idx}>
<ListItemText
primary={result.candidate_name}
secondary={`${result.votes} votos (${result.percentage}%)`}
/>
</ListItem>
))}
</List>
</AccordionDetails>
</Accordion>
))
)}
</Container>
);
}
Historial completo

CHECKPOINT FASE 5
• Lista de elecciones
• Página de votación funcional
• Resultados en tiempo real
• Historial implementado
Actualizar tabla: Fase 5 COMPLETADO | Métrica: 71%

═══════════════════════════════════════════════════
FASE 6: OPTIMIZACIONES Y REFINAMIENTO
═══════════════════════════════════════════════════
SECCIÓN 6.1: Validar Responsividad
# Abrir DevTools (F12)
# Activar vista de dispositivos móviles

# Probar cada página en: iPhone SE, iPad, Desktop
Responsive validado

SECCIÓN 6.2: Limpiar Consola
# Buscar y eliminar console.log innecesarios
grep -r "console.log" app/ components/ services/
Consola limpia

CHECKPOINT FASE 6
Actualizar tabla: Fase 6 COMPLETADO | Métrica: 85%

═══════════════════════════════════════════════════
FASE 7: DEPLOYMENT Y DOCUMENTACIÓN
═══════════════════════════════════════════════════
SECCIÓN 7.1: Build Local
npm run build
# Debe completarse sin errores
Build exitoso

SECCIÓN 7.2: Crear README
Crear: README_FRONTEND.md
# Frontend - Sistema de Votaciones

## Stack
- Next.js 14 + React 18
- Material UI 5
- Axios
- Recharts

## Instalación
\`\`\`bash
npm install
cp .env.example .env.local
# Editar .env.local con URL del backend
npm run dev
\`\`\`

## URLs
- Desarrollo: http://localhost:3000
- Producción: [URL_VERCEL]

## Páginas
- `/` - Landing

- `/login` - Login
- `/register` - Registro
- `/elections` - Lista elecciones
- `/elections/[id]/vote` - Votación
- `/elections/[id]/results` - Resultados
- `/history` - Historial
README creado

SECCIÓN 7.3: Deploy Opcional en Vercel
# Si se requiere deploy:
# 1. Push a GitHub
# 2. Conectar repo en vercel.com
# 3. Configurar NEXT_PUBLIC_API_URL en Vercel
# 4. Deploy automático

CHECKPOINT FASE 7
Actualizar tabla: Fase 7 COMPLETADO | Métrica: 100%

VALIDACIÓN FINAL COMPLETA
CHECKLIST FUNCIONAL
# 1. Iniciar frontend
npm run dev

# 2. Iniciar backend (otra terminal)
cd ../backend
python manage.py runserver

# 3. Probar flujo:
- Landing carga
- Registro funciona
- Login funciona
- Ver elecciones (protegido)
- Votar funciona
- Prevención doble voto
- Resultados en tiempo real
- Historial muestra cerradas
- Logout funciona

ENTREGABLE FINAL
Al completar todas las fases:
BASE DE DATOS (Supabase) - 100%
BACKEND (Django+DRF+Railway) - 100%

FRONTEND (Next.js+MUI+Vercel) - 100%

═══════════════════════════════════════════════
PROYECTO 100% COMPLETO Y FUNCIONAL
═══════════════════════════════════════════════

Calificación esperada: 100/100

FIN DEL DOCUMENTO DE INSTRUCCIONES FRONTEND
