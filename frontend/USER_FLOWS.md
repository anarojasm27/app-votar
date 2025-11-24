# 🎯 FLUJO DE USO COMPLETO - SISTEMA DE VOTACIONES

**Para Testers y Usuarios Finales**

---

## 👥 PERSONAJES DE PRUEBA

### Persona 1: María - Nueva Votante
- **Rol:** Votante primeriza
- **Objetivo:** Registrarse, votar por primera vez, ver resultados
- **Email:** maria.votante@test.com

### Persona 2: Carlos - Votante Recurrente
- **Rol:** Usuario con cuenta existente
- **Objetivo:** Login, revisar elecciones, votar
- **Email:** carlos@test.com

### Persona 3: Admin - Administrador
- **Rol:** Verificar integridad del sistema
- **Objetivo:** Revisar resultados, validar prevención de fraude

---

## 🌟 FLUJO 1: PRIMERA EXPERIENCIA (María)

### Escena: María descubre la plataforma

**Paso 1: Llegada al sitio**
1. Abrir navegador
2. Ir a: `https://tu-app.vercel.app`
3. **Observar:**
   - Hero section atractivo con título grande
   - 4 tarjetas destacando: Seguro, Tiempo Real, Fácil, Confiable
   - Call-to-action claro: "Registrarse Ahora"

**Paso 2: Explorar información**
1. Leer las características del sistema
2. Ver íconos y diseño profesional
3. Notar el gradient azul corporativo (#1e3c72)

**Paso 3: Decidir registrarse**
1. Click en **"Registrarse"** (Navbar o botón principal)
2. Llenar formulario:
   - Nombre: `María Rodríguez`
   - Email: `maria.votante@test.com`
   - Contraseña: `Secure123`
   - Confirmar: `Secure123`
3. Click **"Registrarse"**

**¿Qué pasa?**
- ✅ Registro instantáneo (< 2s)
- ✅ Redirige automáticamente a `/elections`
- ✅ Navbar ahora muestra: `👤 María Rodríguez` y botón "Salir"
- ✅ María está logueada y lista para votar

**Paso 4: Ver elecciones disponibles**
María ve una lista de cards:
- Título de la elección
- Descripción breve
- Fechas de inicio y fin
- Chip verde "ACTIVA"
- 2 botones: "Votar Ahora" y "Ver Resultados"

**Paso 5: Leer información de candidatos**
1. Click en **"Votar Ahora"** en su elección de interés
2. Ve cards de todos los candidatos:
   - Foto/Avatar
   - Nombre del candidato
   - Partido/Grupo (si tiene)
   - Descripción breve
   - Botón "Votar por este candidato"

**Paso 6: Tomar decisión y votar**
1. María lee sobre cada candidato
2. Selecciona su favorito, ej: "Ana Gómez"
3. Click en **"Votar por este candidato"**
4. Aparece dialog de confirmación:
   - Icono de check verde grande
   - "¿Estás seguro que deseas votar por: **Ana Gómez**?"
   - Alert amarillo: "Esta acción no se puede deshacer"
   - Botones: "Cancelar" y "Confirmar Voto"

**Paso 7: Confirmar voto**
1. Click en **"Confirmar Voto"**
2. Botón cambia a "Registrando..." (2 segundos)
3. Aparece alert verde: "¡Voto registrado exitosamente!"
4. Auto-redirect a página de resultados

**Paso 8: Ver impacto de su voto**
En `/results`:
- Gráfica de barras muestra votos por candidato
- Gráfica de torta muestra distribución %
- Tabla con rankings (🏆🥈🥉 para top 3)
- Ana Gómez ahora tiene +1 voto
- Total de votos aumentó

**Paso 9: Explorar historial**
1. Click en "Historial" en Navbar
2. Ve elecciones pasadas con winners
3. Puede expandir accordions para ver detalles

**Paso 10: Cerrar sesión**
1. Click en "Salir"
2. Vuelve a landing page
3. Navbar vuelve a mostrar "Login/Registro"

**⏱️ Tiempo total del flujo:** 5-8 minutos

---

## 🔄 FLUJO 2: USUARIO RECURRENTE (Carlos)

### Escena: Carlos ya tiene cuenta y quiere votar rápido

**Paso 1: Login directo**
1. Abrir `https://tu-app.vercel.app`
2. Click en **"Iniciar Sesión"**
3. Ingresar:
   - Email: `carlos@test.com`
   - Password: `carlos123`
4. Click **"Iniciar Sesión"**
5. **Resultado:** Login en < 2s, redirect a `/elections`

**Paso 2: Elección rápida**
1. Carlos ya sabe por quién votar
2. Hace scroll rápido por las elecciones
3. Encuentra "Elección Estudiantil 2024"
4. Click directo en **"Votar Ahora"**

**Paso 3: Voto express**
1. Ve los candidatos
2. Ya decidió: "Pedro Martínez"
3. Click **"Votar por este candidato"**
4. En dialog, hace click inmediato en **"Confirmar Voto"**
5. Ve resultados al instante

**Paso 4: Revisar resultados en tiempo real**
1. Carlos se queda mirando la página de resultados
2. Mientras tanto, otros usuarios votan
3. Cada 10 segundos, los números se actualizan automáticamente
4. Ve "Última actualización: 15:32:45" cambiando
5. Las gráficas se Re-renderizan con nuevos datos

**Paso 5: Intentar votar de nuevo (FRAUDE)**
1. Carlos vuelve a `/elections`
2. Intenta votar en la misma elección otra vez
3. **Resultado:**
   - Alert azul: "Ya has votado en esta elección"
   - Todos los botones "Ya Votaste" (deshabilitados)
   - No puede hacer click en ningún candidato
   - ✅ Sistema previene doble voto exitosamente

**⏱️ Tiempo total del flujo:** 2-3 minutos

---

## 🔍 FLUJO 3: VERIFICACIÓN DE INTEGRIDAD (Admin)

### Escena: Admin revisa que todo funcione correctamente

**Paso 1: Login como admin**
- Email: `admin@test.com`
- Password: `admin123`

**Paso 2: Audit de resultados**
1. Ir a `/results` de cada elección
2. Verificar que:
   - ✅ Suma de votos individuales = Total votos
   - ✅ Suma de porcentajes = 100%
   - ✅ Orden de candidatos es correcto (desc)
   - ✅ Ganador tiene más votos que todos

**Paso 3: Validar polling**
1. Dejar página abierta
2. Desde otro dispositivo/usuario, votar
3. En < 10s, números se actualizan sin recargar página

**Paso 4: Revisar historial**
1. Ir a `/history`
2. Confirmar que solo elecciones "CERRADAS" aparecen
3. Verificar que ganador es correcto

**Paso 5: Test de seguridad**
1. Abrir DevTools (F12)
2. Ir a Application → Local Storage
3. Verificar que existan:
   - `access_token`
   - `refresh_token`
4. Check Network tab:
   - Request a `/profile/` incluye header: `Authorization: Bearer ...`
   - Todos los requests protegidos tienen JWT

**⏱️ Tiempo total del flujo:** 10-15 minutos

---

## 🎬 FLUJO 4: EXPERIENCIA MOBILE

### Escena: Usuario en teléfono móvil

**Dispositivo:** iPhone 14 / Samsung Galaxy S23

**Paso 1: Responsive landing**
1. Abrir en mobile browser
2. **Observar:**
   - Hero text ajustado al ancho
   - Feature cards en columna (no grid)
   - Botones full-width
   - Navbar compacto

**Paso 2: Formularios touch-friendly**
1. Tap en "Registrarse"
2. Inputs grandes, fáciles de tocar
3. Teclado móvil se abre automáticamente
4. Botones con buen spacing (min 44x44px)

**Paso 3: Cards de candidatos**
1. En vote page, cards se apilan verticalmente
2. Avatares visibles y grandes
3. Botones full-width para tap fácil

**Paso 4: Gráficas responsive**
1. En results, gráficas se ajustan al ancho
2. Bar chart legible
3. Pie chart con labels cortos
4. Tabla scrollable horizontalmente si es necesario

---

## ⚡ FLUJO 5: VOTACIÓN MASIVA SIMULTÁNEA

### Escena: Múltiples usuarios votando al mismo tiempo

**Setup:**
- 5 usuarios diferentes
- Misma elección
- Votando en ventana de 30 segundos

**Procedimiento:**
1. Usuario A vota por Candidato 1 (t=0s)
2. Usuario B vota por Candidato 2 (t=5s)
3. Usuario C vota por Candidato 1 (t=10s)
4. Usuario D vota por Candidato 3 (t=15s)
5. Usuario E vota por Candidato 1 (t=20s)

**Validaciones:**
- ✅ Todos los votos se registran
- ✅ No hay race conditions
- ✅ Resultados finales correctos:
  - Candidato 1: 3 votos
  - Candidato 2: 1 voto
  - Candidato 3: 1 voto
  - Total: 5 votos
- ✅ Auto-polling actualiza para todos en < 30s

---

## 🚫 FLUJO 6: ESCENARIOS DE ERROR

### Error 1: Votación fuera de periodo
**Setup:** Elección con `end_date` en el pasado

**Flujo:**
1. Login
2. Ir a `/elections/[id]/vote` de elección cerrada
3. Intentar votar
4. **Resultado:** Error 400: "La votación ya finalizó"

### Error 2: Token expirado
**Setup:** Dejar sesión abierta > 60 minutos

**Flujo:**
1. Usuario logueado hace 70 minutos
2. Intentar votar
3. **Resultado:** Error 401, redirect a `/login`
4. Usuario hace login nuevamente
5. Puede continuar votando

### Error 3: Backend offline
**Setup:** Detener servidor Django

**Flujo:**
1. Intentar login
2. **Resultado:** Error de conexión en consola
3. Frontend muestra mensaje de error claro
4. No hay crash de la app

---

## 📊 MÉTRICAS CLAVE A OBSERVAR

### Rendimiento
- Landing page carga < 1.5s
- Login/Register < 1s de respuesta
- Vote submission < 2s
- Results initial load < 3s
- Auto-update silent < 1s

### UX
- 0 clicks innecesarios
- Feedback inmediato en cada acción
- Loading states visibles
- Mensajes de error claros
- Confirmaciones antes de acciones irreversibles

### Seguridad
- Passwords nunca visibles
- JWT en localStorage (no cookies por CORS)
- No hay doble voto posible
- Tokens expiran correctamente
- Backend valida todo

---

## ✅ CHECKLIST DE SATISFACCIÓN DEL USUARIO

Después de usar la app, el usuario debe poder decir:

- [ ] "Entendí inmediatamente cómo usar la app"
- [ ] "El proceso de votación fue rápido y simple"
- [ ] "Me sentí seguro de que mi voto fue registrado"
- [ ] "Los resultados son claros y fáciles de entender"
- [ ] "El diseño se ve profesional y moderno"
- [ ] "No tuve errores ni confusiones"
- [ ] "Confío en la integridad del sistema"
- [ ] "Volvería a usar esta plataforma"

---

## 🎯 CONCLUSIÓN

El **Sistema de Votaciones** está diseñado para ser:
- **Intuitivo:** Cualquiera puede votar en < 5 minutos
- **Seguro:** Prevención de fraude a nivel de BD
- **Transparente:** Resultados en tiempo real
- **Profesional:** Diseño empresarial de alta calidad
- **Confiable:** Sin errores, sin crashes, sin confusiones

**Status:** ✅ **LISTO PARA PRODUCCIÓN**

---

**Responsable:** Ana Rojas  
**Ambiente:** Vercel + Railway  
**Fecha:** 2025-01-24
