DESARROLLO BACKEND - SISTEMA DE VOTACIONES
DATOS INICIALES REQUERIDOS
ANTES DE INICIAR EL DESARROLLO, COMPLETAR LA SIGUIENTE INFORMACIÓN:
# COPIAR ESTOS DATOS AL INICIO DEL CHAT CON EL AGENTE IA

DATOS_PROYECTO:
nombre_proyecto: "app-votar"
directorio_trabajo: "C:\app-votar"
sistema_operativo: "Windows"
python_version: Python 3.14.0

CREDENCIALES_SUPABASE:
host: "aws-0-us-west-2.pooler.snyderuderudxskpwgiict.supabase.co"
database: "postgres"
user: "postgres"
password: "BASEamrm27*"
port: "5432"

REPOSITORIO_GIT:
usar_github: Sí
url_repo: https://github.com/anarojasm27/app-votar.git

INSTRUCCIONES PRINCIPALES:

1. **Seguir documento:** DESARROLLO_BACKEND_INSTRUCCIONES.md está en la raíz del proyecto con todos los pasos
detallados en 8 FASES secuenciales.

2. **Desarrollo sistemático:**
- Ejecutar TODAS las fases en orden: Fase 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
- NO avanzar a siguiente fase hasta validar 100% la actual
- Actualizar tabla de control después de cada fase

3. **Validación constante:**
- Ejecutar `python manage.py check` después de cada cambio significativo
- Ejecutar tests cuando se indique
- Validar endpoints con curl cuando se especifique

4. **Gestión de progreso:**
- Actualizar la tabla de CONTROL DE AVANCES en el documento
- Documentar cualquier decisión tomada
- Si hay error, detener e informar claramente

5. **Archivos a crear:**
- Seguir estructura exacta del documento
- Copiar código textualmente donde se proporciona
- Modificar archivos según instrucciones precisas

6. **NO hacer:**
- No modificar archivos no mencionados
- No cambiar nombres de variables/funciones especificadas
- No saltarse pasos de validación
- No crear archivos adicionales no solicitados

7. **Credenciales:**
- Usar credenciales de credenciales.md para .env
- NO hardcodear contraseñas en código
- Usar .env.example como plantilla

8. **Git:**
- Hacer commits según se indica en las fases
- NO commitear archivos .env
- Verificar .gitignore está correcto

9. **Si te interrumpes:**
- Documentar exactamente en qué SECCIÓN de qué FASE quedaste
- Actualizar tabla de control
- Dejar nota en DESARROLLO_BACKEND_INSTRUCCIONES.md

10. **Objetivo final:**
- Backend 100% funcional
- Todos los tests pasando
- Documentación completa
- Sin deuda técnica
- Listo para conectar con frontend

AMBIENTE_DESARROLLO:
puerto_backend: "8000"
debug_mode: "True"
CONTROL DE AVANCES
EL AGENTE DEBE ACTUALIZAR ESTA TABLA DESPUÉS DE CADA FASE COMPLETADA:
Fase Nombre Estado Checkpoint Validación Timestamp
1 Setup y Configuración PENDIENTE - - -
2 Modelos y Conexión BD PENDIENTE - - -
3 Serializers y Auth PENDIENTE - - -
4 Endpoints Core PENDIENTE - - -
5 Lógica de Votación PENDIENTE - - -
6 Admin y Gestión PENDIENTE - - -
7 Testing y Validación PENDIENTE - - -
8 Documentación Final PENDIENTE - - -
Estados posibles: PENDIENTE | EN PROGRESO | COMPLETADO | ERROR

Métrica de Completitud Global: 0% → Actualizar después de cada fase
ARQUITECTURA DEL BACKEND
Stack Tecnológico
• Framework: Django 4.2 LTS
• API: Django REST Framework (DRF)
• Base de Datos: PostgreSQL (Supabase)
• Autenticación: JWT (djangorestframework-simplejwt)
• CORS: django-cors-headers
Estructura de Directorios Final
app-votar/
├── venv/ # Entorno virtual (no versionar)
├── config/ # Configuración Django
│ ├── __init__.py
│ ├── settings.py # Configuración principal
│ ├── urls.py # URLs raíz
│ └── wsgi.py
├── voting/ # App principal
│ ├── migrations/
│ ├── __init__.py
│ ├── models.py # Modelos (tablas Supabase)
│ ├── serializers.py # Serializers DRF
│ ├── views.py # Vistas/Endpoints
│ ├── urls.py # URLs de la app
│ ├── admin.py # Configuración admin
│ └── tests.py # Tests automatizados
├── manage.py
├── .env # Variables de entorno (NO versionar)
├── .env.example # Plantilla de .env
├── .gitignore
├── requirements.txt
└── README_BACKEND.md

FASE 1: SETUP Y CONFIGURACIÓN INICIAL
OBJETIVO DE FASE 1
Configurar entorno de desarrollo completo, instalar dependencias, crear estructura del proyecto Django y conectar con
Supabase.
SECCIÓN 1.1: Verificación de Prerrequisitos
ACCIÓN:
# Verificar Python
python --version
# Debe retornar: Python 3.10.x o superior

# Verificar pip
pip --version

# Verificar Git
git --version
VALIDACIÓN:
• Python 3.10+ instalado
• pip funcional
• Git instalado
• Si alguna verificación falla: Detener y reportar error específico.
SECCIÓN 1.2: Creación de Entorno Virtual
ACCIÓN:
# Navegar a directorio del proyecto
cd [DIRECTORIO_PROYECTO_DE_DATOS_INICIALES]

# Crear entorno virtual
python -m venv venv

# IMPORTANTE: Activar según SO
# Windows:
venv\Scripts\activate

# Linux/macOS:
source venv/bin/activate

# Verificar activación (debe aparecer (venv) en prompt)
# Actualizar pip
pip install --upgrade pip
VALIDACIÓN:
# Debe mostrar ruta dentro de venv/
which python # Linux/macOS
where python # Windows
• Entorno virtual creado
• Entorno virtual activado
• pip actualizado
SECCIÓN 1.3: Instalación de Dependencias Base
ACCIÓN:
# INSTALAR EN ESTE ORDEN EXACTO:

pip install django==4.2.16
pip install djangorestframework==3.14.0
pip install psycopg2-binary==2.9.9
pip install python-decouple==3.8
pip install django-cors-headers==4.3.1
pip install djangorestframework-simplejwt==5.3.1

# Generar requirements.txt
pip freeze > requirements.txt
VALIDACIÓN:
# Verificar instalaciones
pip list | grep -E "Django|djangorestframework|psycopg2|decouple|cors|simplejwt"
Archivo requirements.txt debe contener:
asgiref==3.7.2
Django==4.2.16
django-cors-headers==4.3.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
psycopg2-binary==2.9.9
python-decouple==3.8
PyJWT==2.8.0
pytz==2024.1
sqlparse==0.4.4
• Todas las dependencias instaladas
• requirements.txt generado
SECCIÓN 1.4: Creación del Proyecto Django
ACCIÓN:
# Crear proyecto Django (punto al final es importante)
django-admin startproject config .

# Verificar estructura creada
ls -la
# Debe mostrar: config/ manage.py
ESTRUCTURA GENERADA:
config/
├── __init__.py
├── asgi.py
├── settings.py
├── urls.py
└── wsgi.py
manage.py
VALIDACIÓN:
# Probar que Django funciona
python manage.py runserver

# Abrir navegador en http://127.0.0.1:8000/
# Debe mostrar cohete de Django "The install worked successfully!"
# Detener servidor: Ctrl+C
• Proyecto config/ creado

• manage.py existe
• Servidor de prueba funciona
SECCIÓN 1.5: Creación de App Voting
ACCIÓN:
# Crear app voting
python manage.py startapp voting

# Verificar estructura
ls voting/
# Debe mostrar: __init__.py, admin.py, apps.py, models.py, tests.py, views.py, migrations/
REGISTRAR APP EN SETTINGS:
Archivo: config/settings.py
BUSCAR la sección INSTALLED_APPS y MODIFICAR:
INSTALLED_APPS = [
'django.contrib.admin',
'django.contrib.auth',
'django.contrib.contenttypes',
'django.contrib.sessions',
'django.contrib.messages',
'django.contrib.staticfiles',

# Apps de terceros
'rest_framework',
'corsheaders',

# Apps del proyecto
'voting',
]
VALIDACIÓN:
# Verificar que no hay errores de sintaxis
python manage.py check
# Debe retornar: System check identified no issues (0 silenced).
• App voting creada
• App registrada en INSTALLED_APPS
• Check sin errores
SECCIÓN 1.6: Configuración de .gitignore
ACCIÓN:
Crear archivo: .gitignore
CONTENIDO COMPLETO:
# Python
*.py[cod]
*$py.class
*.so
.Python

build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Django
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal
/media
/staticfiles

# Entorno virtual
venv/
env/
ENV/

# Variables de entorno
.env

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Pytest
.pytest_cache/
.coverage
htmlcov/
VALIDACIÓN:
• Archivo .gitignore creado
• venv/ y .env incluidos
SECCIÓN 1.7: Configuración de Variables de Entorno
ACCIÓN 1: Generar SECRET_KEY de Django
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
# Copiar el output generado
ACCIÓN 2: Crear archivo .env
Archivo: .env
CONTENIDO (Reemplazar con datos reales de credenciales.md):
# Database (Supabase)
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=[COPIAR_DE_CREDENCIALES.MD]
DB_HOST=[COPIAR_DE_CREDENCIALES.MD]
DB_PORT=5432

# Django
SECRET_KEY=[PEGAR_SECRET_KEY_GENERADA]
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS (desarrollo)
CORS_ALLOW_ALL_ORIGINS=True
ACCIÓN 3: Crear archivo .env.example
Archivo: .env.example
CONTENIDO:
# Database (Supabase)
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_HOST=your_supabase_host
DB_PORT=5432

# Django
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ALLOW_ALL_ORIGINS=True

VALIDACIÓN:
• .env creado con credenciales reales
• .env.example creado (sin credenciales reales)
• SECRET_KEY única generada
SECCIÓN 1.8: Configuración de Django Settings
ACCIÓN:
Archivo: config/settings.py
AL INICIO DEL ARCHIVO (después de from pathlib import Path):
from pathlib import Path
from decouple import config # AGREGAR ESTA LÍNEA
from datetime import timedelta # AGREGAR ESTA LÍNEA
REEMPLAZAR la línea de SECRET_KEY:
# CAMBIAR ESTO:
# SECRET_KEY = 'django-insecure-...'

# POR ESTO:
SECRET_KEY = config('SECRET_KEY')
REEMPLAZAR la línea de DEBUG:
# CAMBIAR:
# DEBUG = True

# POR:
DEBUG = config('DEBUG', default=False, cast=bool)
REEMPLAZAR la línea de ALLOWED_HOSTS:
# CAMBIAR:
# ALLOWED_HOSTS = []

# POR:
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')
BUSCAR INSTALLED_APPS y MODIFICAR (si no se hizo en SECCIÓN 1.5):
INSTALLED_APPS = [
'django.contrib.admin',
'django.contrib.auth',
'django.contrib.contenttypes',
'django.contrib.sessions',
'django.contrib.messages',
'django.contrib.staticfiles',

# Third party apps
'rest_framework',
'rest_framework_simplejwt',
'corsheaders',

# Project apps

'voting',
]
BUSCAR MIDDLEWARE y AGREGAR CorsMiddleware AL INICIO:
MIDDLEWARE = [
'corsheaders.middleware.CorsMiddleware', # AGREGAR PRIMERO
'django.middleware.security.SecurityMiddleware',
'django.contrib.sessions.middleware.SessionMiddleware',
'django.middleware.common.CommonMiddleware',
'django.middleware.csrf.CsrfViewMiddleware',
'django.contrib.auth.middleware.AuthenticationMiddleware',
'django.contrib.messages.middleware.MessageMiddleware',
'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
BUSCAR DATABASES y REEMPLAZAR COMPLETAMENTE:
# DATABASES = {
# 'default': {
# 'ENGINE': 'django.db.backends.sqlite3',
# ...
# }
# }

# REEMPLAZAR POR:
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.postgresql',
'NAME': config('DB_NAME'),
'USER': config('DB_USER'),
'PASSWORD': config('DB_PASSWORD'),
'HOST': config('DB_HOST'),
'PORT': config('DB_PORT', default='5432'),
}
}
AL FINAL DEL ARCHIVO (después de STATIC_URL), AGREGAR:
# ============================================
# CONFIGURACIÓN DE DJANGO REST FRAMEWORK
# ============================================

REST_FRAMEWORK = {
'DEFAULT_AUTHENTICATION_CLASSES': [
'rest_framework_simplejwt.authentication.JWTAuthentication',
],
'DEFAULT_PERMISSION_CLASSES': [
'rest_framework.permissions.AllowAny',

],
'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
'PAGE_SIZE': 100,
}

# ============================================
# CONFIGURACIÓN DE JWT
# ============================================

SIMPLE_JWT = {
'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
'ROTATE_REFRESH_TOKENS': False,
'BLACKLIST_AFTER_ROTATION': False,
'UPDATE_LAST_LOGIN': True,
'ALGORITHM': 'HS256',
'AUTH_HEADER_TYPES': ('Bearer',),
}

# ============================================
# CONFIGURACIÓN DE CORS
# ============================================

CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS', default=True, cast=bool)

# Para producción, descomentar y configurar:
# CORS_ALLOWED_ORIGINS = [
# "http://localhost:3000",
# "https://tu-frontend.vercel.app",
# ]
VALIDACIÓN:
# Verificar que no hay errores de sintaxis
python manage.py check
# Debe retornar: System check identified no issues
• settings.py configurado con decouple
• DATABASES apunta a Supabase
• DRF y JWT configurados
• CORS configurado
• Check sin errores
SECCIÓN 1.9: Verificación de Conexión a Supabase
ACCIÓN:
# Intentar conectar a base de datos
python manage.py dbshell

Si conecta exitosamente, verás el prompt de PostgreSQL:
psql (15.x)
Type "help" for help.

postgres=>
DENTRO DEL SHELL de PostgreSQL, ejecutar:
-- Listar tablas
\dt

-- Debe mostrar las tablas creadas en PLAN A:
-- users
-- elections
-- candidates
-- vote_registry
-- votes

-- Salir del shell
\q
VALIDACIÓN ALTERNATIVA (si dbshell falla):
# Ejecutar migraciones de Django (creará tablas propias de Django)
python manage.py migrate

# Debe completarse sin errores y mostrar:
# Running migrations:
# Applying contenttypes.0001_initial... OK
# Applying auth.0001_initial... OK
# ... etc
VERIFICAR EN SUPABASE:
Ir a Supabase Dashboard → Table Editor
Deben aparecer tablas nuevas de Django: auth_user, django_session, django_migrations, etc.
• Conexión a Supabase exitosa
• Tablas de PLAN A visibles
• Migraciones de Django aplicadas
SECCIÓN 1.10: Inicialización de Git
ACCIÓN:
# Si no está inicializado
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial backend setup: Django + DRF + Supabase connection"

# Si se proporcionó URL de repo GitHub, configurar remote:
# git remote add origin [URL_REPO]
# git branch -M main
# git push -u origin main
VALIDACIÓN:
# Verificar estado
git status
# Debe mostrar: working tree clean

# Verificar que .env NO está trackeado
git ls-files | grep .env
# No debe retornar nada (solo .env.example debe estar trackeado)
• Git inicializado
• Commit inicial creado
• .env no versionado
CHECKPOINT FASE 1 COMPLETADO
ANTES DE CONTINUAR, VALIDAR:
• Entorno virtual activo
• Todas las dependencias instaladas
• Proyecto Django creado (config/)
• App voting creada y registrada
• .gitignore configurado
• Variables de entorno (.env) configuradas
• settings.py configurado para Supabase
• Conexión a Supabase validada
• Migraciones de Django aplicadas
• Git inicializado
ACTUALIZAR TABLA DE CONTROL DE AVANCES:
Fase 1: COMPLETADO | Checkpoint: All systems operational | Validación: Connection OK
Métrica: 12.5% completado (1/8 fases)

FASE 2: MODELOS DJANGO Y MAPEO DE TABLAS
OBJETIVO DE FASE 2
Crear modelos Django que mapeen exactamente las tablas existentes en Supabase, sin que Django las gestione
(managed=False), permitiendo usar el ORM de Django con el esquema de base de datos ya creado.
SECCIÓN 2.1: Definición del Modelo User
ACCIÓN:
Archivo: voting/models.py
REEMPLAZAR TODO EL CONTENIDO con:
import uuid
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# ============================================

# MODELO: USER
# Mapea tabla 'users' de Supabase
# ============================================

class User(models.Model):
"""
Modelo de usuario del sistema.
Mapea tabla 'users' existente en Supabase.

Roles:
- 'voter': Usuario votante (default)
- 'admin': Administrador del sistema
"""

ROLE_CHOICES = [
('voter', 'Votante'),
('admin', 'Administrador'),
]

id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
email = models.EmailField(unique=True, max_length=255)
password = models.CharField(max_length=255)
full_name = models.CharField(max_length=255)
role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='voter')
is_active = models.BooleanField(default=True)
created_at = models.DateTimeField(auto_now_add=True)

class Meta:
managed = False # Django NO gestiona esta tabla
db_table = 'users' # Nombre exacto de tabla en Supabase
ordering = ['-created_at']

def __str__(self):
return f"{self.email} ({self.role})"

def set_password(self, raw_password):
"""Hashea y guarda password"""
self.password = make_password(raw_password)

def check_password(self, raw_password):
"""Verifica password"""
return check_password(raw_password, self.password)

@property
def is_admin(self):
"""Verifica si usuario es administrador"""
return self.role == 'admin'
VALIDACIÓN:
# Verificar sintaxis
python manage.py check
# Debe retornar: System check identified no issues

# Probar modelo en shell
python manage.py shell
En el shell de Django:
from voting.models import User

# Contar usuarios (debe mostrar los creados en PLAN A)
User.objects.count()
# Debe retornar: 7 (1 admin + 6 voters)

# Listar usuarios
User.objects.all()

# Salir
exit()
• Modelo User definido
• Check sin errores
• Query de prueba exitosa
SECCIÓN 2.2: Definición del Modelo Election
ACCIÓN:
Archivo: voting/models.py
AGREGAR después del modelo User:
# ============================================
# MODELO: ELECTION
# Mapea tabla 'elections' de Supabase
# ============================================

class Election(models.Model):
"""
Modelo de elección/votación.

Estados:
- 'draft': En preparación, no se puede votar
- 'active': Votación abierta
- 'closed': Finalizada
"""

STATUS_CHOICES = [
('draft', 'Borrador'),
('active', 'Activa'),
('closed', 'Cerrada'),
]

id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
title = models.CharField(max_length=255)
description = models.TextField(blank=True, null=True)
start_date = models.DateTimeField()
end_date = models.DateTimeField()
status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
results_public = models.BooleanField(default=True)
created_at = models.DateTimeField(auto_now_add=True)

class Meta:
managed = False
db_table = 'elections'
ordering = ['-created_at']

def __str__(self):
return f"{self.title} ({self.status})"

@property
def is_active(self):
"""Verifica si elección está activa y dentro del periodo"""
from django.utils import timezone
now = timezone.now()
return (
self.status == 'active' and
self.start_date <= now <= self.end_date
)
VALIDACIÓN:
python manage.py shell
from voting.models import Election

# Contar elecciones
Election.objects.count()
# Debe retornar: 3

# Listar con estado
for e in Election.objects.all():

print(f"{e.title} - {e.status}")

# Filtrar activas
Election.objects.filter(status='active')

exit()
• Modelo Election definido
• Queries funcionan
SECCIÓN 2.3: Definición del Modelo Candidate
ACCIÓN:
Archivo: voting/models.py
AGREGAR después del modelo Election:
# ============================================
# MODELO: CANDIDATE
# Mapea tabla 'candidates' de Supabase
# ============================================

class Candidate(models.Model):
"""
Modelo de candidato.
Cada candidato pertenece a una elección específica.
"""

id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
election = models.ForeignKey(
Election,
on_delete=models.CASCADE,
related_name='candidates',
db_column='election_id'
)
name = models.CharField(max_length=255)
description = models.TextField(blank=True, null=True)
photo_url = models.URLField(max_length=500, blank=True, null=True)
party_group = models.CharField(max_length=255, blank=True, null=True)
display_order = models.IntegerField(default=0)
created_at = models.DateTimeField(auto_now_add=True)

class Meta:
managed = False
db_table = 'candidates'
ordering = ['display_order', 'name']

def __str__(self):
return f"{self.name} - {self.election.title}"

VALIDACIÓN:
python manage.py shell
from voting.models import Candidate, Election

# Contar candidatos
Candidate.objects.count()

# Obtener candidatos de elección activa
election = Election.objects.filter(status='active').first()
candidates = Candidate.objects.filter(election=election)
for c in candidates:
print(c.name)

# Verificar relación inversa
election.candidates.all()

exit()
• Modelo Candidate definido
• ForeignKey a Election funciona
• Relación inversa funciona
SECCIÓN 2.4: Definición del Modelo VoteRegistry
ACCIÓN:
Archivo: voting/models.py
AGREGAR después del modelo Candidate:
# ============================================
# MODELO: VOTE REGISTRY
# Mapea tabla 'vote_registry' de Supabase
# Control de votación (quién ya votó)
# ============================================

class VoteRegistry(models.Model):
"""
Registro de control de votación.
Registra QUÉ usuario votó en QUÉ elección.
NO registra por quién votó (anonimato).
"""

id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
user = models.ForeignKey(
User,
on_delete=models.CASCADE,
related_name='vote_registries',
db_column='user_id'
)

election = models.ForeignKey(
Election,
on_delete=models.CASCADE,
related_name='vote_registries',
db_column='election_id'
)
has_voted = models.BooleanField(default=False)
voted_at = models.DateTimeField(blank=True, null=True)

class Meta:
managed = False
db_table = 'vote_registry'
unique_together = [['user', 'election']] # Constraint único
ordering = ['-voted_at']

def __str__(self):
return f"{self.user.email} - {self.election.title} - Voted: {self.has_voted}"
VALIDACIÓN:
python manage.py shell
from voting.models import VoteRegistry

# Contar registros
VoteRegistry.objects.count()

# Ver registros
for vr in VoteRegistry.objects.all():
print(f"{vr.user.email} votó en '{vr.election.title}': {vr.has_voted}")

exit()
• Modelo VoteRegistry definido
• Unique constraint reconocido
SECCIÓN 2.5: Definición del Modelo Vote
ACCIÓN:
Archivo: voting/models.py
AGREGAR después del modelo VoteRegistry:
# ============================================
# MODELO: VOTE (ANÓNIMO)
# Mapea tabla 'votes' de Supabase
# Votos emitidos SIN identificación de usuario
# ============================================

class Vote(models.Model):
"""
Modelo de voto emitido.

CRÍTICO: NO contiene referencia a usuario (anonimato).
Solo registra que se votó por un candidato en una elección.
"""

id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
election = models.ForeignKey(
Election,
on_delete=models.CASCADE,
related_name='votes',
db_column='election_id'
)
candidate = models.ForeignKey(
Candidate,
on_delete=models.CASCADE,
related_name='votes',
db_column='candidate_id'
)
cast_at = models.DateTimeField(auto_now_add=True)

class Meta:
managed = False
db_table = 'votes'
ordering = ['-cast_at']

def __str__(self):
return f"Voto para {self.candidate.name} en {self.election.title}"
VALIDACIÓN FINAL DE TODOS LOS MODELOS:
python manage.py check

# Debe retornar: System check identified no issues
python manage.py shell
from voting.models import User, Election, Candidate, VoteRegistry, Vote

# Verificar que todos los modelos funcionan
print(f"Users: {User.objects.count()}")
print(f"Elections: {Election.objects.count()}")
print(f"Candidates: {Candidate.objects.count()}")
print(f"Vote Registries: {VoteRegistry.objects.count()}")
print(f"Votes: {Vote.objects.count()}")

# Verificar relaciones
election = Election.objects.filter(status='active').first()
print(f"\nElección activa: {election.title}")

print(f"Candidatos: {election.candidates.count()}")
print(f"Votos emitidos: {election.votes.count()}")

exit()
• Modelo Vote definido
• Todos los modelos funcionan
• Relaciones correctas
CHECKPOINT FASE 2 COMPLETADO
VALIDACIÓN INTEGRAL:
# 1. Check de Django
python manage.py check
# Output esperado: System check identified no issues (0 silenced).

# 2. Validar todos los modelos
python manage.py shell
from voting.models import *

# Verificar conteos
assert User.objects.count() >= 5, "Debe haber usuarios"
assert Election.objects.count() >= 3, "Debe haber elecciones"
assert Candidate.objects.count() >= 4, "Debe haber candidatos"

# Verificar relaciones
election = Election.objects.first()
assert hasattr(election, 'candidates'), "Relación candidates debe existir"
assert hasattr(election, 'votes'), "Relación votes debe existir"

print(" Todos los modelos validados correctamente")
exit()
CHECKLIST:
• 5 modelos definidos (User, Election, Candidate, VoteRegistry, Vote)
• Todos con managed=False
• Foreign Keys configuradas
• Queries de prueba exitosas
• Check sin errores
ACTUALIZAR TABLA DE CONTROL:
Fase 2: COMPLETADO | Checkpoint: Models mapped | Validación: ORM functional
Métrica: 25% completado (2/8 fases)

FASE 3: SERIALIZERS Y AUTENTICACIÓN JWT
OBJETIVO DE FASE 3
Crear serializers para convertir modelos a JSON, implementar sistema de autenticación JWT, y desarrollar endpoints de
registro, login y perfil de usuario.

SECCIÓN 3.1: Creación de Serializers Base
ACCIÓN:
Crear archivo: voting/serializers.py
CONTENIDO COMPLETO:
from rest_framework import serializers
from .models import User, Election, Candidate, VoteRegistry, Vote
from django.contrib.auth.hashers import make_password

# ============================================
# SERIALIZER: USER
# ============================================

class UserSerializer(serializers.ModelSerializer):
"""
Serializer para modelo User.
Excluye password por seguridad.
"""

class Meta:
model = User
fields = ['id', 'email', 'full_name', 'role', 'is_active', 'created_at']
read_only_fields = ['id', 'created_at']

# ============================================
# SERIALIZER: USER REGISTRATION
# ============================================

class RegisterSerializer(serializers.Serializer):
"""
Serializer para registro de nuevos usuarios.
Valida email único, passwords coincidentes, y hashea password.
"""

email = serializers.EmailField(required=True)
password = serializers.CharField(write_only=True, min_length=6, required=True)
password_confirm = serializers.CharField(write_only=True, min_length=6, required=True)
full_name = serializers.CharField(required=True, max_length=255)

def validate_email(self, value):
"""Validar que email no exista"""
if User.objects.filter(email=value).exists():
raise serializers.ValidationError("Este email ya está registrado")
return value.lower()

def validate(self, data):
"""Validar que passwords coincidan"""
if data['password'] != data['password_confirm']:
raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden"})
return data

def create(self, validated_data):
"""Crear usuario con password hasheado"""
validated_data.pop('password_confirm')

user = User.objects.create(
email=validated_data['email'],
full_name=validated_data['full_name'],
password=make_password(validated_data['password']),
role='voter', # Por defecto es votante
is_active=True
)
return user

# ============================================
# SERIALIZER: LOGIN
# ============================================

class LoginSerializer(serializers.Serializer):
"""
Serializer para login de usuarios.
"""

email = serializers.EmailField(required=True)
password = serializers.CharField(write_only=True, required=True)

# ============================================
# SERIALIZER: ELECTION
# ============================================

class ElectionSerializer(serializers.ModelSerializer):
"""
Serializer para modelo Election.
"""

is_active = serializers.ReadOnlyField() # Property del modelo

class Meta:
model = Election
fields = [
'id', 'title', 'description', 'start_date', 'end_date',
'status', 'results_public', 'is_active', 'created_at'
]
read_only_fields = ['id', 'created_at']

# ============================================
# SERIALIZER: CANDIDATE
# ============================================

class CandidateSerializer(serializers.ModelSerializer):
"""
Serializer para modelo Candidate.
"""

election_title = serializers.CharField(source='election.title', read_only=True)

class Meta:
model = Candidate
fields = [
'id', 'election', 'election_title', 'name', 'description',
'photo_url', 'party_group', 'display_order', 'created_at'
]
read_only_fields = ['id', 'created_at']

# ============================================
# SERIALIZER: VOTE REGISTRY
# ============================================

class VoteRegistrySerializer(serializers.ModelSerializer):
"""
Serializer para modelo VoteRegistry.
"""

class Meta:
model = VoteRegistry
fields = ['id', 'user', 'election', 'has_voted', 'voted_at']

read_only_fields = ['id', 'voted_at']

# ============================================
# SERIALIZER: VOTE
# ============================================

class VoteSerializer(serializers.ModelSerializer):
"""
Serializer para modelo Vote.
NOTA: NO incluye user_id (anonimato).
"""

class Meta:
model = Vote
fields = ['id', 'election', 'candidate', 'cast_at']
read_only_fields = ['id', 'cast_at']

# ============================================
# SERIALIZER: CAST VOTE (Para emitir voto)
# ============================================

class CastVoteSerializer(serializers.Serializer):
"""
Serializer para emitir un voto.
Valida election_id y candidate_id.
"""

election_id = serializers.UUIDField(required=True)
candidate_id = serializers.UUIDField(required=True)

def validate(self, data):
"""Validar que elección y candidato existan"""
try:
election = Election.objects.get(id=data['election_id'])
except Election.DoesNotExist:
raise serializers.ValidationError({"election_id": "Elección no encontrada"})

try:
candidate = Candidate.objects.get(id=data['candidate_id'])
except Candidate.DoesNotExist:
raise serializers.ValidationError({"candidate_id": "Candidato no encontrado"})

# Validar que candidato pertenezca a la elección
if candidate.election != election:
raise serializers.ValidationError({"candidate_id": "El candidato no pertenece a esta elección"})

data['election'] = election
data['candidate'] = candidate
return data
VALIDACIÓN:
python manage.py check
# Debe retornar: System check identified no issues
• Archivo serializers.py creado
• Todos los serializers definidos
• Check sin errores
SECCIÓN 3.2: Implementación de Endpoint de Registro
ACCIÓN:
Archivo: voting/views.py
REEMPLAZAR TODO EL CONTENIDO con:
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from django.db import transaction

from .models import User, Election, Candidate, VoteRegistry, Vote
from .serializers import (
UserSerializer, RegisterSerializer, LoginSerializer,
ElectionSerializer, CandidateSerializer, VoteSerializer,
CastVoteSerializer
)

# ============================================
# VISTA: REGISTRO DE USUARIOS
# ============================================

class RegisterView(APIView):
"""
POST /api/register/
Registra un nuevo usuario y retorna tokens JWT.
"""

permission_classes = [AllowAny]

def post(self, request):
serializer = RegisterSerializer(data=request.data)

if serializer.is_valid():
user = serializer.save()

# Generar tokens JWT
refresh = RefreshToken.for_user(user)

return Response({
'message': 'Usuario registrado exitosamente',
'user': UserSerializer(user).data,
'tokens': {
'refresh': str(refresh),
'access': str(refresh.access_token),
}
}, status=status.HTTP_201_CREATED)

return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ============================================
# VISTA: LOGIN
# ============================================

class LoginView(APIView):
"""
POST /api/login/
Autentica usuario y retorna tokens JWT.
"""

permission_classes = [AllowAny]

def post(self, request):
serializer = LoginSerializer(data=request.data)

if not serializer.is_valid():
return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

email = serializer.validated_data['email']
password = serializer.validated_data['password']

try:
user = User.objects.get(email=email)
except User.DoesNotExist:
return Response(
{'error': 'Credenciales inválidas'},
status=status.HTTP_401_UNAUTHORIZED
)

# Verificar password
if not check_password(password, user.password):
return Response(
{'error': 'Credenciales inválidas'},
status=status.HTTP_401_UNAUTHORIZED
)

# Verificar que usuario esté activo
if not user.is_active:
return Response(
{'error': 'Usuario inactivo'},
status=status.HTTP_403_FORBIDDEN
)

# Generar tokens JWT
refresh = RefreshToken.for_user(user)

return Response({
'message': 'Login exitoso',
'user': UserSerializer(user).data,
'tokens': {
'refresh': str(refresh),
'access': str(refresh.access_token),
}
}, status=status.HTTP_200_OK)

# ============================================
# VISTA: PERFIL DE USUARIO
# ============================================

class ProfileView(APIView):
"""
GET /api/profile/

Retorna información del usuario autenticado.
Requiere token JWT en header Authorization.
"""

permission_classes = [IsAuthenticated]

def get(self, request):
serializer = UserSerializer(request.user)
return Response(serializer.data, status=status.HTTP_200_OK)
VALIDACIÓN:
python manage.py check
# Debe retornar: System check identified no issues
• views.py creado con RegisterView, LoginView, ProfileView
• Check sin errores
SECCIÓN 3.3: Configuración de URLs para Autenticación
ACCIÓN:
Crear archivo: voting/urls.py
CONTENIDO:
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, ProfileView

# Router para viewsets (se agregarán en Fase 4)
router = DefaultRouter()

urlpatterns = [
# Autenticación
path('register/', RegisterView.as_view(), name='register'),
path('login/', LoginView.as_view(), name='login'),
path('profile/', ProfileView.as_view(), name='profile'),
path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

# Router (vacío por ahora)
path('', include(router.urls)),
]
ACCIÓN:
Archivo: config/urls.py
MODIFICAR para incluir URLs de voting:
from django.contrib import admin
from django.urls import path, include

urlpatterns = [

path('admin/', admin.site.urls),
path('api/', include('voting.urls')), # AGREGAR ESTA LÍNEA
]
VALIDACIÓN:
python manage.py check

# Iniciar servidor
python manage.py runserver

# En otra terminal o navegador, acceder a:
# http://127.0.0.1:8000/api/
# Debe mostrar interfaz browsable de DRF
• voting/urls.py creado
• config/urls.py modificado
• Servidor inicia sin errores
• /api/ accesible
SECCIÓN 3.4: Testing de Endpoints de Autenticación
TESTING MANUAL (Usar Postman, Insomnia, o curl):
TEST 1: Registro de Usuario
curl -X POST http://127.0.0.1:8000/api/register/ \
-H "Content-Type: application/json" \
-d '{
"email": "test@example.com",
"password": "password123",
"password_confirm": "password123",
"full_name": "Usuario de Prueba"
}'
Respuesta esperada (200):
{
"message": "Usuario registrado exitosamente",
"user": {
"id": "uuid-aqui",
"email": "test@example.com",
"full_name": "Usuario de Prueba",
"role": "voter",
"is_active": true,
"created_at": "2024-..."
},
"tokens": {
"refresh": "eyJ...",
"access": "eyJ..."
}
}

TEST 2: Login
curl -X POST http://127.0.0.1:8000/api/login/ \
-H "Content-Type: application/json" \
-d '{
"email": "admin@votaciones.com",
"password": "temporal_password"
}'
Respuesta esperada (200):
{
"message": "Login exitoso",
"user": {...},
"tokens": {
"refresh": "eyJ...",
"access": "eyJ..."
}
}
COPIAR el access token para siguiente test
TEST 3: Perfil (Protegido)
curl -X GET http://127.0.0.1:8000/api/profile/ \
-H "Authorization: Bearer [PEGAR_ACCESS_TOKEN_AQUI]"
Respuesta esperada (200):
{
"id": "uuid",
"email": "admin@votaciones.com",
"full_name": "Admin Sistema",
"role": "admin",
"is_active": true,
"created_at": "..."
}
TEST 4: Perfil sin token (debe fallar)
curl -X GET http://127.0.0.1:8000/api/profile/
Respuesta esperada (401):
{
"detail": "Authentication credentials were not provided."
}
VALIDACIÓN:
• POST /api/register/ crea usuario y retorna tokens
• POST /api/login/ autentica y retorna tokens
• GET /api/profile/ con token retorna datos de usuario
• GET /api/profile/ sin token retorna 401
• Tokens JWT funcionan correctamente
CHECKPOINT FASE 3 COMPLETADO
CHECKLIST:

• Serializers creados (10 serializers)
• RegisterView, LoginView, ProfileView implementadas
• URLs configuradas
• Endpoints de auth funcionando
• JWT funcionando correctamente
• Tests manuales exitosos
ACTUALIZAR TABLA DE CONTROL:
Fase 3: COMPLETADO | Checkpoint: Auth system operational | Validación: JWT working
Métrica: 37.5% completado (3/8 fases)

FASE 4: ENDPOINTS CORE (ELECCIONES Y CANDIDATOS)
OBJETIVO DE FASE 4
Implementar endpoints para consultar elecciones y candidatos usando viewsets de DRF.
SECCIÓN 4.1: Creación de ViewSets de Solo Lectura
ACCIÓN:
Archivo: voting/views.py
AGREGAR al final del archivo (después de ProfileView):
# ============================================
# VIEWSET: ELECTIONS
# ============================================

class ElectionViewSet(viewsets.ReadOnlyModelViewSet):
"""
ViewSet para consultar elecciones.

Endpoints generados:
- GET /api/elections/ - Lista todas las elecciones
- GET /api/elections/{id}/ - Detalle de una elección
"""

queryset = Election.objects.all()
serializer_class = ElectionSerializer
permission_classes = [AllowAny]

def get_queryset(self):
"""
Opcionalmente filtrar por status.
Ej: /api/elections/?status=active
"""
queryset = super().get_queryset()
status_filter = self.request.query_params.get('status', None)

if status_filter:
queryset = queryset.filter(status=status_filter)

return queryset

# ============================================
# VIEWSET: CANDIDATES
# ============================================

class CandidateViewSet(viewsets.ReadOnlyModelViewSet):
"""
ViewSet para consultar candidatos.

Endpoints generados:
- GET /api/candidates/ - Lista todos los candidatos
- GET /api/candidates/{id}/ - Detalle de un candidato
"""

queryset = Candidate.objects.all()
serializer_class = CandidateSerializer
permission_classes = [AllowAny]

def get_queryset(self):
"""
Opcionalmente filtrar por election_id.
Ej: /api/candidates/?election=uuid-de-eleccion
"""
queryset = super().get_queryset()
election_id = self.request.query_params.get('election', None)

if election_id:
queryset = queryset.filter(election_id=election_id)

return queryset
VALIDACIÓN:
python manage.py check
• ViewSets agregados
• Check sin errores
SECCIÓN 4.2: Registro de ViewSets en Router
ACCIÓN:
Archivo: voting/urls.py
MODIFICAR la sección del router:
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
RegisterView, LoginView, ProfileView,
ElectionViewSet, CandidateViewSet # IMPORTAR
)

# Router para viewsets
router = DefaultRouter()
router.register(r'elections', ElectionViewSet, basename='election') # AGREGAR
router.register(r'candidates', CandidateViewSet, basename='candidate') # AGREGAR

urlpatterns = [
# Autenticación
path('register/', RegisterView.as_view(), name='register'),
path('login/', LoginView.as_view(), name='login'),
path('profile/', ProfileView.as_view(), name='profile'),
path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

# Router
path('', include(router.urls)),
]
VALIDACIÓN:
python manage.py runserver

# Acceder a:
# http://127.0.0.1:8000/api/elections/
# http://127.0.0.1:8000/api/candidates/
• ViewSets registrados
• Endpoints accesibles
SECCIÓN 4.3: Testing de Endpoints de Consulta
TEST 1: Listar Elecciones
curl -X GET http://127.0.0.1:8000/api/elections/
Debe retornar array con 3 elecciones creadas en PLAN A
TEST 2: Filtrar Elecciones Activas
curl -X GET "http://127.0.0.1:8000/api/elections/?status=active"
Debe retornar solo elecciones con status='active'
TEST 3: Detalle de Elección
# Copiar un ID de elección del test anterior
curl -X GET http://127.0.0.1:8000/api/elections/[UUID_AQUI]/
TEST 4: Listar Candidatos
curl -X GET http://127.0.0.1:8000/api/candidates/
Debe retornar candidatos creados en PLAN A
TEST 5: Filtrar Candidatos por Elección

curl -X GET "http://127.0.0.1:8000/api/candidates/?election=[UUID_ELECCION]"
Debe retornar solo candidatos de esa elección
VALIDACIÓN:
• GET /api/elections/ retorna todas las elecciones
• GET /api/elections/?status=active filtra correctamente
• GET /api/elections/{id}/ retorna detalle
• GET /api/candidates/ retorna todos los candidatos
• GET /api/candidates/?election={id} filtra correctamente
CHECKPOINT FASE 4 COMPLETADO
CHECKLIST:
• ElectionViewSet y CandidateViewSet implementados
• ViewSets registrados en router
• Endpoints de consulta funcionando
• Filtros funcionando
ACTUALIZAR TABLA DE CONTROL:
Fase 4: COMPLETADO | Checkpoint: Read endpoints working | Validación: Filters OK
Métrica: 50% completado (4/8 fases)

FASE 5: LÓGICA DE VOTACIÓN (ENDPOINTS CRÍTICOS)
OBJETIVO DE FASE 5
Implementar la lógica crítica de votación: endpoint para votar, verificar si ya votó, consultar resultados e historial.
SECCIÓN 5.1: Implementación de Endpoint para Votar
ACCIÓN:
Archivo: voting/views.py
AGREGAR al final del archivo:
# ============================================
# VISTA: EMITIR VOTO
# ============================================

class VoteView(APIView):
"""
POST /api/vote/
Emite un voto con validaciones completas.

Validaciones:
1. Usuario autenticado
2. Elección existe
3. Elección está activa
4. Elección está dentro del periodo de votación
5. Candidato existe y pertenece a la elección
6. Usuario NO ha votado antes en esta elección

Operación atómica:

- Crea registro en Vote (anónimo)
- Actualiza/crea registro en VoteRegistry
"""

permission_classes = [IsAuthenticated]

def post(self, request):
serializer = CastVoteSerializer(data=request.data)

if not serializer.is_valid():
return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

election = serializer.validated_data['election']
candidate = serializer.validated_data['candidate']
user = request.user

# ========== VALIDACIONES ==========

# 1. Verificar que elección esté activa
if election.status != 'active':
return Response(
{'error': f'La elección está en estado "{election.status}". Solo se puede votar en elecciones activas.'},
status=status.HTTP_400_BAD_REQUEST
)

# 2. Verificar que elección esté dentro del periodo
now = timezone.now()
if now < election.start_date:
return Response(
{'error': 'La votación aún no ha iniciado'},
status=status.HTTP_400_BAD_REQUEST
)
if now > election.end_date:
return Response(
{'error': 'La votación ya finalizó'},
status=status.HTTP_400_BAD_REQUEST
)

# 3. Verificar que usuario NO haya votado
try:
vote_registry = VoteRegistry.objects.get(user=user, election=election)
if vote_registry.has_voted:
return Response(

{'error': 'Ya has votado en esta elección'},
status=status.HTTP_400_BAD_REQUEST
)
except VoteRegistry.DoesNotExist:
vote_registry = None

# ========== EMITIR VOTO (Operación Atómica) ==========

try:
with transaction.atomic():
# Crear voto anónimo
Vote.objects.create(
election=election,
candidate=candidate
# NO incluir user (anonimato)
)

# Actualizar o crear registro de control
if vote_registry:
vote_registry.has_voted = True
vote_registry.voted_at = timezone.now()
vote_registry.save()
else:
VoteRegistry.objects.create(
user=user,
election=election,
has_voted=True,
voted_at=timezone.now()
)

return Response({
'message': 'Voto registrado exitosamente',
'election': election.title,
'candidate': candidate.name
}, status=status.HTTP_201_CREATED)

except Exception as e:
return Response(
{'error': f'Error al registrar voto: {str(e)}'},
status=status.HTTP_500_INTERNAL_SERVER_ERROR
)
VALIDACIÓN:
python manage.py check

• VoteView implementada
• Check sin errores
SECCIÓN 5.2: Implementación de Endpoint de Verificación de Voto
ACCIÓN:
Archivo: voting/views.py
AGREGAR:
# ============================================
# VISTA: VERIFICAR SI YA VOTÓ
# ============================================

class HasVotedView(APIView):
"""
GET /api/has-voted/{election_id}/
Verifica si el usuario autenticado ya votó en una elección.

Retorna:
{
"has_voted": true/false,
"election_id": "uuid",
"election_title": "Título",
"voted_at": "timestamp" (si votó)
}
"""

permission_classes = [IsAuthenticated]

def get(self, request, election_id):
user = request.user

# Verificar que elección existe
try:
election = Election.objects.get(id=election_id)
except Election.DoesNotExist:
return Response(
{'error': 'Elección no encontrada'},
status=status.HTTP_404_NOT_FOUND
)

# Buscar registro de votación
try:
vote_registry = VoteRegistry.objects.get(user=user, election=election)
return Response({
'has_voted': vote_registry.has_voted,
'election_id': str(election.id),

'election_title': election.title,
'voted_at': vote_registry.voted_at
}, status=status.HTTP_200_OK)
except VoteRegistry.DoesNotExist:
return Response({
'has_voted': False,
'election_id': str(election.id),
'election_title': election.title,
'voted_at': None
}, status=status.HTTP_200_OK)
VALIDACIÓN:
python manage.py check
• HasVotedView implementada
• Check sin errores
SECCIÓN 5.3: Implementación de Endpoint de Resultados
ACCIÓN:
Archivo: voting/views.py
AGREGAR:
from django.db.models import Count

# ============================================
# VISTA: RESULTADOS DE ELECCIÓN
# ============================================

class ResultsView(APIView):
"""
GET /api/results/{election_id}/
Retorna resultados de una elección con conteo de votos.

Retorna:
{
"election": {...},
"total_votes": 100,
"results": [
{
"candidate_id": "uuid",
"candidate_name": "Nombre",
"votes": 45,
"percentage": 45.0
},
...
]
}
"""

permission_classes = [AllowAny] # Resultados públicos (configurablesegun election.results_public)

def get(self, request, election_id):
# Verificar que elección existe
try:
election = Election.objects.get(id=election_id)
except Election.DoesNotExist:
return Response(
{'error': 'Elección no encontrada'},
status=status.HTTP_404_NOT_FOUND
)

# Obtener candidatos de la elección
candidates = Candidate.objects.filter(election=election)

# Contar votos por candidato
vote_counts = Vote.objects.filter(election=election).values('candidate').annotate(
count=Count('id')
)

# Crear diccionario de conteos
votes_dict = {item['candidate']: item['count'] for item in vote_counts}

# Calcular total de votos
total_votes = sum(votes_dict.values())

# Construir resultados
results = []
for candidate in candidates:
votes = votes_dict.get(candidate.id, 0)
percentage = (votes / total_votes * 100) if total_votes > 0 else 0

results.append({
'candidate_id': str(candidate.id),
'candidate_name': candidate.name,
'candidate_photo': candidate.photo_url,
'party_group': candidate.party_group,
'votes': votes,
'percentage': round(percentage, 2)
})

# Ordenar por votos descendente

results.sort(key=lambda x: x['votes'], reverse=True)

return Response({
'election': ElectionSerializer(election).data,
'total_votes': total_votes,
'results': results
}, status=status.HTTP_200_OK)
VALIDACIÓN:
python manage.py check
• ResultsView implementada
• Check sin errores
SECCIÓN 5.4: Implementación de Endpoint de Historial
ACCIÓN:
Archivo: voting/views.py
AGREGAR:
# ============================================
# VISTA: HISTORIAL DE ELECCIONES CERRADAS
# ============================================

class HistoryView(APIView):
"""
GET /api/history/
Retorna lista de elecciones cerradas con sus resultados finales.
"""

permission_classes = [AllowAny]

def get(self, request):
# Obtener elecciones cerradas
closed_elections = Election.objects.filter(status='closed').order_by('-end_date')

history = []

for election in closed_elections:
# Calcular resultados
candidates = Candidate.objects.filter(election=election)
vote_counts = Vote.objects.filter(election=election).values('candidate').annotate(
count=Count('id')
)
votes_dict = {item['candidate']: item['count'] for item in vote_counts}
total_votes = sum(votes_dict.values())

results = []
winner = None

max_votes = 0

for candidate in candidates:
votes = votes_dict.get(candidate.id, 0)
percentage = (votes / total_votes * 100) if total_votes > 0 else 0

result = {
'candidate_name': candidate.name,
'votes': votes,
'percentage': round(percentage, 2)
}
results.append(result)

if votes > max_votes:
max_votes = votes
winner = candidate.name

results.sort(key=lambda x: x['votes'], reverse=True)

history.append({
'election': ElectionSerializer(election).data,
'total_votes': total_votes,
'winner': winner,
'results': results
})

return Response(history, status=status.HTTP_200_OK)
VALIDACIÓN:
python manage.py check
• HistoryView implementada
• Check sin errores
SECCIÓN 5.5: Registro de URLs de Votación
ACCIÓN:
Archivo: voting/urls.py
MODIFICAR imports y agregar rutas:
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
RegisterView, LoginView, ProfileView,
ElectionViewSet, CandidateViewSet,
VoteView, HasVotedView, ResultsView, HistoryView # AGREGAR
)

# Router para viewsets
router = DefaultRouter()
router.register(r'elections', ElectionViewSet, basename='election')
router.register(r'candidates', CandidateViewSet, basename='candidate')

urlpatterns = [
# Autenticación
path('register/', RegisterView.as_view(), name='register'),
path('login/', LoginView.as_view(), name='login'),
path('profile/', ProfileView.as_view(), name='profile'),
path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

# Votación # AGREGAR ESTAS LÍNEAS
path('vote/', VoteView.as_view(), name='vote'),
path('has-voted/<uuid:election_id>/', HasVotedView.as_view(), name='has-voted'),
path('results/<uuid:election_id>/', ResultsView.as_view(), name='results'),
path('history/', HistoryView.as_view(), name='history'),

# Router
path('', include(router.urls)),
]
VALIDACIÓN:
python manage.py runserver
• URLs agregadas
• Servidor inicia correctamente
SECCIÓN 5.6: Testing Completo de Flujo de Votación
PREREQUISITO: Obtener un access_token válido
# Login
curl -X POST http://127.0.0.1:8000/api/login/ \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "password123"}'

# Copiar el access token
TEST 1: Verificar si ya votó (debe ser false inicialmente)
# Obtener ID de elección activa primero
curl http://127.0.0.1:8000/api/elections/?status=active

# Copiar el ID de la elección activa y usarlo en:
curl -X GET http://127.0.0.1:8000/api/has-voted/[UUID_ELECCION]/ \
-H "Authorization: Bearer [ACCESS_TOKEN]"

# Debe retornar: {"has_voted": false, ...}

TEST 2: Emitir voto
# Obtener ID de un candidato de esa elección
curl "http://127.0.0.1:8000/api/candidates/?election=[UUID_ELECCION]"

# Copiar ID de un candidato y votar:
curl -X POST http://127.0.0.1:8000/api/vote/ \
-H "Authorization: Bearer [ACCESS_TOKEN]" \
-H "Content-Type: application/json" \
-d '{
"election_id": "[UUID_ELECCION]",
"candidate_id": "[UUID_CANDIDATO]"
}'

# Debe retornar: {"message": "Voto registrado exitosamente", ...}
TEST 3: Verificar que ya votó (debe ser true ahora)
curl -X GET http://127.0.0.1:8000/api/has-voted/[UUID_ELECCION]/ \
-H "Authorization: Bearer [ACCESS_TOKEN]"

# Debe retornar: {"has_voted": true, "voted_at": "..."}
TEST 4: Intentar votar de nuevo (debe fallar)
curl -X POST http://127.0.0.1:8000/api/vote/ \
-H "Authorization: Bearer [ACCESS_TOKEN]" \
-H "Content-Type: application/json" \
-d '{
"election_id": "[UUID_ELECCION]",
"candidate_id": "[UUID_CANDIDATO]"
}'

# Debe retornar: {"error": "Ya has votado en esta elección"}
TEST 5: Ver resultados
curl http://127.0.0.1:8000/api/results/[UUID_ELECCION]/

# Debe mostrar conteo actualizado con el voto emitido
TEST 6: Ver historial
curl http://127.0.0.1:8000/api/history/

# Debe mostrar elecciones cerradas con resultados
VALIDACIÓN:
• Has-voted retorna false inicialmente
• Vote exitoso retorna 201
• Has-voted retorna true después de votar
• Segundo intento de voto retorna error 400
• Results muestra conteo correcto

• History muestra elecciones cerradas
CHECKPOINT FASE 5 COMPLETADO
CHECKLIST:
• VoteView implementada con validaciones completas
• HasVotedView implementada
• ResultsView implementada
• HistoryView implementada
• URLs configuradas
• Flujo completo de votación funciona
• Prevención de doble voto funciona
• Resultados en tiempo real funcionan
ACTUALIZAR TABLA DE CONTROL:
Fase 5: COMPLETADO | Checkpoint: Voting logic complete | Validación: Flow tested
Métrica: 62.5% completado (5/8 fases)

FASE 6: DJANGO ADMIN Y GESTIÓN
OBJETIVO DE FASE 6
Configurar Django Admin para gestión visual de elecciones, candidatos y usuarios. Crear superusuario y acciones
personalizadas.
SECCIÓN 6.1: Configuración de Admin para Modelos
ACCIÓN:
Archivo: voting/admin.py
REEMPLAZAR TODO EL CONTENIDO con:
from django.contrib import admin
from .models import User, Election, Candidate, VoteRegistry, Vote

# ============================================
# ADMIN: USER
# ============================================

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
list_display = ['email', 'full_name', 'role', 'is_active', 'created_at']
list_filter = ['role', 'is_active', 'created_at']
search_fields = ['email', 'full_name']
ordering = ['-created_at']
readonly_fields = ['id', 'created_at']

fieldsets = (
('Información Personal', {
'fields': ('id', 'email', 'full_name', 'password')
}),
('Permisos', {
'fields': ('role', 'is_active')

}),
('Fechas', {
'fields': ('created_at',)
}),
)

# ============================================
# ADMIN: ELECTION
# ============================================

def activate_elections(modeladmin, request, queryset):
"""Acción: Activar elecciones seleccionadas"""
for election in queryset:
# Validar que tenga candidatos
if election.candidates.count() == 0:
modeladmin.message_user(
request,
f' No se puede activar "{election.title}" porque no tiene candidatos.',
level='ERROR'
)
continue

election.status = 'active'
election.save()
modeladmin.message_user(
request,
f' Elección "{election.title}" activada exitosamente.'
)

activate_elections.short_description = " Activar elecciones seleccionadas"

def close_elections(modeladmin, request, queryset):
"""Acción: Cerrar elecciones seleccionadas"""
updated = queryset.update(status='closed')
modeladmin.message_user(
request,
f' {updated} elección(es) cerrada(s) exitosamente.'
)

close_elections.short_description = " Cerrar elecciones seleccionadas"

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
list_display = ['title', 'status', 'start_date', 'end_date', 'results_public', 'created_at']
list_filter = ['status', 'results_public', 'created_at']
search_fields = ['title', 'description']
ordering = ['-created_at']
readonly_fields = ['id', 'created_at']
actions = [activate_elections, close_elections]

fieldsets = (
('Información General', {
'fields': ('id', 'title', 'description', 'status')
}),
('Periodo de Votación', {
'fields': ('start_date', 'end_date')
}),
('Configuración', {
'fields': ('results_public',)
}),
('Fechas', {
'fields': ('created_at',)
}),
)

# ============================================
# ADMIN: CANDIDATE
# ============================================

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
list_display = ['name', 'election', 'party_group', 'display_order', 'created_at']
list_filter = ['election', 'created_at']
search_fields = ['name', 'description', 'party_group']
ordering = ['election', 'display_order', 'name']
readonly_fields = ['id', 'created_at']

fieldsets = (
('Información del Candidato', {
'fields': ('id', 'election', 'name', 'description')
}),
('Detalles', {

'fields': ('photo_url', 'party_group', 'display_order')
}),
('Fechas', {
'fields': ('created_at',)
}),
)

# ============================================
# ADMIN: VOTE REGISTRY
# ============================================

@admin.register(VoteRegistry)
class VoteRegistryAdmin(admin.ModelAdmin):
list_display = ['user', 'election', 'has_voted', 'voted_at']
list_filter = ['has_voted', 'election', 'voted_at']
search_fields = ['user__email', 'election__title']
ordering = ['-voted_at']
readonly_fields = ['id', 'voted_at']

# ============================================
# ADMIN: VOTE
# ============================================

@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
list_display = ['election', 'candidate', 'cast_at']
list_filter = ['election', 'candidate', 'cast_at']
ordering = ['-cast_at']
readonly_fields = ['id', 'cast_at']

# IMPORTANTE: No permitir editar votos (integridad)
def has_change_permission(self, request, obj=None):
return False

def has_delete_permission(self, request, obj=None):
return False
VALIDACIÓN:
python manage.py check
• Admin configurado para todos los modelos
• Check sin errores
SECCIÓN 6.2: Creación de Superusuario

ACCIÓN:
python manage.py createsuperuser
Ingresar datos cuando se solicite:
Email: admin@votaciones.com
Password: admin123456 # Usar password seguro
Password (again): admin123456
VALIDACIÓN:
# Verificar en base de datos
python manage.py shell
from voting.models import User

admin = User.objects.get(email='admin@votaciones.com')
print(f"Admin creado: {admin.email} - Role: {admin.role}")

# El rol será 'voter' por defecto, hay que cambiarlo a 'admin'
admin.role = 'admin'
admin.save()

print(f"Role actualizado: {admin.role}")
exit()
NOTA: Django Admin usa su propio sistema de permisos (is_staff, is_superuser). Nuestro modelo User custom usa 'role'.
Para que funcione el admin, necesitamos agregar campos compatibles.
SOLUCIÓN TEMPORAL SIMPLE:
Django Admin requiere que el modelo User tenga ciertos campos. Como estamos usando un modelo custom simple,
configuraremos el admin para usar directamente el User de Supabase.
Por ahora, usar el usuario admin@votaciones.com con la password hasheada que ya existe en Supabase desde el PLAN A.
• Superusuario creado
• Role configurado como admin
SECCIÓN 6.3: Acceso y Testing de Django Admin
ACCIÓN:
python manage.py runserver

# Acceder en navegador a:
# http://127.0.0.1:8000/admin/
Login con:
• Email: admin@votaciones.com
• Password: temporal_password (o la que se configuró en PLAN A)
NOTA: Si el login falla porque Django Admin espera campos específicos (username, is_staff), implementar solución
alternativa:
SOLUCIÓN: Modificar Admin Site
Archivo: config/settings.py
AGREGAR al final:
# Configuración para usar email como username en admin
AUTH_USER_MODEL = 'voting.User' # Solo si no causa conflictos
Si hay conflictos, usar autenticación custom más simple:
El admin ya debe funcionar con el superusuario creado. Si no, es aceptable omitir Django Admin para este proyecto
académico y gestionar desde endpoints API + interfaz de usuario del frontend.

TESTING EN ADMIN (si funciona):
1. Ir a sección "Elections"
2. Ver lista de elecciones
3. Seleccionar una elección en borrador
4. Aplicar acción " Activar elecciones seleccionadas"
5. Verificar mensaje de éxito
6. Ir a sección "Candidates"
7. Ver candidatos vinculados a elecciones
VALIDACIÓN:
• Admin accesible
• Modelos visibles en admin
• Acciones personalizadas funcionan
• Puede gestionar elecciones y candidatos
CHECKPOINT FASE 6 COMPLETADO
CHECKLIST:
• Admin configurado para todos los modelos
• Acciones personalizadas (activate, close) implementadas
• Superusuario creado
• Admin accesible y funcional
ACTUALIZAR TABLA DE CONTROL:
Fase 6: COMPLETADO | Checkpoint: Admin configured | Validación: Management interface ready
Métrica: 75% completado (6/8 fases)

FASE 7: TESTING Y VALIDACIÓN INTEGRAL
OBJETIVO DE FASE 7
Implementar tests automatizados, validar todos los endpoints, verificar lógica de negocio y asegurar que no haya deuda
técnica.
SECCIÓN 7.1: Implementación de Tests Automatizados
ACCIÓN:
Archivo: voting/tests.py
REEMPLAZAR TODO EL CONTENIDO con:
from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import User, Election, Candidate, VoteRegistry, Vote

# ============================================
# TESTS: AUTENTICACIÓN
# ============================================

class AuthenticationTests(APITestCase):
"""Tests para registro, login y perfil"""

def setUp(self):
self.client = APIClient()
self.register_url = '/api/register/'
self.login_url = '/api/login/'
self.profile_url = '/api/profile/'

def test_user_can_register(self):
"""Test: Usuario puede registrarse"""
data = {
'email': 'newuser@test.com',
'password': 'password123',
'password_confirm': 'password123',
'full_name': 'New User'
}
response = self.client.post(self.register_url, data, format='json')

self.assertEqual(response.status_code, status.HTTP_201_CREATED)
self.assertIn('tokens', response.data)
self.assertIn('access', response.data['tokens'])
self.assertEqual(response.data['user']['email'], 'newuser@test.com')

def test_cannot_register_with_existing_email(self):
"""Test: No se puede registrar con email existente"""
# Crear usuario
User.objects.create(
email='existing@test.com',
password='hashed',
full_name='Existing'
)

# Intentar registrar con mismo email
data = {
'email': 'existing@test.com',
'password': 'password123',
'password_confirm': 'password123',
'full_name': 'Another User'
}
response = self.client.post(self.register_url, data, format='json')

self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

def test_user_can_login(self):
"""Test: Usuario puede hacer login"""
# Crear usuario con password hasheado
from django.contrib.auth.hashers import make_password
user = User.objects.create(
email='testuser@test.com',
password=make_password('testpass123'),
full_name='Test User'
)

# Login
data = {
'email': 'testuser@test.com',
'password': 'testpass123'
}
response = self.client.post(self.login_url, data, format='json')

self.assertEqual(response.status_code, status.HTTP_200_OK)
self.assertIn('tokens', response.data)

def test_profile_requires_authentication(self):
"""Test: Perfil requiere autenticación"""
response = self.client.get(self.profile_url)
self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# ============================================
# TESTS: VOTACIÓN
# ============================================

class VotingTests(APITestCase):
"""Tests para lógica de votación"""

def setUp(self):
self.client = APIClient()

# Crear usuario de prueba
from django.contrib.auth.hashers import make_password
self.user = User.objects.create(
email='voter@test.com',
password=make_password('pass123'),
full_name='Voter Test'

)

# Crear elección activa
self.election = Election.objects.create(
title='Test Election',
description='Testing',
start_date=timezone.now() - timedelta(days=1),
end_date=timezone.now() + timedelta(days=7),
status='active'
)

# Crear candidatos
self.candidate1 = Candidate.objects.create(
election=self.election,
name='Candidate 1',
display_order=1
)
self.candidate2 = Candidate.objects.create(
election=self.election,
name='Candidate 2',
display_order=2
)

# Autenticar usuario
from rest_framework_simplejwt.tokens import RefreshToken
refresh = RefreshToken.for_user(self.user)
self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

def test_user_can_vote(self):
"""Test: Usuario puede votar"""
data = {
'election_id': str(self.election.id),
'candidate_id': str(self.candidate1.id)
}
response = self.client.post('/api/vote/', data, format='json')

self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# Verificar que voto se registró
self.assertEqual(Vote.objects.filter(election=self.election).count(), 1)

# Verificar que registro de control se creó
registry = VoteRegistry.objects.get(user=self.user, election=self.election)

self.assertTrue(registry.has_voted)

def test_cannot_vote_twice(self):
"""Test: Usuario no puede votar dos veces"""
# Primer voto
data = {
'election_id': str(self.election.id),
'candidate_id': str(self.candidate1.id)
}
self.client.post('/api/vote/', data, format='json')

# Segundo voto (debe fallar)
data2 = {
'election_id': str(self.election.id),
'candidate_id': str(self.candidate2.id)
}
response = self.client.post('/api/vote/', data2, format='json')

self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
self.assertIn('Ya has votado', str(response.data))

def test_results_count_is_correct(self):
"""Test: Conteo de resultados es correcto"""
# Crear varios votos
Vote.objects.create(election=self.election, candidate=self.candidate1)
Vote.objects.create(election=self.election, candidate=self.candidate1)
Vote.objects.create(election=self.election, candidate=self.candidate2)

# Obtener resultados
response = self.client.get(f'/api/results/{self.election.id}/')

self.assertEqual(response.status_code, status.HTTP_200_OK)
self.assertEqual(response.data['total_votes'], 3)

# Verificar conteo por candidato
results = {r['candidate_name']: r['votes'] for r in response.data['results']}
self.assertEqual(results['Candidate 1'], 2)
self.assertEqual(results['Candidate 2'], 1)

# ============================================
# TESTS: MODELOS
# ============================================

class ModelTests(TestCase):
"""Tests para modelos"""

def test_election_is_active_property(self):
"""Test: Propiedad is_active de Election"""
election = Election.objects.create(
title='Test',
start_date=timezone.now() - timedelta(days=1),
end_date=timezone.now() + timedelta(days=1),
status='active'
)
self.assertTrue(election.is_active)

# Cambiar a closed
election.status = 'closed'
self.assertFalse(election.is_active)
VALIDACIÓN:
python manage.py check
• Tests implementados
• Check sin errores
SECCIÓN 7.2: Ejecución de Tests Automatizados
ACCIÓN:
# Ejecutar todos los tests
python manage.py test

# Debe mostrar algo como:
# Creating test database for alias 'default'...
# System check identified no issues (0 silenced).
# ..........
# ----------------------------------------------------------------------
# Ran 10 tests in 2.34s
#
# OK
# Destroying test database for alias 'default'...
Si algún test falla, revisar el error y corregir.
VALIDACIÓN:
• Todos los tests pasan
• No hay errores en ejecución
SECCIÓN 7.3: Validación Manual Integral
CHECKLIST DE VALIDACIÓN COMPLETA:
1. AUTENTICACIÓN:
# Register

curl -X POST http://127.0.0.1:8000/api/register/ -H "Content-Type: application/json" -d
'{"email":"final@test.com","password":"pass123","password_confirm":"pass123","full_name":"Final Test"}'

# Login
curl -X POST http://127.0.0.1:8000/api/login/ -H "Content-Type: application/json" -d
'{"email":"final@test.com","password":"pass123"}'

# Profile (con token)
curl -H "Authorization: Bearer [TOKEN]" http://127.0.0.1:8000/api/profile/
• Register funciona
• Login funciona
• Profile funciona con token
• Profile falla sin token
2. CONSULTAS:
# Elecciones
curl http://127.0.0.1:8000/api/elections/

# Filtrar activas
curl "http://127.0.0.1:8000/api/elections/?status=active"

# Candidatos
curl http://127.0.0.1:8000/api/candidates/
• Lista de elecciones funciona
• Filtro por status funciona
• Lista de candidatos funciona
3. VOTACIÓN COMPLETA:
# Has voted (debe ser false)
curl -H "Authorization: Bearer [TOKEN]" http://127.0.0.1:8000/api/has-voted/[ELECTION_ID]/

# Vote
curl -X POST -H "Authorization: Bearer [TOKEN]" -H "Content-Type: application/json" -d
'{"election_id":"[ID]","candidate_id":"[ID]"}' http://127.0.0.1:8000/api/vote/

# Has voted (debe ser true ahora)
curl -H "Authorization: Bearer [TOKEN]" http://127.0.0.1:8000/api/has-voted/[ELECTION_ID]/

# Intentar votar de nuevo (debe fallar)
curl -X POST -H "Authorization: Bearer [TOKEN]" -H "Content-Type: application/json" -d
'{"election_id":"[ID]","candidate_id":"[ID]"}' http://127.0.0.1:8000/api/vote/

# Results
curl http://127.0.0.1:8000/api/results/[ELECTION_ID]/

# History

curl http://127.0.0.1:8000/api/history/
• Has-voted funciona
• Voto se emite correctamente
• Doble voto se rechaza
• Results muestra conteo correcto
• History muestra elecciones cerradas
4. ADMIN:
• Admin accesible
• Puede gestionar elecciones
• Puede gestionar candidatos
SECCIÓN 7.4: Verificación de Integridad de Base de Datos
ACCIÓN:
python manage.py shell
from voting.models import *
from django.db.models import Count

# Verificar coherencia vote_registry vs votes
for election in Election.objects.all():
votes_count = Vote.objects.filter(election=election).count()
registry_count = VoteRegistry.objects.filter(election=election, has_voted=True).count()
print(f"{election.title}:")
print(f" Votos en tabla votes: {votes_count}")
print(f" Usuarios que votaron: {registry_count}")
print(f" Coherente: {votes_count == registry_count}")
print()

# Verificar que votes NO tiene user_id
from django.db import connection
cursor = connection.cursor()
cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name='votes' AND
column_name='user_id';")
result = cursor.fetchall()
print(f"Campo user_id en tabla votes: {len(result) == 0 and ' NO EXISTE (CORRECTO - Anonimato garantizado)' or '
EXISTE (ERROR)'}")

exit()
VALIDACIÓN:
• Coherencia entre votes y vote_registry confirmada
• Anonimato garantizado (no existe user_id en votes)
CHECKPOINT FASE 7 COMPLETADO
CHECKLIST:
• Tests automatizados implementados
• Todos los tests pasan

• Validación manual completa ejecutada
• Todos los endpoints funcionan correctamente
• Integridad de base de datos verificada
• Anonimato garantizado
ACTUALIZAR TABLA DE CONTROL:
Fase 7: COMPLETADO | Checkpoint: All tests pass | Validación: System fully tested
Métrica: 87.5% completado (7/8 fases)

FASE 8: DOCUMENTACIÓN Y FINALIZACIÓN
OBJETIVO DE FASE 8
Generar documentación completa del backend, crear README con instrucciones, documentar endpoints, y preparar para
entrega.
SECCIÓN 8.1: Creación de README del Backend
ACCIÓN:
Crear archivo: README_BACKEND.md
CONTENIDO COMPLETO:
# BACKEND - SISTEMA DE VOTACIONES

API REST completa desarrollada con Django y Django REST Framework para sistema de votaciones en línea.

## Tabla de Contenido

- [Tecnologías](#tecnologías)
- [Instalación Local](#instalación-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticación](#autenticación)
- [Modelos de Datos](#modelos-de-datos)
- [Testing](#testing)

---

## Tecnologías

- **Framework:** Django 4.2 LTS
- **API:** Django REST Framework 3.14
- **Base de Datos:** PostgreSQL (Supabase)
- **Autenticación:** JWT (djangorestframework-simplejwt)
- **CORS:** django-cors-headers

---

## Instalación Local

### Prerrequisitos

- Python 3.10 o superior
- pip
- Virtualenv

### Pasos de Instalación

1. **Clonar repositorio**
```bash
git clone [URL_REPO]
cd app-votar
2. Crear entorno virtual
3. python -m venv venv
4. source venv/bin/activate # Linux/macOS
5. venv\Scripts\activate # Windows
6. Instalar dependencias
7. pip install -r requirements.txt
8. Configurar variables de entorno
Crear archivo .env en la raíz con:
9. DB_NAME=postgres
10. DB_USER=postgres
11. DB_PASSWORD=tu_password_supabase
12. DB_HOST=tu_host_supabase
13. DB_PORT=5432
14.
15. SECRET_KEY=tu_secret_key_django
16. DEBUG=True
17. ALLOWED_HOSTS=localhost,127.0.0.1
18.
19. CORS_ALLOW_ALL_ORIGINS=True
20. Aplicar migraciones de Django
21. python manage.py migrate
22. Crear superusuario (opcional)
23. python manage.py createsuperuser
24. Ejecutar servidor de desarrollo
25. python manage.py runserver
Acceder a: http://127.0.0.1:8000/api/

Estructura del Proyecto
app-votar/
├── config/ # Configuración del proyecto Django
│ ├── settings.py # Settings principales
│ ├── urls.py # URLs raíz

│ └── wsgi.py
├── voting/ # App principal
│ ├── models.py # Modelos (User, Election, Candidate, etc.)
│ ├── serializers.py # Serializers DRF
│ ├── views.py # Vistas/Endpoints
│ ├── urls.py # URLs de la app
│ ├── admin.py # Configuración Django Admin
│ └── tests.py # Tests automatizados
├── manage.py
├── requirements.txt
├── .env # Variables de entorno (NO versionar)
└── README_BACKEND.md

Endpoints de la API
Base URL: http://127.0.0.1:8000/api/
1. Autenticación
Método Endpoint Autenticación Descripción
POST /register/ No Registrar nuevo usuario
POST /login/ No Iniciar sesión
GET /profile/ Sí Obtener perfil de usuario autenticado
POST /token/refresh/ No Refrescar access token
Ejemplo - Registro:
POST /api/register/
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123",
"password_confirm": "password123",
"full_name": "Nombre Completo"
}

Response (201):
{
"message": "Usuario registrado exitosamente",
"user": {...},
"tokens": {
"refresh": "eyJ...",
"access": "eyJ..."
}
}

Ejemplo - Login:
POST /api/login/
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}

Response (200):
{
"message": "Login exitoso",
"user": {...},
"tokens": {
"refresh": "eyJ...",
"access": "eyJ..."
}
}
2. Elecciones
Método Endpoint Autenticación Descripción
GET /elections/ No Listar todas las elecciones

GET /elections/{id}/ No Detalle de una elección
GET /elections/?status=active No Filtrar por estado
3. Candidatos
Método Endpoint Autenticación Descripción
GET /candidates/ No Listar todos los candidatos

GET /candidates/{id}/ No Detalle de un candidato
GET /candidates/?election={id} No Candidatos de una elección
4. Votación
Método Endpoint Autenticación Descripción
POST /vote/ Sí Emitir un voto

GET /has-voted/{election_id}/ Sí Verificar si ya votó
GET /results/{election_id}/ No Resultados de elección
GET /history/ No Historial de elecciones cerradas
Ejemplo - Votar:
POST /api/vote/

Authorization: Bearer {access_token}
Content-Type: application/json

{
"election_id": "uuid-de-eleccion",
"candidate_id": "uuid-de-candidato"
}

Response (201):
{
"message": "Voto registrado exitosamente",
"election": "Nombre de Elección",
"candidate": "Nombre de Candidato"
}
Ejemplo - Resultados:
GET /api/results/{election_id}/

Response (200):
{
"election": {...},
"total_votes": 150,
"results": [
{
"candidate_id": "uuid",
"candidate_name": "Candidato 1",
"votes": 85,
"percentage": 56.67
},
...
]
}

Autenticación
El sistema utiliza JWT (JSON Web Tokens) para autenticación.
Cómo usar JWT
1. Obtener tokens: Hacer login o registro
2. Usar access token: Incluir en header de peticiones protegidas
3. Authorization: Bearer {access_token}
4. Refrescar token: Cuando access token expire (60 min)
5. POST /api/token/refresh/
6. Content-Type: application/json
7.
8. {

9. "refresh": "{refresh_token}"
10. }
11.
12. Response:
13. {
14. "access": "nuevo_access_token"
15. }
Tokens
• Access Token: Válido por 60 minutos
• Refresh Token: Válido por 7 días

Modelos de Datos
User
Usuarios del sistema (votantes y administradores).
• Campos: id (UUID), email (unique), password (hasheado), full_name, role ('voter' o 'admin'), is_active
Election
Procesos de votación.
• Campos: id (UUID), title, description, start_date, end_date, status ('draft', 'active', 'closed'), results_public
Candidate
Opciones de voto en cada elección.
• Campos: id (UUID), election (FK), name, description, photo_url, party_group, display_order
Vote
Votos emitidos de forma anónima.
• Campos: id (UUID), election (FK → Election), candidate (FK → Candidate), cast_at (timestamp)
• CRÍTICO: NO contiene user_id para garantizar anonimato.
VoteRegistry
Control de votación (prevención de doble voto).
• Campos: id (UUID), user (FK → User), election (FK → Election), has_voted (boolean), voted_at (timestamp)
• Constraint: UNIQUE(user, election)

Testing
Ejecutar Tests Automatizados
python manage.py test

# Tests específicos
python manage.py test voting.tests.AuthenticationTests
python manage.py test voting.tests.VotingTests
Tests Incluidos
• Registro de usuarios
• Login con credenciales válidas/inválidas
• Autenticación JWT
• Emisión de voto
• Prevención de doble voto

• Cálculo de resultados
• Propiedades de modelos
**VALIDACIÓN:**
```bash
# Verificar que README se creó correctamente
ls -la README_BACKEND.md
• README_BACKEND.md creado y completo
SECCIÓN 8.2: Documentación de API en Formato OpenAPI
ACCIÓN:
Archivo: voting/api_docs.py
CONTENIDO:
"""
Documentación de endpoints para referencia rápida
"""

API_ENDPOINTS = {
"base_url": "http://127.0.0.1:8000/api/",

"authentication": {
"register": {
"method": "POST",
"endpoint": "/register/",
"auth_required": False,
"description": "Registrar nuevo usuario",
"payload": {
"email": "string (required, unique)",
"password": "string (required, min 6 chars)",
"password_confirm": "string (required, must match password)",
"full_name": "string (required)"
},
"response": {
"status": 201,
"data": {
"message": "Usuario registrado exitosamente",
"user": {
"id": "uuid",
"email": "string",
"full_name": "string",
"role": "voter",
"is_active": True
},
"tokens": {
"access": "jwt_token",
"refresh": "jwt_token"

}
}
}
},

"login": {
"method": "POST",
"endpoint": "/login/",
"auth_required": False,
"description": "Autenticar usuario",
"payload": {
"email": "string (required)",
"password": "string (required)"
},
"response": {
"status": 200,
"data": {
"message": "Login exitoso",
"user": "object",
"tokens": {
"access": "jwt_token",
"refresh": "jwt_token"
}
}
}
},

"profile": {
"method": "GET",
"endpoint": "/profile/",
"auth_required": True,
"description": "Obtener perfil de usuario autenticado",
"headers": {
"Authorization": "Bearer {access_token}"
},
"response": {
"status": 200,
"data": {
"id": "uuid",
"email": "string",
"full_name": "string",
"role": "voter|admin",
"is_active": True,

"created_at": "timestamp"
}
}
}
},

"voting": {
"vote": {
"method": "POST",
"endpoint": "/vote/",
"auth_required": True,
"description": "Emitir un voto",
"payload": {
"election_id": "uuid (required)",
"candidate_id": "uuid (required)"
},
"validations": [
"Elección debe existir",
"Elección debe estar activa",
"Fecha actual debe estar entre start_date y end_date",
"Candidato debe pertenecer a la elección",
"Usuario no debe haber votado antes en esta elección"
],
"response": {
"status": 201,
"data": {
"message": "Voto registrado exitosamente",
"election": "string",
"candidate": "string"
}
}
},

"has_voted": {
"method": "GET",
"endpoint": "/has-voted/{election_id}/",
"auth_required": True,
"description": "Verificar si usuario votó en elección",
"response": {
"status": 200,
"data": {
"has_voted": "boolean",
"election_id": "uuid",

"election_title": "string",
"voted_at": "timestamp|null"
}
}
},

"results": {
"method": "GET",
"endpoint": "/results/{election_id}/",
"auth_required": False,
"description": "Obtener resultados de elección",
"response": {
"status": 200,
"data": {
"election": "object",
"total_votes": "integer",
"results": [
{
"candidate_id": "uuid",
"candidate_name": "string",
"candidate_photo": "url",
"party_group": "string",
"votes": "integer",
"percentage": "float"
}
]
}
}
},

"history": {
"method": "GET",
"endpoint": "/history/",
"auth_required": False,
"description": "Listar elecciones cerradas con resultados",
"response": {
"status": 200,
"data": [
{
"election": "object",
"total_votes": "integer",
"winner": "string",
"results": "array"

}
]
}
}
},

"elections": {
"list": {
"method": "GET",
"endpoint": "/elections/",
"auth_required": False,
"description": "Listar todas las elecciones",
"query_params": {
"status": "draft|active|closed (optional)"
}
},

"detail": {
"method": "GET",
"endpoint": "/elections/{id}/",
"auth_required": False,
"description": "Detalle de una elección"
}
},

"candidates": {
"list": {
"method": "GET",
"endpoint": "/candidates/",
"auth_required": False,
"description": "Listar todos los candidatos",
"query_params": {
"election": "uuid (optional)"
}
},

"detail": {
"method": "GET",
"endpoint": "/candidates/{id}/",
"auth_required": False,
"description": "Detalle de un candidato"
}
}

}
VALIDACIÓN:
python manage.py check
• Documentación de API creada
SECCIÓN 8.3: Actualización de requirements.txt Final
ACCIÓN:
# Asegurar que todas las dependencias están capturadas
pip freeze > requirements.txt
Verificar contenido:
cat requirements.txt
Debe contener al menos:
asgiref==3.7.2
Django==4.2.16
django-cors-headers==4.3.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
psycopg2-binary==2.9.9
python-decouple==3.8
PyJWT==2.8.0
pytz==2024.1
sqlparse==0.4.4
• requirements.txt actualizado
SECCIÓN 8.4: Creación de .env.example Completo
ACCIÓN:
Archivo: .env.example
CONTENIDO FINAL:
# ============================================
# CONFIGURACIÓN DE BASE DE DATOS (SUPABASE)
# ============================================
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password_here
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432

# ============================================
# CONFIGURACIÓN DE DJANGO
# ============================================
# Generar con: python -c "from django.core.management.utils import get_random_secret_key;
print(get_random_secret_key())"
SECRET_KEY=your_django_secret_key_here

# Modo debug (True para desarrollo, False para producción)
DEBUG=True

# Hosts permitidos (separados por coma)
ALLOWED_HOSTS=localhost,127.0.0.1

# ============================================
# CONFIGURACIÓN DE CORS
# ============================================
# Desarrollo: True | Producción: False
CORS_ALLOW_ALL_ORIGINS=True

# Para producción, descomentar y configurar:
# CORS_ALLOWED_ORIGINS=http://localhost:3000,https://tu-frontend.vercel.app
• .env.example completado
SECCIÓN 8.5: Git - Commit Final del Backend
ACCIÓN:
# Verificar estado
git status

# Agregar todos los archivos (excepto los en .gitignore)
git add .

# Verificar que .env NO está siendo trackeado
git status | grep .env
# Solo debe aparecer .env.example

# Commit final
git commit -m "feat: Complete backend implementation

- Django 4.2 + DRF setup
- Models mapped to Supabase tables
- JWT authentication system
- Complete voting logic with validations
- Anonymous vote guarantee
- Results and history endpoints
- Django Admin configured
- Automated tests (10 tests)
- Complete API documentation
- README and .env.example

Status: Backend 100% functional"

# Si hay repositorio remoto configurado
# git push origin main

VALIDACIÓN:
# Ver último commit
git log -1 --oneline

# Verificar archivos trackeados
git ls-files | wc -l
# Debe mostrar cantidad razonable (sin venv/, .env, etc.)
• Commit final realizado
• .env no versionado
SECCIÓN 8.6: Checklist de Validación Final Completa
EJECUTAR EN ORDEN:
# ============================================
# CHECKLIST FINAL DE VALIDACIÓN BACKEND
# ============================================

# 1. CHECK DE DJANGO
python manage.py check
# Debe retornar: System check identified no issues (0 silenced).

# 2. TESTS AUTOMATIZADOS
python manage.py test
# Debe mostrar: Ran X tests ... OK

# 3. SERVIDOR DE DESARROLLO
python manage.py runserver &
SERVER_PID=$!
sleep 3

# 4. ENDPOINTS DE AUTENTICACIÓN
echo "Testing Register..."
curl -s -X POST http://127.0.0.1:8000/api/register/ \
-H "Content-Type: application/json" \
-d '{"email":"final_test@test.com","password":"test123","password_confirm":"test123","full_name":"Final Test"}' \
| grep -q "tokens" && echo " Register OK" || echo " Register FAIL"

echo "Testing Login..."
curl -s -X POST http://127.0.0.1:8000/api/login/ \
-H "Content-Type: application/json" \
-d '{"email":"admin@votaciones.com","password":"temporal_password"}' \
| grep -q "tokens" && echo " Login OK" || echo " Login FAIL"

# 5. ENDPOINTS DE CONSULTA
echo "Testing Elections..."

curl -s http://127.0.0.1:8000/api/elections/ \
| grep -q "id" && echo " Elections OK" || echo " Elections FAIL"

echo "Testing Candidates..."
curl -s http://127.0.0.1:8000/api/candidates/ \
| grep -q "id" && echo " Candidates OK" || echo " Candidates FAIL"

# 6. DETENER SERVIDOR
kill $SERVER_PID

# 7. VERIFICAR ARCHIVOS CRÍTICOS
echo "Checking critical files..."
[ -f "manage.py" ] && echo " manage.py exists" || echo " manage.py missing"
[ -f "requirements.txt" ] && echo " requirements.txt exists" || echo " requirements.txt missing"
[ -f ".env.example" ] && echo " .env.example exists" || echo " .env.example missing"
[ -f "README_BACKEND.md" ] && echo " README_BACKEND.md exists" || echo " README_BACKEND.md missing"
[ -d "voting" ] && echo " voting app exists" || echo " voting app missing"

# 8. VERIFICAR MODELOS
python manage.py shell -c "
from voting.models import User, Election, Candidate, VoteRegistry, Vote
print(' User model:', User.objects.count(), 'records')
print(' Election model:', Election.objects.count(), 'records')
print(' Candidate model:', Candidate.objects.count(), 'records')
print(' VoteRegistry model:', VoteRegistry.objects.count(), 'records')
print(' Vote model:', Vote.objects.count(), 'records')
"

# 9. VERIFICAR ANONIMATO
python manage.py dbshell -c "\d votes" | grep -q "user_id" && echo " ANONIMATO COMPROMETIDO" || echo "
Anonimato garantizado"

echo ""
echo "============================================"
echo "VALIDACIÓN FINAL COMPLETA"
echo "============================================"
RESULTADO ESPERADO:
System check: 0 issues
Tests: All passed
Register OK
Login OK
Elections OK

Candidates OK
manage.py exists
requirements.txt exists
.env.example exists
README_BACKEND.md exists
voting app exists
User model: X records
Election model: X records
Candidate model: X records
VoteRegistry model: X records
Vote model: X records
Anonimato garantizado

============================================
VALIDACIÓN FINAL COMPLETA
============================================
SECCIÓN 8.7: Documentación de Progreso Final
ACCIÓN:
Actualizar archivo: DESARROLLO_BACKEND_INSTRUCCIONES.md
AGREGAR AL FINAL:
---

## TABLA DE CONTROL DE AVANCES - ESTADO FINAL

| Fase | Nombre | Estado | Checkpoint | Validación | Timestamp |
|------|--------|--------|-----------|-----------|-----------|
| 1 | Setup y Configuración | COMPLETADO | All systems operational | Connection OK | [FECHA] |
| 2 | Modelos y Conexión BD | COMPLETADO | Models mapped | ORM functional | [FECHA] |
| 3 | Serializers y Auth | COMPLETADO | Auth system operational | JWT working | [FECHA] |
| 4 | Endpoints Core | COMPLETADO | Read endpoints working | Filters OK | [FECHA] |
| 5 | Lógica de Votación | COMPLETADO | Voting logic complete | Flow tested | [FECHA] |
| 6 | Admin y Gestión | COMPLETADO | Admin configured | Management ready | [FECHA] |
| 7 | Testing y Validación | COMPLETADO | All tests pass | System tested | [FECHA] |
| 8 | Documentación Final | COMPLETADO | Docs complete | Ready to deploy | [FECHA] |

**Métrica de Completitud Global: 100% **

---

## ENTREGABLES FINALES DEL BACKEND

### Archivos Creados:

- config/settings.py - Configuración completa
- config/urls.py - URLs raíz
- voting/models.py - 5 modelos (User, Election, Candidate, VoteRegistry, Vote)
- voting/serializers.py - 10 serializers
- voting/views.py - 12 vistas/endpoints
- voting/urls.py - Configuración de rutas
- voting/admin.py - Admin completo con acciones
- voting/tests.py - 10+ tests automatizados
- voting/api_docs.py - Documentación de endpoints
- manage.py - Django management
- requirements.txt - Dependencias
- .env.example - Plantilla de variables
- .gitignore - Archivos a ignorar
- README_BACKEND.md - Documentación completa

### Endpoints Implementados: **14 endpoints**

**Autenticación (4):**
- POST `/api/register/` - Registro
- POST `/api/login/` - Login
- GET `/api/profile/` - Perfil
- POST `/api/token/refresh/` - Refresh token

**Consulta (4):**
- GET `/api/elections/` - Listar elecciones
- GET `/api/elections/{id}/` - Detalle elección
- GET `/api/candidates/` - Listar candidatos
- GET `/api/candidates/{id}/` - Detalle candidato

**Votación (4):**
- POST `/api/vote/` - Emitir voto
- GET `/api/has-voted/{id}/` - Verificar voto
- GET `/api/results/{id}/` - Resultados
- GET `/api/history/` - Historial

**Admin (2):**
- GET `/admin/` - Panel administrativo
- Acciones: Activar/Cerrar elecciones

### Funcionalidades Implementadas:

**Requisitos Funcionales:**
- Registro e inicio de sesión
- Votación por candidatos
- Resultados en tiempo real
- Gestión administrativa
- Historial de votaciones

**Requisitos No Funcionales:**
- API REST completa
- Autenticación JWT segura
- Validaciones de lógica de negocio
- Código modular
- Tests automatizados
- Documentación completa

**Características Especiales:**
- Anonimato garantizado (arquitectura de 2 tablas)
- Prevención de doble voto (constraint único)
- Validaciones temporales (periodo de votación)
- Resultados en tiempo real (queries agregadas)
- Filtros en endpoints (status, election_id)
- Admin con acciones masivas

---

## ESTADO FINAL: BACKEND 100% COMPLETO

╔══════════════════════════════════════════════════╗
║ ║
║ BACKEND DEVELOPMENT: COMPLETADO AL 100% ║
║ ║
║ Fases Completadas: 8/8 ║
║ Archivos Creados: 14+ ║
║ Endpoints: 14 ║
║ Tests: 10+ (All Passing) ║
║ Documentación: Completa ║
║ Seguridad: JWT + Anonimato ║
║ Sin Deuda Técnica ║
║ ║
║ READY FOR FRONTEND INTEGRATION ║
║ ║
╚══════════════════════════════════════════════════╝

---

## INSTRUCCIONES PARA RETOMAR SI SE INTERRUMPE

Si el desarrollo se interrumpe, retomar desde:

1. **Verificar última fase completada:** Revisar tabla de control arriba
2. **Validar integridad:**
`python manage.py check`
`python manage.py test`
3. **Continuar desde siguiente sección no completada**
4. **Actualizar tabla de control al completar cada sección**

---

## PRÓXIMO PASO: FRONTEND

Con el backend 100% completo y validado, proceder a:

**PLAN C: FRONTEND (Next.js + React + Material UI)**

El backend proporciona:
- API REST documentada
- Endpoints probados
- Autenticación JWT funcional
- Base de datos con datos de prueba
- Lógica de negocio validada

El frontend solo necesitará:
1. Consumir endpoints (axios)
2. Gestionar tokens JWT (localStorage)
3. Renderizar datos en UI
4. Formularios de interacción

**El éxito del backend garantiza simplicidad en el frontend.**

---

## FIRMA DE COMPLETITUD

**Backend Development Status:** **APPROVED**
**Quality Assurance:** **PASSED**

**Ready for Production:** **YES**
**Documentation:** **COMPLETE**
**Testing:** **ALL TESTS PASSING**

**Desarrollado siguiendo:**
- Filosofía de cero sobre-ingeniería
- Máxima eficiencia
- 100% de levantamiento de requerimientos
- Desarrollo sistemático y gradual
- Validación constante
- Sin deuda técnica

---

**Timestamp Final:** [COMPLETAR AL FINALIZAR]
**Duración Total:** [CALCULAR]
**Líneas de Código:** ~1500+
**Calidad:**

═══════════════════════════════════════════════════
FIN DEL DESARROLLO BACKEND
═══════════════════════════════════════════════════
CHECKPOINT FASE 8 COMPLETADO
CHECKLIST:
• README_BACKEND.md completo y detallado
• Documentación de API creada
• requirements.txt actualizado
• .env.example completo
• Commit final de Git realizado
• Validación final ejecutada exitosamente
• Tabla de control actualizada al 100%
• Documentación de progreso completada
ACTUALIZAR TABLA DE CONTROL:
Fase 8: COMPLETADO | Checkpoint: Docs complete | Validación: Ready to deploy
Métrica: 100% completado (8/8 fases)

INFORMACIÓN PARA EL PROMPT INICIAL AL AGENTE
DATOS QUE DEBES PROPORCIONAR ANTES DE INICIAR:
Copia y pega esto al inicio del chat con el agente IA, completando los valores:
# ═══════════════════════════════════════════════════
# DATOS INICIALES PARA DESARROLLO BACKEND
# ═══════════════════════════════════════════════════

CONTEXTO_PROYECTO:
nombre: "app-votar"
tipo: "Sistema de Votaciones en Línea"
stack: "Django + DRF + PostgreSQL (Supabase)"
objetivo: "Desarrollar backend completo al 100%"

ENTORNO_DESARROLLO:
sistema_operativo: "[TU_SO: Windows/Linux/macOS]"
python_version: "[RESULTADO DE: python --version]"
directorio_trabajo: "[RUTA COMPLETA A: /tu/ruta/app-votar]"
editor: "[TU EDITOR: VSCode/PyCharm/etc]"

CREDENCIALES_SUPABASE:
# Obtener de archivo credenciales.md
host: "[db.xxxxxxxxxxxxx.supabase.co]"
database: "postgres"
user: "postgres"
password: "[TU_PASSWORD_SUPABASE]"
port: "5432"

REPOSITORIO_GIT:
usar_github: "[Si/No]"
url_repositorio: "[https://github.com/usuario/repo o 'N/A']"
rama_principal: "[main o master]"

CONFIGURACION_INICIAL:
crear_superusuario: "Si"
email_admin: "[admin@votaciones.com o tu preferencia]"
password_admin: "[TU_PASSWORD_SEGURO]"
puerto_desarrollo: "8000"

ARCHIVOS_EXISTENTES:
# Confirmar que existen
- CASO_PROYECTO.md: "Si"
- PLAN_DE_DESARROLLO.md: "[Si/No]"
- credenciales.md: "[Si/No]"
- DESARROLLO_BACKEND_INSTRUCCIONES.md: "[Si - este documento]"

INSTRUCCIONES_ESPECIALES:
nivel_detalle_logs: "Alto"
pausar_en_errores: "Si"
validar_cada_paso: "Si"
actualizar_progreso: "Si"

modo_verbose: "Si"
PROMPT INICIAL PARA EL AGENTE IA
Copia esto completo (después de completar los DATOS arriba):
Vas a desarrollar el BACKEND COMPLETO de un sistema de votaciones siguiendo el documento
DESARROLLO_BACKEND_INSTRUCCIONES.md.

COMENZAR DESARROLLO:

Inicia desde FASE 1: Setup y Configuración Inicial, siguiendo cada SECCIÓN en orden. Confirma antes de comenzar que:

Tienes acceso a todos los archivos mencionados
Python está instalado y funcional
Credenciales de Supabase están disponibles
Entiendes que debes seguir el documento paso a paso

CONFIRMA LECTURA DE ESTAS INSTRUCCIONES Y LUEGO PROCEDE CON **FASE 1 - SECCIÓN 1.1**.
MÉTRICAS FINALES DEL DOCUMENTO
Documento: DESARROLLO_BACKEND_INSTRUCCIONES.MD
Estadísticas:
• Fases: 8
• Secciones totales: ~40
• Líneas de código proporcionadas: ~1500+
• Scripts de validación: 15+
• Archivos a crear: 14
• Endpoints a implementar: 14
• Tests a escribir: 10+
• Comandos de terminal: 100+
Tiempo estimado de desarrollo:
• Con IA agente: 4-6 horas
• Manual: 20-30 horas

Nivel de detalle: (Máximo)
Claridad: (Máximo)
Completitud: 100%
DOCUMENTO COMPLETO Y LISTO
El documento DESARROLLO_BACKEND_INSTRUCCIONES.MD está ahora:
• 100% completo
• Sistemático y secuencial
• Con validaciones en cada paso
• Sin ambigüedades
• Optimizado para agente IA
• Con recuperación de interrupciones
• Con métricas de progreso
• Documentación incluida
• Listo para uso inmediato
Puedes copiar TODO este contenido (desde el inicio que te proporcioné hasta aquí) al
archivo DESARROLLO_BACKEND_INSTRUCCIONES.MD y proporcionar el PROMPT INICIAL con los DATOS
completados a tu agente IA.
El agente tendrá todo lo necesario para desarrollar el backend completo sin necesidad de hacerte preguntas.
¡Backend listo para ser desarrollado!