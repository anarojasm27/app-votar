# BACKEND - SISTEMA DE VOTACIONES

API REST completa desarrollada con Django y Django REST Framework para sistema de votaciones en línea.

## 🚀 Tecnologías

- **Framework:** Django 4.2.16 LTS
- **API:** Django REST Framework 3.14.0  
- **Base de Datos:** PostgreSQL (Supabase)
- **Autenticación:** JWT (djangorestframework-simplejwt)
- **CORS:** django-cors-headers

## 📦 Instalación Local

### Prerrequisitos

- Python 3.10+ 
- pip
- Virtualenv

### Pasos de Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/anarojasm27/app-votar.git
cd app-votar
```

2. **Crear entorno virtual**
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno**

Crear archivo `.env` en la raíz con:
```
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu_password_supabase
DB_HOST=tu_host_supabase  
DB_PORT=5432

SECRET_KEY=tu_secret_key_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOW_ALL_ORIGINS=True
```

5. **Ejecutar servidor de desarrollo**
```bash
python manage.py runserver
```

Acceder a: http://127.0.0.1:8000/api/

## 📁 Estructura del Proyecto

```
app-votar/
├── config/              # Configuración Django
│   ├── settings.py      # Settings principales  
│   └── urls.py          # URLs raíz
├── voting/              # App principal
│   ├── models.py        # 5 modelos (User, Election, Candidate, VoteRegistry, Vote)
│   ├── serializers.py   # 8 serializers DRF  
│   ├── views.py         # 10 vistas/endpoints
│   ├── urls.py          # URLs de la app
│   ├── admin.py         # Django Admin
│   └── tests.py         # Tests automatizados
├── manage.py
├── requirements.txt
└── .env                 # Variables de entorno (NO versionar)
```

## 🔗 Endpoints de la API

**Base URL:** `http://127.0.0.1:8000/api/`

### Autenticación

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/register/` | No | Registrar nuevo usuario |
| POST | `/login/` | No | Iniciar sesión |
| GET | `/profile/` | Sí | Obtener perfil de usuario autenticado |
| POST | `/token/refresh/` | No | Refrescar access token |

### Elecciones y Candidatos

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/elections/` | No | Listar todas las elecciones |
| GET | `/elections/{id}/` | No | Detalle de una elección |  
| GET | `/candidates/` | No | Listar todos los candidatos |
| GET | `/candidates/{id}/` | No | Detalle de un candidato |

### Votación

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/vote/` | Sí | Emitir un voto |
| GET | `/has-voted/{election_id}/` | Sí | Verificar si ya votó |
| GET | `/results/{election_id}/` | No | Resultados de elección |
| GET | `/history/` | No | Historial de elecciones cerradas |

## 🔑 Autenticación JWT

El sistema utiliza JWT (JSON Web Tokens) para autenticación:

1. **Obtener tokens:** Hacer login o registro
2. **Usar access token:** Incluir en header de peticiones protegidas
   ```
   Authorization: Bearer {access_token}
   ```
3. **Refrescar token:** Cuando access token expire (60 min)

**Tokens:**
- Access Token: Válido por 60 minutos
- Refresh Token: Válido por 7 días

## 🗃️ Modelos de Datos

### User
Usuarios del sistema (votantes y administradores)

### Election  
Procesos de votación con estados (draft/active/closed)

### Candidate
Opciones de voto en cada elección

### Vote
Votos emitidos de forma **ANÓNIMA** (sin user_id)

### VoteRegistry
Control de votación (prevención de doble voto)

## ✅ Testing

```bash
# Ejecutar todos los tests
python manage.py test

# Tests específicos
python manage.py test voting.tests.AuthenticationTests
python manage.py test voting.tests.VotingTests
```

**Tests incluidos:**
- Registro de usuarios
- Login con credenciales válidas/inválidas  
- Autenticación JWT
- Emisión de voto
- Prevención de doble voto
- Cálculo de resultados

## 🎯 Características Principales

✅ API REST completa y documentada  
✅ Autenticación JWT segura  
✅ **Anonimato garantizado** (arquitectura de 2 tablas)  
✅ Prevención de doble voto (constraint único)  
✅ Validaciones temporales (periodo de votación)  
✅ Resultados en tiempo real  
✅ Django Admin con acciones personalizadas  
✅ Tests automatizados  

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Tokens JWT con expiración
- Anonimato de votos garantizado a nivel de base de datos
- CORS configurado
- Validaciones completas en endpoints

## 👥 Contribuir

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de un proyecto académico.

## 👤 Autor

**Ana Rojas**
- GitHub: [@anarojasm27](https://github.com/anarojasm27)

---
⭐ **Backend 100% Completo y Funcional** ⭐
