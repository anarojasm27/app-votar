ESTRATEGIA APROBADA: DESARROLLO SECUENCIAL EN 3 PLANES
Se procederá con 3 PLANES INDEPENDIENTES Y SECUENCIALES:
1. PLAN A - BASE DE DATOS (Supabase al 100%)
2. PLAN B - BACKEND (Django + DRF al 100%)
3. PLAN C - FRONTEND (Next.js + React al 100%)
Cada plan es completo, autosuficiente y verificable antes de pasar al siguiente.

PLAN A: BASE DE DATOS (SUPABASE)
Fundamento del Sistema de Votaciones
OBJETIVO DEL PLAN A
Diseñar, crear y validar la estructura completa de base de datos en Supabase, poblada con datos de prueba funcionales,
lista para ser consumida por el backend.
PASO A1: Configuración de cuenta y proyecto en Supabase
Objetivo: Establecer ambiente de base de datos en la nube.
Acciones:
• Crear cuenta en Supabase (https://supabase.com).
• Crear nuevo proyecto.
• Asignar nombre descriptivo al proyecto.
• Seleccionar región más cercana.
• Establecer contraseña segura de base de datos.
• Esperar a que proyecto se aprovisione completamente.
Verificación: Dashboard de Supabase accesible y proyecto activo.
INSTRUCCIÓN:
Crear cuenta en Supabase y aprovisionar proyecto PostgreSQL. Supabase proporciona PostgreSQL gestionado en la nube,
eliminando necesidad de instalación local. Seleccionar región geográfica cercana para mejor latencia. La contraseña de
base de datos será necesaria para conexión desde Django posteriormente. Anotar credenciales en lugar seguro (no en
repositorio). Dashboard muestra estado "Active" cuando está listo.
PASO A2: Familiarización con interfaz de Supabase
Objetivo: Comprender herramientas disponibles en Supabase.
Acciones:
• Explorar sección "Table Editor" (donde se crearán tablas).
• Explorar sección "SQL Editor" (para ejecutar queries directos).
• Explorar sección "Database" → "Roles" (permisos).
• Localizar credenciales de conexión en Settings → Database.
• Copiar y guardar: Host, Database name, Port, User, Password, Connection String.
Verificación: Credenciales de conexión anotadas y accesibles.
INSTRUCCIÓN:
Familiarizarse con interfaz de Supabase antes de crear tablas. Table Editor permite crear tablas visualmente. SQL Editor
permite ejecutar SQL directamente. En Settings → Database se encuentran credenciales necesarias para conectar Django:
Connection String (URI completa), host, port, database name, user, password. Guardar esta información en archivo local
seguro (será usada en PLAN B). Esta exploración previa agiliza pasos siguientes.
PASO A3: Diseño del esquema de base de datos
Objetivo: Definir estructura completa de tablas y relaciones.
Acciones:
• Diseñar tabla de usuarios con campos necesarios.
• Diseñar tabla de elecciones con campos y estados.
• Diseñar tabla de candidatos relacionada con elecciones.

• Diseñar tabla de votos (anónimos).
• Diseñar tabla de registro de votación (control de "ya votó").
• Definir tipos de datos para cada campo.
• Definir relaciones (Foreign Keys).
• Definir constraints (unique, not null).
• Crear diagrama o documento con diseño completo.
Verificación: Diseño documentado con todas las tablas, campos, tipos y relaciones.
INSTRUCCIÓN:
Diseñar esquema completo de base de datos antes de crear tablas. Identificar 5 tablas principales: (1) Users - información
de usuarios incluyendo rol, (2) Elections - elecciones con título, descripción, fechas inicio/fin, estado, (3) Candidates -
candidatos vinculados a elección con nombre, descripción, foto, (4) Votes - votos emitidos vinculados a election_id y
candidate_id pero SIN user_id para anonimato, (5) VoteRegistry - tabla de control que registra user_id + election_id +
has_voted para prevenir doble voto. Definir tipos de datos apropiados (text, integer, timestamp, boolean). Documentar
relaciones: Candidate → Election (many-to-one), Vote → Election (many-to-one), Vote → Candidate (many-to-one),
VoteRegistry → User (many-to-one), VoteRegistry → Election (many-to-one). Este diseño es crítico para integridad del
sistema.
PASO A4: Creación de tabla Users
Objetivo: Crear tabla de usuarios del sistema.
Acciones:
• Acceder a Table Editor en Supabase.
• Crear nueva tabla llamada "users".
• Agregar columna id (uuid, primary key, auto-generado).
• Agregar columna email (text, unique, not null).
• Agregar columna password (text, not null) [será hash desde Django].
• Agregar columna full_name (text, not null).
• Agregar columna role (text, default 'voter') [valores: 'voter', 'admin'].
• Agregar columna is_active (boolean, default true).
• Agregar columna created_at (timestamp, default now()).
• Habilitar Row Level Security (RLS) si se desea.
Verificación: Tabla "users" visible en Table Editor con todas las columnas.
INSTRUCCIÓN:
Crear tabla de usuarios usando interfaz visual de Supabase. En Table Editor, hacer clic en "New table". Nombre: "users".
Agregar columnas una por una definiendo tipo de dato y constraints. Campo id como UUID permite identificadores únicos
universales. Campo email debe ser único para prevenir duplicados. Campo password almacenará hash (Django lo
generará). Campo role diferencia votantes de administradores. Campo created_at registra fecha de registro. Supabase
puede agregar automáticamente id y created_at al crear tabla. Desactivar RLS temporalmente para facilitar desarrollo (o
configurar políticas apropiadas).
PASO A5: Creación de tabla Elections
Objetivo: Crear tabla de elecciones/votaciones.
Acciones:
• Crear nueva tabla llamada "elections".
• Agregar columna id (uuid, primary key).
• Agregar columna title (text, not null).
• Agregar columna description (text).
• Agregar columna start_date (timestamp, not null).
• Agregar columna end_date (timestamp, not null).
• Agregar columna status (text, default 'draft') [valores: 'draft', 'active', 'closed'].
• Agregar columna results_public (boolean, default true).

• Agregar columna created_at (timestamp, default now()).
Verificación: Tabla "elections" creada con estructura correcta.
INSTRUCCIÓN:
Crear tabla que almacena elecciones. Cada registro representa un proceso de votación independiente. Campo title es
nombre de la elección (ej: "Elección de Personero 2024"). Campo description proporciona detalles adicionales. Campos
start_date y end_date definen periodo de votación (solo votos entre estas fechas son válidos). Campo status controla
estado de elección: "draft" (en preparación, no se puede votar), "active" (votación abierta), "closed" (finalizada). Campo
results_public define si resultados son visibles o solo para admins. Esta tabla es núcleo del sistema multi-elección.
PASO A6: Creación de tabla Candidates
Objetivo: Crear tabla de candidatos vinculados a elecciones.
Acciones:
• Crear nueva tabla llamada "candidates".
• Agregar columna id (uuid, primary key).
• Agregar columna election_id (uuid, foreign key → elections.id, not null).
• Agregar columna name (text, not null).
• Agregar columna description (text).
• Agregar columna photo_url (text) [URL de imagen].
• Agregar columna party_group (text) [opcional, partido o grupo].
• Agregar columna display_order (integer, default 0).
• Configurar ON DELETE CASCADE en foreign key.
Verificación: Tabla "candidates" creada con relación a "elections".
INSTRUCCIÓN:
Crear tabla de candidatos. Cada candidato pertenece a una elección específica (relación many-to-one). Campo election_id
es foreign key que vincula candidato con elección. Configurar ON DELETE CASCADE para que al eliminar elección se
eliminen sus candidatos automáticamente. Campo name es nombre del candidato. Campo description puede contener
propuestas o biografía. Campo photo_url almacena URL de imagen (imagen se subirá a Supabase Storage o servicio
externo posteriormente). Campo party_group es opcional para identificar partido político o grupo que representa. Campo
display_order permite ordenar candidatos en interfaz.
PASO A7: Creación de tabla VoteRegistry
Objetivo: Crear tabla de control de votación (quién ya votó).
Acciones:
• Crear nueva tabla llamada "vote_registry".
• Agregar columna id (uuid, primary key).
• Agregar columna user_id (uuid, foreign key → users.id, not null).
• Agregar columna election_id (uuid, foreign key → elections.id, not null).
• Agregar columna has_voted (boolean, default false).
• Agregar columna voted_at (timestamp, nullable).
• Crear constraint UNIQUE en combinación (user_id, election_id).
• Configurar ON DELETE CASCADE en foreign keys.
Verificación: Tabla "vote_registry" creada con constraint único.
INSTRUCCIÓN:
Crear tabla de control que registra si un usuario votó en una elección. Esta tabla permite verificar "ya votó" sin revelar por
quién votó (anonimato). Constraint UNIQUE en (user_id, election_id) asegura que no pueda haber dos registros del mismo
usuario para la misma elección. Campo has_voted se marca como true al emitir voto. Campo voted_at registra timestamp
del voto. Esta tabla es crítica para prevención de doble voto. Al crear, se puede generar automáticamente un registro con
has_voted=false para cada combinación user-election, o crearlos dinámicamente desde Django.
PASO A8: Creación de tabla Votes
Objetivo: Crear tabla de votos emitidos (anónimos).
Acciones:

• Crear nueva tabla llamada "votes".
• Agregar columna id (uuid, primary key).
• Agregar columna election_id (uuid, foreign key → elections.id, not null).
• Agregar columna candidate_id (uuid, foreign key → candidates.id, not null).
• Agregar columna cast_at (timestamp, default now()).
• NO agregar user_id (mantener anonimato).
• Configurar ON DELETE CASCADE en foreign keys.
Verificación: Tabla "votes" creada SIN campo user_id.
INSTRUCCIÓN:
Crear tabla que almacena votos emitidos. Esta es la tabla crítica para anonimato: contiene election_id y candidate_id pero
deliberadamente NO contiene user_id. Esto hace imposible rastrear quién votó por quién consultando esta tabla. Campo
cast_at registra timestamp del voto. La separación entre VoteRegistry (quién votó) y Votes (votos anónimos) garantiza
anonimato mientras permite control de doble votación. Configurar ON DELETE CASCADE para que votos se eliminen si se
elimina elección o candidato.
PASO A9: Validación de relaciones y constraints
Objetivo: Verificar integridad referencial del esquema.
Acciones:
• Verificar foreign keys creadas correctamente en Database → Schema.
• Verificar que ON DELETE CASCADE esté configurado.
• Verificar constraint UNIQUE en vote_registry (user_id, election_id).
• Revisar tipos de datos de todas las columnas.
• Verificar que campos NOT NULL estén correctamente marcados.
• Ejecutar query de prueba para verificar estructura.
Verificación: Todas las relaciones y constraints están correctamente configuradas.
INSTRUCCIÓN:
Validar que el esquema esté correctamente configurado antes de poblar datos. En Supabase, ir a Database → Schema para
ver representación visual de tablas y relaciones. Verificar que flechas muestren foreign keys correctamente. Ejecutar
consulta SQL en SQL Editor para confirmar estructura: SELECT table_name, column_name, data_type FROM
information_schema.columns WHERE table_schema = 'public' ORDER BY table_name;. Revisar constraints con query
específico. Asegurar que todo esté como se diseñó en PASO A3. Corregir cualquier discrepancia ahora antes de poblar
datos.
PASO A10: Población de datos de prueba - Usuarios
Objetivo: Crear usuarios de prueba en la base de datos.
Acciones:
• Acceder a Table Editor → users.
• Crear usuario administrador de prueba.
• Crear 5-10 usuarios votantes de prueba.
• Usar emails de prueba (ej: admin@test.com, voter1@test.com).
• Usar password temporal (ej: "password123") [será reemplazado por hash desde Django].
• Asignar role='admin' al administrador, role='voter' a votantes.
• Marcar is_active=true para todos.
Verificación: Tabla users contiene al menos 1 admin y 5 voters.
INSTRUCCIÓN:
Poblar tabla de usuarios con datos de prueba. Usar Table Editor para insertar filas manualmente o SQL Editor para insert
masivo. Crear un usuario administrador (email: admin@test.com, role: admin) y varios votantes
(voter1@test.com, voter2@test.com, etc.). Passwords en este punto pueden ser texto plano temporal ya que Django los
convertirá a hash. Estos usuarios permitirán probar funcionalidades en desarrollo del backend. Asegurar que emails sean
únicos. Anotar credenciales de usuarios de prueba para uso posterior.
PASO A11: Población de datos de prueba - Elecciones

Objetivo: Crear elecciones de prueba.
Acciones:
• Crear elección activa de prueba.
o Configurar título descriptivo.
o Establecer start_date en pasado cercano.
o Establecer end_date en futuro cercano.
o Establecer status='active'.
• Crear elección cerrada de prueba (para historial).
o Establecer status='closed' y end_date en pasado.
• Crear elección en borrador de prueba.
o Establecer status='draft'.

Verificación: Tabla elections contiene al menos 3 elecciones con diferentes estados.
INSTRUCCIÓN:
Poblar tabla de elecciones con diferentes escenarios de prueba. Crear al menos: (1) Elección activa con start_date hace 1
día y end_date dentro de 7 días, status='active' - esta será usada para probar votación, (2) Elección cerrada con ambas
fechas en pasado, status='closed' - para probar historial, (3) Elección borrador con status='draft' - para probar que no
permita votar. Usar Table Editor para crear manualmente. Títulos ejemplo: "Elección de Representante Estudiantil 2024",
"Personero Escolar 2024", "Encuesta de Preferencias". Estos datos permiten probar diferentes flujos.
PASO A12: Población de datos de prueba - Candidatos
Objetivo: Crear candidatos para elecciones de prueba.
Acciones:
• Para la elección activa, crear 3-5 candidatos.
• Asignar nombres descriptivos.
• Agregar descripciones breves.
• Dejar photo_url vacío o usar URL de placeholder.
• Asignar display_order secuencial (1, 2, 3...).
• Para elección cerrada, crear 2-3 candidatos.
• Vincular correctamente con election_id.
Verificación: Cada elección tiene al menos 2 candidatos vinculados.
INSTRUCCIÓN:
Poblar tabla de candidatos vinculándolos a elecciones. Para la elección activa creada en PASO A11, crear 3-5 candidatos.
Obtener el ID de la elección desde Table Editor. Crear candidatos asignando ese ID al campo election_id. Nombres
ejemplo: "Juan Pérez", "María González", "Carlos Rodríguez". Descripciones cortas. Para photo_url puede usarse servicio
de placeholders como https://ui-avatars.com/api/?name=Juan+Perez o dejar vacío. Campo display_order controla orden
de aparición (1, 2, 3...). Repetir para otras elecciones. Estos candidatos serán votados en pruebas de backend.
PASO A13: Población de datos de prueba - Registros de votación
Objetivo: Crear registros de control de votación.
Acciones:
• Para elección activa, crear registros en vote_registry.
• Vincular algunos usuarios con has_voted=true (ya votaron).
• Vincular otros usuarios con has_voted=false (aún no votan).
• Asegurar combinación única de user_id + election_id.
• Dejar voted_at=null para quienes no han votado.
• Establecer voted_at con timestamp para quienes sí votaron.
Verificación: vote_registry tiene registros variados (algunos votaron, otros no).
INSTRUCCIÓN:
Poblar tabla vote_registry para simular diferentes estados de usuarios. Obtener IDs de usuarios y de elección activa. Crear
registros que vinculen user_id con election_id. Algunos con has_voted=true y voted_at con timestamp (simulan que ya

votaron), otros con has_voted=false y voted_at=null (pueden votar aún). Esto permite probar validación de "ya votó" en
backend. Asegurar que no haya registros duplicados de misma combinación user-election (violará constraint). Crear al
menos 3 registros con has_voted=true y 3 con has_voted=false.
PASO A14: Población de datos de prueba - Votos
Objetivo: Crear votos emitidos (anónimos) que correspondan a registros de votación.
Acciones:
• Para registros en vote_registry con has_voted=true, crear votos correspondientes en tabla votes.
• Asignar election_id correcto.
• Asignar candidate_id de candidatos existentes.
• NO incluir información de usuario.
• Establecer cast_at coherente con voted_at de vote_registry.
• Crear varios votos para diferentes candidatos (distribuir).
Verificación: Cantidad de votos en tabla votes coincide con registros has_voted=true en vote_registry.
INSTRUCCIÓN:
Poblar tabla de votos de forma coherente con vote_registry. Si en vote_registry hay 3 usuarios que votaron
(has_voted=true), debe haber 3 registros en tabla votes. Obtener IDs de elección activa y sus candidatos. Crear registros en
votes asignando election_id y distribuyendo candidate_id entre candidatos (ej: 2 votos para candidato A, 1 voto para
candidato B). Campo cast_at debe ser timestamp coherente. NO agregar user_id (mantener anonimato). Esta coherencia
es importante: vote_registry dice "3 personas votaron" y votes debe tener exactamente 3 registros para esa elección.
Validar conteos.
PASO A15: Validación de integridad de datos
Objetivo: Verificar coherencia y correctitud de datos poblados.
Acciones:
• Ejecutar query para contar usuarios: SELECT COUNT(*) FROM users;
• Ejecutar query para contar elecciones por estado: SELECT status, COUNT(*) FROM elections GROUP BY status;
• Ejecutar query para contar candidatos por elección: SELECT election_id, COUNT(*) FROM candidates GROUP BY
election_id;
• Ejecutar query para validar coherencia de votos: SELECT e.title, COUNT(v.id) as total_votes FROM elections e LEFT
JOIN votes v ON e.id = v.election_id GROUP BY e.id, e.title;
• Validar que votos en tabla votes coincidan con has_voted=true en vote_registry.
• Verificar que no haya registros huérfanos (foreign keys rotas).
Verificación: Todas las queries retornan resultados coherentes sin inconsistencias.
INSTRUCCIÓN:
Validar integridad de datos poblados ejecutando queries de verificación en SQL Editor. Confirmar que hay usuarios creados
(al menos 6). Confirmar que hay elecciones en diferentes estados. Confirmar que cada elección tiene candidatos.
Crucialmente, validar coherencia entre vote_registry y votes: ejecutar SELECT COUNT(*) FROM vote_registry WHERE
has_voted=true AND election_id='[ID_ELECCION_ACTIVA]' y comparar con SELECT COUNT(*) FROM votes WHERE
election_id='[ID_ELECCION_ACTIVA]' - deben ser iguales. Si hay discrepancias, corregir datos. Esta validación asegura que
base de datos está consistente antes de conectar backend.
PASO A16: Pruebas de consultas complejas
Objetivo: Validar que queries necesarias para el sistema funcionen correctamente.
Acciones:
• Ejecutar query de resultados de elección: SELECT c.name, COUNT(v.id) as votes FROM candidates c LEFT JOIN
votes v ON c.id = v.candidate_id WHERE c.election_id='[ID]' GROUP BY c.id, c.name ORDER BY votes DESC;
• Ejecutar query de verificación de usuario votó: SELECT has_voted FROM vote_registry WHERE user_id='[USER_ID]'
AND election_id='[ELECTION_ID]';
• Ejecutar query de elecciones activas: SELECT * FROM elections WHERE status='active' AND start_date <= NOW()
AND end_date >= NOW();
• Validar que todas retornen resultados esperados.
Verificación: Queries retornan datos correctos que serán consumidos por backend.

INSTRUCCIÓN:
Probar queries que el backend ejecutará para validar que estructura de datos las soporta. Query de resultados debe
devolver nombre de cada candidato con su conteo de votos, incluyendo 0 para candidatos sin votos (LEFT JOIN). Query de
verificación debe retornar booleano indicando si usuario votó. Query de elecciones activas debe filtrar por estado y rango
de fechas. Ejecutar en SQL Editor reemplazando IDs de prueba. Si alguna query falla o no retorna lo esperado, revisar
estructura de tablas o datos. Estas queries serán traducidas a ORM de Django en backend.
PASO A17: Documentación de esquema de base de datos
Objetivo: Documentar estructura completa para referencia futura.
Acciones:
• Crear documento con lista de todas las tablas.
• Documentar cada tabla con sus columnas, tipos, constraints.
• Documentar relaciones entre tablas.
• Documentar datos de prueba creados (usuarios, elecciones).
• Crear diagrama ER si es posible (puede usar herramienta online).
• Guardar credenciales de conexión de forma segura.
Verificación: Documento de esquema completo y accesible.
INSTRUCCIÓN:
Crear documentación del esquema de base de datos para referencia durante desarrollo de backend. Documento debe
listar: (1) Tabla users con columnas y tipos, (2) Tabla elections con columnas y tipos, (3) Tabla candidates con columnas y
tipos, (4) Tabla vote_registry con columnas y tipos, (5) Tabla votes con columnas y tipos, (6) Relaciones:
candidates.election_id → elections.id, votes.election_id → elections.id, votes.candidate_id → candidates.id,
vote_registry.user_id → users.id, vote_registry.election_id → elections.id. Incluir sección con credenciales de conexión
(host, database, user, password, connection string). Esta documentación será esencial en PLAN B.
PASO A18: Exportación de esquema SQL (backup)
Objetivo: Crear backup del esquema y datos para recuperación.
Acciones:
• Acceder a Database → Backups en Supabase.
• Configurar backup automático si está disponible.
• Alternativamente, usar SQL Editor para exportar esquema.
• Ejecutar pg_dump si se tiene acceso directo.
• Guardar archivo SQL localmente.
• Guardar en repositorio Git (sin credenciales sensibles).
Verificación: Archivo SQL de backup existe y contiene estructura y datos.
INSTRUCCIÓN:
Crear backup del esquema y datos de base de datos. Supabase puede tener opciones de backup en dashboard. Si no, usar
SQL Editor para ejecutar comandos de exportación o herramientas externas como pg_dump conectándose con
credenciales. Guardar archivo .sql con estructura de tablas (CREATE TABLE) y datos (INSERT). Este backup permite recrear
base de datos si algo falla o migrar a otro servidor. Guardar en repositorio Git en directorio /database/schema.sql pero
asegurar que no contenga credenciales sensibles. Backup es buena práctica profesional.
PASO A19: Configuración de políticas RLS (opcional avanzado)
Objetivo: Configurar seguridad a nivel de fila si se requiere.
Acciones:
• Evaluar si Row Level Security es necesario para el proyecto.
• Si no: desactivar RLS en todas las tablas (más simple).
• Si sí: configurar políticas básicas de lectura/escritura.
• Permitir acceso completo desde backend (Django se encargará de seguridad).
• Documentar decisión tomada.
Verificación: RLS configurado según decisión (activado o desactivado conscientemente).
INSTRUCCIÓN:
Evaluar necesidad de Row Level Security (RLS) de Supabase. RLS permite definir quién puede ver/editar qué filas

directamente en base de datos. Para este proyecto académico donde Django manejará toda la lógica de autenticación y
autorización, RLS puede desactivarse para simplificar. Si se desactiva, ir a cada tabla en Table Editor → Settings → Disable
RLS. Si se decide activar, configurar políticas que permitan acceso completo desde service_role (que usará Django) pero
restrinjan acceso directo desde anon key. Para eficiencia, se recomienda DESACTIVAR RLS y manejar seguridad en Django.
PASO A20: Validación final y preparación para integración con Backend
Objetivo: Confirmar que base de datos está 100% lista para ser consumida.
Acciones:
• Revisar checklist: todas las tablas creadas, todas las relaciones configuradas, datos de prueba poblados.
• Ejecutar suite de queries de validación nuevamente.
• Verificar que credenciales de conexión estén documentadas.
• Confirmar que Supabase está accesible desde internet (no bloqueado).
• Realizar conexión de prueba desde herramienta externa (TablePlus, pgAdmin) usando credenciales.
• Marcar PLAN A como completado.
Verificación: Base de datos completamente funcional y validada.
INSTRUCCIÓN:
Realizar validación final integral de base de datos. Revisar que las 5 tablas estén creadas: users, elections, candidates,
vote_registry, votes. Verificar que relaciones (foreign keys) estén configuradas. Confirmar que datos de prueba existan: al
menos 1 admin, 5 voters, 3 elecciones, candidatos para cada elección, registros en vote_registry, votos en votes. Probar
conexión externa usando credenciales de Supabase en herramienta como DBeaver o TablePlus para confirmar
accesibilidad. Si todo es correcto, PLAN A está completado. Base de datos sólida y lista para que Django se conecte en
PLAN B.

ENTREGABLE DEL PLAN A
Al finalizar este plan se debe tener:
• Proyecto Supabase configurado y activo
• 5 tablas creadas con estructura correcta
• Relaciones (foreign keys) configuradas
• Constraints (unique, not null) aplicados
• Datos de prueba poblados coherentemente
• Queries de validación ejecutadas exitosamente
• Documentación de esquema creada
• Credenciales de conexión guardadas de forma segura
• Base de datos 100% lista para integración con backend

PLAN B: BACKEND (DJANGO + DRF)
API REST Completa y Funcional
OBJETIVO DEL PLAN B
Desarrollar, probar y desplegar API REST completa en Django que consuma la base de datos de Supabase, proporcionando
endpoints seguros y documentados para todas las funcionalidades del sistema.
PASO B1: Preparación del entorno de desarrollo
Objetivo: Configurar ambiente local para desarrollo de Django.
Acciones:
• Verificar instalación de Python 3.10+ con python --version.
• Verificar instalación de pip con pip --version.
• Instalar virtualenv si no está instalado: pip install virtualenv.
• Crear directorio del proyecto: mkdir voting-system && cd voting-system.

• Inicializar Git: git init.
• Crear .gitignore para Python.
Verificación: Comandos de Python y Git funcionan correctamente.
INSTRUCCIÓN:
Preparar entorno de desarrollo local antes de crear proyecto Django. Verificar que Python 3.10 o superior esté instalado
ejecutando comando de versión. pip debe estar disponible para instalar paquetes. Si virtualenv no está instalado, instalarlo
globalmente. Crear directorio raíz del proyecto donde residirá código de backend. Inicializar repositorio Git para control de
versiones. Crear archivo .gitignore con templates para Python descargable
de https://github.com/github/gitignore/blob/main/Python.gitignore para evitar subir archivos innecesarios. Este setup es
base para desarrollo ordenado.
PASO B2: Creación de entorno virtual
Objetivo: Crear ambiente aislado para dependencias de Python.
Acciones:
• Crear entorno virtual: python -m venv venv.
• Activar entorno virtual (Windows: venv\Scripts\activate, Linux/Mac: source venv/bin/activate).
• Verificar activación (prompt debe mostrar (venv)).
• Actualizar pip: pip install --upgrade pip.
Verificación: Prompt muestra (venv) indicando entorno activo.
INSTRUCCIÓN:
Crear entorno virtual de Python para aislar dependencias del proyecto. Ejecutar comando de creación en directorio raíz del
proyecto. Entorno virtual crea directorio venv/ que contendrá instalaciones de paquetes específicas del proyecto. Activar
entorno virtual ejecutando script de activación según sistema operativo. Una vez activo, prompt de terminal mostrará
(venv) al inicio. Actualizar pip a última versión. Todas las instalaciones de paquetes subsiguientes ocurrirán dentro de este
entorno aislado, no afectando Python global del sistema.
PASO B3: Instalación de Django y dependencias base
Objetivo: Instalar framework y librerías necesarias.
Acciones:
• Instalar Django: pip install django==4.2.
• Instalar Django REST Framework: pip install djangorestframework.
• Instalar psycopg2 para PostgreSQL: pip install psycopg2-binary.
• Instalar python-decouple para variables de entorno: pip install python-decouple.
• Instalar django-cors-headers: pip install django-cors-headers.
• Crear archivo requirements.txt: pip freeze > requirements.txt.
Verificación: Archivo requirements.txt contiene todas las dependencias listadas.
INSTRUCCIÓN:
Instalar Django 4.2 LTS y dependencias fundamentales. Django es el framework web principal. Django REST Framework
(DRF) facilita creación de APIs. psycopg2-binary permite conexión a PostgreSQL (Supabase). python-decouple permite leer
variables de entorno desde archivo .env. django-cors-headers maneja CORS para permitir peticiones desde frontend.
Ejecutar instalaciones una por una o crear requirements.txt preliminar e instalar con pip install -r requirements.txt. Generar
requirements.txt final con pip freeze para documentar versiones exactas instaladas. Este archivo será necesario para
deployment en Railway.
PASO B4: Creación del proyecto Django
Objetivo: Inicializar proyecto Django.
Acciones:
• Crear proyecto Django: django-admin startproject config ..
• Verificar estructura creada: config/, manage.py.
• Ejecutar servidor de prueba: python manage.py runserver.
• Acceder a http://127.0.0.1:8000/ en navegador.
• Detener servidor (Ctrl+C).
Verificación: Página de bienvenida de Django visible en navegador.

INSTRUCCIÓN:
Crear proyecto Django usando comando django-admin. Nombre config es convención para directorio de configuración del
proyecto (puede usarse otro nombre). Punto (.) al final indica crear en directorio actual. Estructura generada incluye:
config/settings.py (configuración), config/urls.py (rutas), manage.py (script de utilidades). Ejecutar servidor de desarrollo
para verificar instalación correcta. Django iniciará en puerto 8000. Navegador debe mostrar cohete de Django indicando
instalación exitosa. Detener servidor. Proyecto Django base está listo para configuración.
PASO B5: Creación de aplicación principal
Objetivo: Crear app Django que contendrá modelos y lógica de votación.
Acciones:
• Crear app: python manage.py startapp voting.
• Verificar estructura creada: voting/models.py, voting/views.py, etc.
• Registrar app en config/settings.py → INSTALLED_APPS agregando 'voting',.
Verificación: Directorio voting/ existe y app está en INSTALLED_APPS.
INSTRUCCIÓN:
Crear aplicación Django llamada "voting" que contendrá toda la lógica del sistema de votaciones. Django organiza
funcionalidad en "apps" modulares. Comando startapp genera estructura con models.py (modelos de base de datos),
views.py (vistas/endpoints), admin.py (configuración de admin), etc. Registrar app en INSTALLED_APPS de settings.py para
que Django la reconozca. Nombre "voting" es descriptivo para un sistema de votaciones. Toda la lógica de negocio residirá
en esta app.
PASO B6: Configuración de variables de entorno
Objetivo: Configurar manejo seguro de credenciales.
Acciones:
• Crear archivo .env en raíz del proyecto.
• Agregar .env a .gitignore.
• Agregar credenciales de Supabase al .env:
• DB_NAME=postgres
• DB_USER=postgres
• DB_PASSWORD=[password_de_supabase]
• DB_HOST=[host_de_supabase]
• DB_PORT=5432
• SECRET_KEY=[generar_key_segura]
• DEBUG=True
• Crear archivo .env.example con misma estructura pero sin valores reales.
Verificación: Archivo .env existe con credenciales, está en .gitignore, y .env.example documentado.
INSTRUCCIÓN:
Configurar variables de entorno para evitar hardcodear credenciales en código. Crear archivo .env en raíz del proyecto con
credenciales de Supabase obtenidas en PLAN A (host, database, user, password). Agregar SECRET_KEY de Django (puede
generarse con python -c 'from django.core.management.utils import get_random_secret_key;
print(get_random_secret_key())'). Establecer DEBUG=True para desarrollo. Agregar .env a .gitignore para nunca subirlo a
repositorio. Crear .env.example como plantilla documentando qué variables se necesitan pero sin valores reales. Esta
práctica es estándar de seguridad.
PASO B7: Configuración de conexión a Supabase
Objetivo: Conectar Django con base de datos PostgreSQL de Supabase.
Acciones:
• Abrir config/settings.py.
• Importar decouple al inicio: from decouple import config.
• Reemplazar configuración de DATABASES:
• DATABASES = {
• 'default': {

• 'ENGINE': 'django.db.backends.postgresql',
• 'NAME': config('DB_NAME'),
• 'USER': config('DB_USER'),
• 'PASSWORD': config('DB_PASSWORD'),
• 'HOST': config('DB_HOST'),
• 'PORT': config('DB_PORT'),
• }
• }
• Guardar archivo.
Verificación: Django puede leer variables de entorno sin errores.
INSTRUCCIÓN:
Configurar Django para conectarse a PostgreSQL de Supabase. En settings.py, modificar diccionario DATABASES
reemplazando configuración SQLite por defecto con PostgreSQL. Usar función config() de python-decouple para leer
valores desde .env. ENGINE debe ser 'django.db.backends.postgresql'. NAME, USER, PASSWORD, HOST, PORT se leen de
variables de entorno. Esta configuración permite que Django use Supabase como base de datos. Al ejecutar migraciones,
Django creará/leerá tablas en Supabase.
PASO B8: Verificación de conexión a base de datos
Objetivo: Confirmar que Django puede conectarse a Supabase.
Acciones:
• Ejecutar comando de verificación: python manage.py dbshell.
• Si se conecta, ejecutar \dt para ver tablas (debe mostrar tablas creadas en PLAN A).
• Salir con \q.
• Alternativamente ejecutar: python manage.py migrate --run-syncdb (aplicará migraciones por defecto de Django).
Verificación: Django se conecta exitosamente y puede ver tablas de Supabase.
INSTRUCCIÓN:
Validar conexión entre Django y Supabase antes de continuar. Comando dbshell abre shell interactivo de PostgreSQL
usando credenciales configuradas. Si conexión es exitosa, se abrirá prompt de postgres. Ejecutar \dt para listar tablas -
debe mostrar users, elections, candidates, votes, vote_registry creadas en PLAN A. Esto confirma que Django puede leer
base de datos. Ejecutar migrate creará tablas adicionales de Django (auth, sessions, admin) en Supabase. Si hay error de
conexión, revisar credenciales en .env y configuración de DATABASES.
PASO B9: Definición de modelos Django
Objetivo: Crear modelos que representen tablas existentes en Supabase.
Acciones:
• Abrir voting/models.py.
• Definir modelo User (extendiendo AbstractUser o usando modelo por defecto).
• Definir modelo Election.
• Definir modelo Candidate.
• Definir modelo VoteRegistry.
• Definir modelo Vote.
• Configurar Meta con managed = False y db_table = 'nombre_tabla' para usar tablas existentes.
• Importar modelos necesarios de Django.
Verificación: Modelos definidos sin errores de sintaxis.
INSTRUCCIÓN:
Crear modelos Django que mapeen a tablas existentes en Supabase. En models.py de app voting, definir clases para cada
tabla. Usar tipos de campo de Django que correspondan a tipos PostgreSQL (CharField, TextField, DateTimeField,
BooleanField, ForeignKey, UUIDField). Para usar tablas existentes sin que Django las gestione, configurar en Meta de cada
modelo: managed = False (Django no creará/modificará tabla) y db_table = 'nombre_tabla_en_supabase' (nombre exacto
de tabla). Ejemplo: modelo Election con campos title, description, start_date, end_date, status usando tipos apropiados.
Configurar relaciones con ForeignKey (Candidate → Election). Esta definición permite usar ORM de Django con tablas de
Supabase.

PASO B10: Inspección automática de modelos (alternativa)
Objetivo: Generar modelos automáticamente desde base de datos existente.
Acciones:
• Ejecutar comando de inspección: python manage.py inspectdb > voting/models_generated.py.
• Revisar archivo generado.
• Copiar modelos relevantes a voting/models.py.
• Ajustar nombres de modelos según convención (CamelCase).
• Configurar relaciones correctamente.
• Limpiar modelos generados eliminando código innecesario.
Verificación: Modelos generados coinciden con estructura de Supabase.
INSTRUCCIÓN:
Alternativamente a definir modelos manualmente (PASO B9), usar comando inspectdb que genera modelos
automáticamente inspeccionando base de datos. Django leerá esquema de Supabase y creará clases de modelo en
archivo models_generated.py. Revisar este archivo y copiar modelos a models.py oficial. inspectdb puede generar código
imperfecto (relaciones mal definidas, nombres genéricos) que requiere ajustes. Corregir nombres de modelos, tipos de
campos, y relaciones ForeignKey. Eliminar modelos de tablas de Django que no se necesitan (django_migrations, auth_*,
etc.). Esta opción ahorra tiempo pero requiere revisión cuidadosa.
PASO B11: Configuración de Django REST Framework
Objetivo: Configurar DRF para creación de APIs.
Acciones:
• Abrir config/settings.py.
• Agregar 'rest_framework' a INSTALLED_APPS.
• Agregar 'corsheaders' a INSTALLED_APPS.
• Agregar configuración de REST_FRAMEWORK:
• REST_FRAMEWORK = {
• 'DEFAULT_PERMISSION_CLASSES': [
• 'rest_framework.permissions.AllowAny',
• ],
• 'DEFAULT_AUTHENTICATION_CLASSES': [
• 'rest_framework.authentication.SessionAuthentication',
• ],
• }
• Configurar CORS agregando al principio de MIDDLEWARE: 'corsheaders.middleware.CorsMiddleware',.
• Agregar CORS_ALLOW_ALL_ORIGINS = True (temporal para desarrollo).
Verificación: Servidor inicia sin errores con nueva configuración.
INSTRUCCIÓN:
Configurar Django REST Framework y CORS para desarrollo de API. Agregar rest_framework y corsheaders a
INSTALLED_APPS. Configurar diccionario REST_FRAMEWORK con permisos y autenticación por defecto. AllowAny permite
acceso sin autenticación (será refinado por endpoint). SessionAuthentication permite usar sesiones de Django. Agregar
CorsMiddleware al inicio de MIDDLEWARE para interceptar requests y agregar headers CORS.
CORS_ALLOW_ALL_ORIGINS=True permite peticiones desde cualquier origen (útil en desarrollo, debe restringirse en
producción). Ejecutar runserver para verificar que configuración no causa errores.
PASO B12: Creación de serializers base
Objetivo: Crear serializers para convertir modelos a JSON.
Acciones:
• Crear archivo voting/serializers.py.
• Importar serializers de DRF y modelos de voting.
• Crear serializer para User (campos públicos, excluir password).

• Crear serializer para Election.
• Crear serializer para Candidate.
• Crear serializer para VoteRegistry.
• Crear serializer para Vote.
• Usar ModelSerializer para simplificar.
Verificación: Archivo serializers.py sin errores de sintaxis.
INSTRUCCIÓN:
Crear serializers que convierten modelos Django a JSON para APIs. En archivo serializers.py, importar serializers desde
rest_framework. Crear clase para cada modelo heredando de ModelSerializer. Ejemplo: UserSerializer con Meta
especificando modelo User y campos a exponer (id, email, full_name, role - NO password). ElectionSerializer con todos los
campos relevantes. CandidateSerializer puede incluir campos anidados de Election si se necesita. ModelSerializer genera
automáticamente código de serialización basándose en modelo. Estos serializers serán usados en views/viewsets para
retornar datos en formato JSON.
PASO B13: Creación de viewsets básicos
Objetivo: Implementar viewsets para operaciones CRUD básicas.
Acciones:
• Abrir voting/views.py.
• Importar viewsets de DRF y modelos/serializers.
• Crear viewset para Election (solo lectura inicialmente).
• Crear viewset para Candidate (solo lectura).
• Configurar queryset y serializer_class para cada viewset.
• Dejar User, VoteRegistry y Vote para implementación posterior (lógica especial).
Verificación: Viewsets definidos sin errores.
INSTRUCCIÓN:
Crear viewsets que manejan operaciones de API. En views.py, importar viewsets desde rest_framework. Crear
ElectionViewSet heredando de ReadOnlyModelViewSet (permite solo GET, no POST/PUT/DELETE). Configurar queryset =
Election.objects.all() y serializer_class = ElectionSerializer. Similarmente para CandidateViewSet. ReadOnlyModelViewSet
proporciona automáticamente endpoints list (GET /elections/) y retrieve (GET /elections/:id/). Viewsets reducen código
boilerplate. User, VoteRegistry y Vote requieren lógica custom (registro, login, votación) por lo que se implementarán con
APIView en pasos posteriores.
PASO B14: Configuración de URLs del API
Objetivo: Exponer endpoints de viewsets.
Acciones:
• Crear archivo voting/urls.py.
• Importar DefaultRouter de DRF.
• Registrar viewsets en router.
• Crear urlpatterns con router.urls.
• Abrir config/urls.py.
• Incluir URLs de voting app con prefijo /api/:
• from django.urls import path, include
• urlpatterns = [
• path('admin/', admin.site.urls),
• path('api/', include('voting.urls')),
• ]
Verificación: Endpoints accesibles en /api/elections/ y /api/candidates/.
INSTRUCCIÓN:
Configurar rutas para exponer APIs. En voting/urls.py, usar DefaultRouter de DRF para registrar viewsets automáticamente.
Router genera URLs RESTful estándar. Registrar ElectionViewSet con router.register('elections', ElectionViewSet) y
CandidateViewSet con router.register('candidates', CandidateViewSet). En config/urls.py, incluir URLs de voting app con

prefijo 'api/'. Esto hace que endpoints estén en /api/elections/, /api/candidates/. Ejecutar servidor y acceder
a http://127.0.0.1:8000/api/elections/ en navegador - debe mostrar interfaz browsable de DRF con lista de elecciones de
Supabase.
PASO B15: Prueba de endpoints de lectura
Objetivo: Validar que APIs de lectura funcionan correctamente.
Acciones:
• Iniciar servidor: python manage.py runserver.
• Acceder a http://127.0.0.1:8000/api/elections/ en navegador.
• Verificar que muestra elecciones de Supabase en formato JSON.
• Acceder a http://127.0.0.1:8000/api/candidates/.
• Verificar que muestra candidatos.
• Probar con herramienta REST (Postman/Insomnia) haciendo GET requests.
• Verificar estructura de respuestas JSON.
Verificación: APIs retornan datos correctos de Supabase en formato JSON.
INSTRUCCIÓN:
Validar funcionamiento de endpoints de lectura antes de continuar. Iniciar servidor de desarrollo. Navegador puede
acceder directamente a URLs de API gracias a browsable API de DRF. GET /api/elections/ debe retornar array JSON con
elecciones (título, descripción, fechas, estado). GET /api/elections/[id]/ debe retornar detalle de elección específica.
Similarmente para /api/candidates/. Usar Postman o Insomnia para hacer peticiones más estructuradas y ver response
headers. Validar que datos coincidan con lo poblado en Supabase en PLAN A. Esto confirma que stack completo funciona:
Django → Supabase → JSON.
PASO B16: Instalación de dependencias de autenticación
Objetivo: Agregar librerías para sistema de autenticación JWT.
Acciones:
• Instalar djangorestframework-simplejwt: pip install djangorestframework-simplejwt.
• Actualizar requirements.txt: pip freeze > requirements.txt.
• Configurar SimpleJWT en config/settings.py:
• REST_FRAMEWORK = {
• 'DEFAULT_AUTHENTICATION_CLASSES': [
• 'rest_framework_simplejwt.authentication.JWTAuthentication',
• ],
• }
• Importar timedelta: from datetime import timedelta.
• Agregar configuración SIMPLE_JWT con tiempos de vida de tokens.
Verificación: SimpleJWT instalado y configurado sin errores.
INSTRUCCIÓN:
Configurar autenticación JWT para APIs. Instalar djangorestframework-simplejwt que proporciona autenticación basada en
tokens JSON Web Token. Actualizar requirements.txt. En settings.py, cambiar DEFAULT_AUTHENTICATION_CLASSES para
usar JWTAuthentication. Configurar diccionario SIMPLE_JWT con ACCESS_TOKEN_LIFETIME (ej: 30 minutos) y
REFRESH_TOKEN_LIFETIME (ej: 7 días). JWT permite autenticación stateless: cliente recibe token al login y lo envía en
headers en peticiones subsiguientes. Backend valida token sin necesidad de sesiones en servidor. Esta configuración es
base para endpoints protegidos.
PASO B17: Implementación de endpoint de registro
Objetivo: Crear API para registrar nuevos usuarios.
Acciones:
• Crear RegisterSerializer en serializers.py con validación de password.
• Crear RegisterView en views.py usando APIView.
• Implementar método POST que crea usuario y retorna tokens JWT.

• Hashear password con make_password de Django.
• Generar tokens JWT manualmente o usar RefreshToken de simplejwt.
• Agregar URL en voting/urls.py: path('register/', RegisterView.as_view()).
Verificación: POST a /api/register/ con datos válidos crea usuario y retorna tokens.
INSTRUCCIÓN:
Implementar endpoint de registro de usuarios. Crear RegisterSerializer que valide campos (email único, password
suficientemente fuerte, password_confirm coincida). En views.py, crear RegisterView como APIView con método post().
Validar datos con serializer, crear usuario con User.objects.create() hasheando password con make_password(), guardar
en base de datos. Usar RefreshToken.for_user(user) para generar tokens JWT. Retornar Response con tokens y datos de
usuario. Agregar ruta /api/register/. Probar con Postman haciendo POST con JSON: {"email": "test@test.com", "password":
"pass123", "password_confirm": "pass123", "full_name": "Test User"}. Debe retornar access y refresh tokens.
PASO B18: Implementación de endpoint de login
Objetivo: Crear API para autenticación de usuarios existentes.
Acciones:
• Crear LoginSerializer en serializers.py.
• Crear LoginView en views.py.
• Validar credenciales con authenticate() de Django.
• Verificar password con check_password().
• Generar y retornar tokens JWT si credenciales correctas.
• Retornar error 401 si credenciales incorrectas.
• Agregar URL: path('login/', LoginView.as_view()).
Verificación: POST a /api/login/ con credenciales correctas retorna tokens, incorrectas retorna error.
INSTRUCCIÓN:
Implementar endpoint de login. Crear LoginView como APIView con método post(). Recibir email y password en
request.data. Buscar usuario por email con User.objects.get(email=email). Verificar password con
check_password(password, user.password). Si es correcto, generar tokens JWT con RefreshToken.for_user(user) y
retornar. Si es incorrecto, retornar Response con status=401 y mensaje de error. Agregar ruta /api/login/. Probar con
Postman: POST con credenciales de usuario creado en PLAN A (o recién registrado en B17). Debe retornar tokens. Guardar
access_token para usar en peticiones protegidas.
PASO B19: Implementación de endpoint de perfil
Objetivo: Crear API para obtener datos de usuario autenticado.
Acciones:
• Crear ProfileView en views.py.
• Proteger con permission_classes = [IsAuthenticated].
• Implementar método GET que retorne datos de request.user.
• Serializar con UserSerializer.
• Agregar URL: path('profile/', ProfileView.as_view()).
Verificación: GET a /api/profile/ con token válido retorna datos de usuario, sin token retorna 401.
INSTRUCCIÓN:
Implementar endpoint de perfil de usuario. Importar IsAuthenticated de rest_framework.permissions. Crear ProfileView
como APIView con permission_classes = [IsAuthenticated]. Implementar método get() que serialice request.user (usuario
autenticado extraído del token JWT) con UserSerializer y retorne. Agregar ruta /api/profile/. Probar con Postman: GET a
/api/profile/ con header "Authorization: Bearer [access_token]" debe retornar datos del usuario. Sin header o con token
inválido debe retornar 401 Unauthorized. Esto valida que autenticación JWT funciona correctamente.
PASO B20: Implementación de endpoint para votar
Objetivo: Crear API para emitir voto con validaciones completas.
Acciones:
• Crear VoteView en views.py como APIView protegida.
• Implementar método POST que reciba election_id y candidate_id.
• Validar que elección existe y está activa.

• Validar que elección está dentro de periodo (start_date <= now <= end_date).
• Validar que candidato pertenece a esa elección.
• Validar que usuario no haya votado usando VoteRegistry.
• Usar transaction.atomic() para operación atómica.
• Crear registro en Vote (sin user_id).
• Actualizar VoteRegistry marcando has_voted=True.
• Retornar éxito o error según caso.
• Agregar URL: path('vote/', VoteView.as_view()).
Verificación: Votar funciona correctamente, segundo intento es rechazado.
INSTRUCCIÓN:
Implementar endpoint crítico de votación. VoteView debe estar protegida con IsAuthenticated. En método post(), recibir
election_id y candidate_id. Implementar validaciones secuenciales: (1) elección existe, (2) estado es 'active', (3) fecha
actual entre start_date y end_date, (4) candidato existe y pertenece a esa elección, (5) consultar VoteRegistry para user y
election - si has_voted=True, rechazar. Si pasa validaciones, usar transaction.atomic() de Django para crear Vote con
election_id y candidate_id (NO user_id), y actualizar (o crear) VoteRegistry con has_voted=True y voted_at=now(). Retornar
201 Created si exitoso. Agregar ruta /api/vote/. Probar votando con token válido - debe funcionar primera vez y rechazar
segunda.
PASO B21: Implementación de endpoint de verificación de voto
Objetivo: Permitir consultar si usuario ya votó en una elección.
Acciones:
• Crear HasVotedView en views.py protegida con autenticación.
• Implementar método GET que reciba election_id como parámetro.
• Consultar VoteRegistry para user y election.
• Retornar JSON con campo has_voted booleano.
• Agregar URL: path('has-voted/<uuid:election_id>/', HasVotedView.as_view()).
Verificación: GET retorna true si votó, false si no ha votado.
INSTRUCCIÓN:
Implementar endpoint de consulta de estado de voto. HasVotedView protegida con IsAuthenticated. Método get() recibe
election_id desde URL. Buscar en VoteRegistry filtrado por user=request.user y election_id. Si existe registro,

retornar {"has_voted": registry.has_voted}. Si no existe, retornar {"has_voted": false}. Agregar ruta /api/has-
voted/[election_id]/. Probar con Postman: GET con token y election_id de elección donde se votó debe retornar true,

elección donde no se votó debe retornar false. Esto permite al frontend mostrar interfaz apropiada.
PASO B22: Implementación de endpoint de resultados
Objetivo: Crear API que retorne resultados de una elección.
Acciones:
• Crear ResultsView en views.py.
• Implementar método GET que reciba election_id.
• Ejecutar query agregada: contar votos por candidato.
• Usar Vote.objects.filter(election_id=election_id).values('candidate_id').annotate(votes=Count('id')).
• Enriquecer con datos de candidatos.
• Calcular porcentajes.
• Retornar JSON con resultados ordenados.
• Agregar URL: path('results/<uuid:election_id>/', ResultsView.as_view()).
Verificación: GET retorna conteo correcto de votos por candidato.
INSTRUCCIÓN:
Implementar endpoint de resultados de elección. ResultsView puede ser pública o protegida según requerimiento. Método
get() recibe election_id. Realizar query agregada usando ORM de
Django: Vote.objects.filter(election=election_id).values('candidate_id').annotate(vote_count=Count('id')). Esto cuenta
votos por candidato. Obtener candidatos de esa elección y combinar con conteo (LEFT JOIN para incluir candidatos con 0
votos). Calcular total de votos y porcentajes. Retornar lista ordenada por votos descendente. Agregar ruta

/api/results/[election_id]/. Probar con election_id de elección con votos - debe retornar conteo correcto según datos de
Supabase.
PASO B23: Implementación de endpoint de historial
Objetivo: Crear API para consultar elecciones cerradas.
Acciones:
• Crear HistoryView en views.py.
• Implementar método GET que filtre elecciones con status='closed'.
• Ordenar por end_date descendente (más reciente primero).
• Para cada elección, incluir resultados finales.
• Usar serializer anidado o construir respuesta manualmente.
• Agregar URL: path('history/', HistoryView.as_view()).
Verificación: GET retorna lista de elecciones cerradas con resultados.
INSTRUCCIÓN:
Implementar endpoint de historial de elecciones. HistoryView con método get().
Filtrar Election.objects.filter(status='closed').order_by('-end_date'). Para cada elección, obtener resultados usando lógica
similar a PASO B22. Serializar con ElectionSerializer agregando campo personalizado de resultados. Retornar array de
elecciones con sus resultados finales. Agregar ruta /api/history/. Probar - debe retornar elecciones cerradas creadas en
PLAN A con conteos de votos. Esto cumple requerimiento de consultar historial.
PASO B24: Configuración de Django Admin
Objetivo: Habilitar panel administrativo para gestión visual.
Acciones:
• Abrir voting/admin.py.
• Registrar modelos Election, Candidate, User, VoteRegistry.
• Configurar list_display para mostrar campos relevantes.
• Configurar list_filter para filtros útiles.
• Configurar search_fields para búsqueda.
• Crear superuser si no existe: python manage.py createsuperuser.
• Acceder a /admin/ y validar que modelos sean gestionables.
Verificación: Django Admin permite crear/editar elecciones y candidatos visualmente.
INSTRUCCIÓN:
Configurar Django Admin para gestión administrativa. En admin.py, importar modelos y admin de Django. Registrar cada
modelo con decorador @admin.register o admin.site.register(). Configurar ElectionAdmin con list_display = ['title', 'status',
'start_date', 'end_date'], list_filter = ['status'], search_fields = ['title']. Similarmente para Candidate, User. Crear
superusuario ejecutando createsuperuser (email, password). Acceder a http://127.0.0.1:8000/admin/ con credenciales de
superuser. Debe mostrar interfaz de admin con modelos listados. Crear nueva elección, crear candidatos, editar usuarios.
Django Admin cumple requerimiento de "gestión de candidatos y elecciones" sin desarrollo adicional.
PASO B25: Creación de acciones admin personalizadas
Objetivo: Agregar acciones para activar/cerrar elecciones desde admin.
Acciones:
• En admin.py, crear función de acción activate_elections.
• Validar que elecciones tengan candidatos antes de activar.
• Cambiar status a 'active'.
• Crear función de acción close_elections que cambie status a 'closed'.
• Registrar acciones en ElectionAdmin con actions = [activate_elections, close_elections].
Verificación: Desde admin, seleccionar elecciones y aplicar acciones funciona.
INSTRUCCIÓN:
Extender Django Admin con acciones custom. Crear función activate_elections(modeladmin, request, queryset) que itere
elecciones seleccionadas, valide que cada una tenga al menos un candidato (queryset.filter(candidates__isnull=False)), y
actualice status='active'. Mostrar mensaje de éxito/error con modeladmin.message_user(). Similarmente para

close_elections que simplemente actualice status='closed'. Agregar acciones a ElectionAdmin. En admin, seleccionar
elecciones con checkboxes, elegir acción del dropdown y ejecutar. Esto facilita gestión de ciclo de vida de elecciones sin
desarrollo de interfaz custom.
PASO B26: Testing manual de flujo completo
Objetivo: Validar todos los endpoints con flujo real.
Acciones:
• Usar Postman/Insomnia para crear colección de requests.
• Test 1: Registrar nuevo usuario (POST /api/register/).
• Test 2: Login con ese usuario (POST /api/login/).
• Test 3: Obtener perfil (GET /api/profile/ con token).
• Test 4: Listar elecciones (GET /api/elections/).
• Test 5: Verificar estado de voto (GET /api/has-voted/[id]/).
• Test 6: Emitir voto (POST /api/vote/).
• Test 7: Intentar votar de nuevo (debe fallar).
• Test 8: Ver resultados (GET /api/results/[id]/).
• Test 9: Ver historial (GET /api/history/).
Verificación: Todos los tests pasan exitosamente.
INSTRUCCIÓN:
Realizar testing manual completo de API. Crear colección en Postman con todos los endpoints. Ejecutar flujo
secuencialmente: registrar usuario nuevo, obtener tokens, guardar access token en variable de entorno de Postman, hacer
request a profile con token (validar autenticación), listar elecciones activas, consultar si votó en elección X (debe ser false),
emitir voto con election_id y candidate_id, consultar si votó nuevamente (debe ser true), intentar votar de nuevo (debe
retornar error), consultar resultados (debe incluir voto emitido), consultar historial. Cada paso debe funcionar
correctamente. Anotar cualquier error y corregir.
PASO B27: Implementación de tests automatizados básicos
Objetivo: Crear tests unitarios para validar lógica crítica.
Acciones:
• Crear archivo voting/tests.py.
• Importar TestCase y APITestCase de Django/DRF.
• Crear test de registro de usuario.
• Crear test de login.
• Crear test de votación exitosa.
• Crear test de prevención de doble voto.
• Crear test de cálculo de resultados.
• Ejecutar tests: python manage.py test.
Verificación: Todos los tests pasan.
INSTRUCCIÓN:
Implementar tests automatizados para validar funcionalidades críticas. En tests.py, crear clase de test heredando de
APITestCase. Método setUp() crea datos de prueba (usuario, elección, candidatos). Test test_user_can_register() hace
POST a /api/register/ y valida status 201 y presencia de tokens. Test test_user_can_login() hace POST a /api/login/ y valida
tokens. Test test_user_can_vote() emite voto y valida éxito. Test test_cannot_vote_twice() intenta votar dos veces y valida
que segunda falla. Test test_results_count() verifica que conteo de resultados sea correcto. Ejecutar con comando test.
Tests dan confianza de que lógica funciona y previenen regresiones futuras.
PASO B28: Documentación de API
Objetivo: Generar documentación de endpoints.
Acciones:
• Instalar drf-spectacular: pip install drf-spectacular.
• Configurar en settings.py agregando a INSTALLED_APPS.

• Configurar REST_FRAMEWORK con DEFAULT_SCHEMA_CLASS.
• Agregar URLs de schema en config/urls.py.
• Generar schema: python manage.py spectacular --file schema.yml.
• Acceder a /api/schema/ para ver documentación interactiva.
• Alternativamente, crear documento manual en README listando endpoints.
Verificación: Documentación de API accesible y completa.
INSTRUCCIÓN:
Documentar API para facilitar consumo desde frontend. Instalar drf-spectacular que genera documentación OpenAPI
automáticamente. Configurar en settings.py: agregar 'drf_spectacular' a INSTALLED_APPS, agregar
DEFAULT_SCHEMA_CLASS = 'drf_spectacular.openapi.AutoSchema' en REST_FRAMEWORK. En urls.py agregar paths para
schema y UI: SpectacularAPIView, SpectacularSwaggerView. Acceder a /api/docs/ para ver documentación interactiva
estilo Swagger. Alternativamente, crear sección en README.md listando manualmente cada endpoint con método HTTP,
URL, autenticación requerida, parámetros, ejemplo de respuesta. Esta documentación será referencia para desarrollo de
frontend.
PASO B29: Preparación para deployment - Configuración de producción
Objetivo: Configurar Django para ambiente de producción.
Acciones:
• Crear archivo config/settings_prod.py o modificar settings.py con condicionales.
• Configurar DEBUG = False para producción.
• Configurar ALLOWED_HOSTS para incluir dominio de Railway.
• Configurar SECURE_SSL_REDIRECT = True.
• Configurar CORS_ALLOWED_ORIGINS con dominio de Vercel (NO allow all).
• Instalar gunicorn: pip install gunicorn.
• Actualizar requirements.txt.
• Crear archivo Procfile: web: gunicorn config.wsgi.
Verificación: Proyecto configurado para producción.
INSTRUCCIÓN:
Preparar Django para deployment en Railway. Modificar settings.py para leer DEBUG desde variable de entorno: DEBUG =
config('DEBUG', default=False, cast=bool). Configurar ALLOWED_HOSTS = config('ALLOWED_HOSTS',
default='').split(',') para leer desde env var. En producción, Railway inyectará ALLOWED_HOSTS con su dominio. Configurar
CORS_ALLOWED_ORIGINS leyendo desde variable de entorno, NO usar ALLOW_ALL en producción. Instalar gunicorn
(servidor WSGI para producción). Crear Procfile que le indica a Railway cómo iniciar app: "web: gunicorn config.wsgi --bind
0.0.0.0:$PORT". Actualizar requirements.txt. Estas configuraciones son críticas para deployment seguro.
PASO B30: Deployment en Railway
Objetivo: Desplegar backend en producción.
Acciones:
• Crear cuenta en Railway (https://railway.app).
• Crear nuevo proyecto "New Project" → "Deploy from GitHub repo".
• Conectar repositorio de GitHub.
• Railway detecta Python y usa Procfile.
• Configurar variables de entorno en Railway dashboard:
o DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT (credenciales de Supabase).
o SECRET_KEY (generar nueva para producción).
o DEBUG=False.
o ALLOWED_HOSTS=[dominio-railway].
o CORS_ALLOWED_ORIGINS=[dominio-vercel-futuro].
• Ejecutar deployment.
• Verificar logs de deployment.

Verificación: Backend accesible en URL de Railway.
INSTRUCCIÓN:
Desplegar backend en Railway. Crear cuenta y nuevo proyecto. Railway puede desplegar desde repositorio GitHub
automáticamente. Conectar repo, Railway detecta que es Python por requirements.txt y usará Procfile. En dashboard de
Railway, ir a Variables y agregar todas las env vars necesarias: credenciales de Supabase, SECRET_KEY de producción,
DEBUG=False, ALLOWED_HOSTS con el dominio que Railway asignará (puede configurarse después del primer deploy),
CORS_ALLOWED_ORIGINS (vacío por ahora, se agregará dominio de Vercel después). Railway ejecuta deployment
automáticamente. Revisar logs para detectar errores. Una vez completado, Railway proporciona URL pública (ej:
proyecto.railway.app). Acceder a /api/elections/ para validar.
PASO B31: Aplicación de migraciones en producción
Objetivo: Asegurar que base de datos de producción tenga tablas de Django.
Acciones:
• Si Railway no ejecuta migraciones automáticamente, acceder a shell de Railway.
• Ejecutar: python manage.py migrate.
• Alternativamente, agregar comando de migración a Procfile: release: python manage.py migrate.
• Verificar que tablas de Django (sessions, admin, etc) existan en Supabase.
Verificación: Migraciones aplicadas sin errores.
INSTRUCCIÓN:
Aplicar migraciones de Django en base de datos de producción (Supabase). Railway puede ejecutar comandos de release
antes de iniciar servidor. Modificar Procfile agregando línea "release: python manage.py migrate". Railway ejecutará esto
antes de cada deployment. Alternativamente, acceder a shell de Railway y ejecutar migrate manualmente. Django creará
tablas adicionales (django_session, auth_, admin_) en Supabase que son necesarias para funcionamiento de admin y
autenticación. Verificar en dashboard de Supabase que nuevas tablas aparezcan. Si hay errores, revisar credenciales de
base de datos.
PASO B32: Creación de superusuario en producción
Objetivo: Crear usuario administrador para Django Admin en producción.
Acciones:
• Acceder a shell de Railway.
• Ejecutar: python manage.py createsuperuser.
• Ingresar email y password.
• Alternativamente, crear desde código con script de management command.
• Acceder a [dominio-railway]/admin/ y validar login.
Verificación: Admin de producción accesible con credenciales de superuser.
INSTRUCCIÓN:
Crear superusuario en base de datos de producción. Acceder a shell interactivo de Railway (Railway dashboard → proyecto
→ Settings → Shell o usando Railway CLI). Ejecutar comando createsuperuser, ingresar email y password. Django creará
usuario en tabla users de Supabase con is_staff=True y is_superuser=True. Acceder a URL del admin en producción
([dominio-railway].railway.app/admin/) e iniciar sesión. Debe permitir acceso a panel de administración. Esto permite
gestionar datos de producción visualmente. Anotar credenciales de superuser de forma segura.
PASO B33: Testing de API en producción
Objetivo: Validar que todos los endpoints funcionen en producción.
Acciones:
• Actualizar colección de Postman/Insomnia con URL base de Railway.
• Ejecutar suite completa de tests manuales (PASO B26).
• Registrar nuevo usuario en producción.
• Hacer login, votar, consultar resultados.
• Verificar tiempos de respuesta aceptables.
• Verificar que CORS esté configurado correctamente (puede fallar hasta que se agregue dominio de Vercel).
Verificación: API de producción funciona correctamente.

INSTRUCCIÓN:
Validar funcionamiento de API en ambiente de producción. Actualizar URL base en colección de Postman a dominio de
Railway. Ejecutar flujo completo: registrar usuario, login, votar, consultar resultados, historial. Todos los endpoints deben
funcionar igual que en desarrollo. Validar tiempos de respuesta (deben ser razonables, conexión a Supabase desde
Railway puede ser más lenta que local). CORS puede fallar en este punto si se intenta acceder desde navegador ya que
dominio de frontend aún no existe - esto se corregirá cuando se despliegue frontend y se configure
CORS_ALLOWED_ORIGINS. Anotar URL de producción de API para usar en frontend.
PASO B34: Documentación del backend
Objetivo: Documentar instalación, configuración y uso del backend.
Acciones:
• Crear README_BACKEND.md en directorio del backend.
• Documentar tecnologías utilizadas.
• Documentar estructura del proyecto.
• Documentar variables de entorno necesarias.
• Documentar comandos de instalación y ejecución local.
• Documentar URL de API en producción.
• Documentar endpoints disponibles.
• Agregar notas sobre autenticación JWT.
Verificación: README completo y claro.
INSTRUCCIÓN:
Crear documentación completa del backend. README_BACKEND.md debe incluir: Título y descripción, tecnologías
(Django 4.2, DRF, PostgreSQL/Supabase, JWT), estructura de directorios explicada (config/, voting/, models.py, views.py,
serializers.py), sección de instalación local (clonar repo, crear venv, instalar requirements, configurar .env, ejecutar
migraciones, runserver), listado de variables de entorno necesarias, URL de API en producción, tabla de endpoints con
método HTTP, URL, autenticación requerida, descripción, ejemplo de uso de autenticación JWT (incluir token en header
Authorization: Bearer [token]). Esta documentación facilita evaluación del proyecto y futuro mantenimiento.
PASO B35: Validación final del backend
Objetivo: Confirmar que backend está 100% completo y funcional.
Acciones:
• Revisar checklist de requisitos funcionales: registro ✓, login ✓, votación ✓, resultados ✓, historial ✓, gestión admin
✓.
• Validar que todos los endpoints documentados funcionen.
• Validar que tests automatizados pasen.
• Validar deployment en Railway funcional.
• Validar Django Admin accesible.
• Confirmar documentación completa.
• Marcar PLAN B como completado.
Verificación: Backend completamente funcional, testeado y desplegado.
INSTRUCCIÓN:
Realizar validación final integral del backend antes de proceder a frontend. Revisar checklist sistemáticamente: (1) Registro
de usuarios funciona en dev y prod, (2) Login retorna tokens JWT correctamente, (3) Votación funciona con todas las
validaciones (un voto por usuario, elección activa, periodo válido), (4) Resultados se calculan correctamente con conteos
precisos, (5) Historial muestra elecciones cerradas, (6) Django Admin permite gestionar elecciones/candidatos. Ejecutar
suite de tests automatizados - todos deben pasar. Acceder a URL de Railway y validar cada endpoint. Confirmar que
documentación esté completa y actualizada. Una vez validado, PLAN B está completado al 100%. Backend sólido y listo
para ser consumido por frontend.

ENTREGABLE DEL PLAN B
Al finalizar este plan se debe tener:
• Proyecto Django configurado y conectado a Supabase

• Modelos Django mapeando tablas de Supabase
• API REST completa con todos los endpoints requeridos
• Sistema de autenticación JWT funcional
• Endpoint de registro de usuarios
• Endpoint de login
• Endpoint de votación con validaciones críticas
• Endpoint de verificación de estado de voto
• Endpoint de resultados en tiempo real
• Endpoint de historial de elecciones
• Django Admin configurado y funcional
• Tests automatizados implementados
• Documentación de API generada
• Backend desplegado en Railway
• API de producción funcional y accesible
• Backend 100% completo y validado

PLAN C: FRONTEND (NEXT.JS + REACT)
Interfaz de Usuario Completa y Responsiva
OBJETIVO DEL PLAN C
Desarrollar, integrar y desplegar interfaz de usuario completa en Next.js que consuma la API del backend, proporcionando
experiencia intuitiva y responsiva para todas las funcionalidades del sistema de votaciones.
PASO C1: Inicialización del proyecto Next.js
Objetivo: Crear estructura base del frontend.
Acciones:
• Abrir terminal en directorio raíz del repositorio.
• Ejecutar: npx create-next-app@latest frontend.
• Seleccionar opciones: TypeScript (No, usar JavaScript), ESLint (Yes), Tailwind CSS (No, usaremos MUI), App Router
(Yes), alias imports (No).
• Navegar a directorio: cd frontend.
• Verificar estructura creada: app/, public/, package.json.
• Ejecutar servidor de desarrollo: npm run dev.
• Acceder a http://localhost:3000.
Verificación: Página de bienvenida de Next.js visible en navegador.
INSTRUCCIÓN:
Inicializar proyecto Next.js usando create-next-app que genera estructura optimizada. Ejecutar comando en directorio raíz
(donde está backend/). Nombre del directorio: "frontend". Durante configuración, rechazar TypeScript para simplicidad
(JavaScript es suficiente para proyecto académico). Rechazar Tailwind ya que se usará Material UI. Aceptar App Router
(arquitectura moderna de Next.js 13+). Next.js creará estructura con directorio app/ para páginas, public/ para assets
estáticos, package.json con dependencias. Ejecutar npm run dev inicia servidor en puerto 3000. Navegador debe mostrar
página demo de Next.js. Esta es la base del frontend.
PASO C2: Instalación de Material UI y dependencias
Objetivo: Instalar librerías de UI y utilidades necesarias.
Acciones:
• Instalar Material UI: npm install @mui/material @emotion/react @emotion/styled.
• Instalar iconos de MUI: npm install @mui/icons-material.

• Instalar axios: npm install axios.
• Instalar librería de gráficos: npm install recharts.
• Instalar jwt-decode: npm install jwt-decode.
• Verificar instalaciones en package.json.
Verificación: Todas las dependencias listadas en package.json.
INSTRUCCIÓN:
Instalar todas las dependencias necesarias para el frontend. Material UI proporciona componentes React con diseño
Material Design, cumpliendo requerimiento de "diseño moderno y consistente". @emotion/react y @emotion/styled son
dependencias requeridas por MUI para estilos. @mui/icons-material proporciona iconos. Axios es cliente HTTP para
consumir API del backend. Recharts permite crear gráficos de resultados de votación. jwt-decode extrae información del
token JWT (NO valida, solo decodifica). Ejecutar instalaciones. Verificar que package.json se actualice con todas las
dependencias. Estas librerías son fundamentales para desarrollo.
PASO C3: Configuración de variables de entorno
Objetivo: Configurar URL del backend de forma centralizada.
Acciones:
• Crear archivo .env.local en raíz de frontend.
• Agregar: NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api.
• Agregar .env.local a .gitignore.
• Crear archivo .env.example con plantilla:
• NEXT_PUBLIC_API_URL=http://localhost:8000/api
• Documentar que en producción se cambiará a URL de Railway.
Verificación: Variables de entorno configuradas y .env.local en .gitignore.
INSTRUCCIÓN:
Configurar variables de entorno para URL del backend. En Next.js, variables que comienzan con NEXT_PUBLIC_ son
accesibles desde código del cliente. Crear .env.local con URL del backend local (http://127.0.0.1:8000/api). Agregar
.env.local a .gitignore para nunca subirlo a repositorio. Crear .env.example como plantilla sin valores sensibles. En
desarrollo se usa localhost, en producción se cambiará a dominio de Railway. Esta configuración centraliza URL del
backend en un solo lugar, facilitando cambio entre ambientes.
PASO C4: Configuración de cliente HTTP (Axios)
Objetivo: Crear instancia configurada de axios para comunicación con backend.
Acciones:
• Crear directorio: lib/.
• Crear archivo: lib/axios.js.
• Configurar instancia de axios con baseURL desde variable de entorno.
• Crear interceptor para agregar token JWT automáticamente.
• Exportar instancia configurada.
Verificación: Archivo axios.js creado con configuración correcta.
INSTRUCCIÓN:
Crear capa de configuración de axios para centralizar peticiones HTTP. En directorio lib/, crear axios.js. Importar axios.
Crear instancia: const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }). Configurar interceptor de
request: api.interceptors.request.use((config) => { const token = localStorage.getItem('access_token'); if (token)
config.headers.Authorization = Bearer ${token}; return config; }). Este interceptor agrega automáticamente token JWT desde
localStorage a todas las peticiones. Exportar: export default api. Esta configuración elimina necesidad de agregar headers
manualmente en cada petición.
PASO C5: Creación de servicios de API
Objetivo: Crear funciones para consumir endpoints del backend.
Acciones:
• Crear directorio: services/.
• Crear archivo: services/authService.js con funciones: register, login, getProfile.
• Crear archivo: services/electionService.js con funciones: getElections, getElectionDetail.

• Crear archivo: services/voteService.js con funciones: hasVoted, castVote.
• Crear archivo: services/resultService.js con funciones: getResults, getHistory.
• Usar instancia de axios de lib/axios.js.
• Cada función retorna promesa del axios request.
Verificación: Archivos de servicio creados con todas las funciones necesarias.
INSTRUCCIÓN:
Crear capa de servicios que encapsula llamadas a la API. En services/authService.js, crear funciones: register(data) que
hace POST a /register/, login(email, password) que hace POST a /login/, getProfile() que hace GET a /profile/. En
electionService.js: getElections() GET a /elections/, getElectionDetail(id) GET a /elections/:id/. En
voteService.js: hasVoted(electionId) GET a /has-voted/:id/, castVote(electionId, candidateId) POST a /vote/. En
resultService.js: getResults(electionId) GET a /results/:id/, getHistory() GET a /history/. Todas las funciones usan la
instancia configurada de axios. Esta organización separa lógica de API de componentes UI.
PASO C6: Creación de contexto de autenticación
Objetivo: Implementar gestión global del estado de autenticación.
Acciones:
• Crear directorio: context/.
• Crear archivo: context/AuthContext.js.
• Crear Context con createContext.
• Implementar AuthProvider con estado de usuario y funciones login/logout/register.
• Función login: llamar authService.login, guardar tokens en localStorage, actualizar estado.
• Función logout: limpiar localStorage, resetear estado.
• Función register: llamar authService.register, guardar tokens.
• Hook useAuth para consumir contexto.
• Envolver app con AuthProvider.
Verificación: AuthContext funcional y accesible desde toda la app.
INSTRUCCIÓN:
Crear sistema de gestión de autenticación global usando Context API. En AuthContext.js, crear AuthContext con
createContext(). Crear componente AuthProvider que maneja estado: const [user, setUser] = useState(null); const [loading,
setLoading] = useState(true). Implementar función login que llama authService.login, guarda access_token y refresh_token
en localStorage, decodifica token con jwt-decode para extraer user_id/email, actualiza estado user. Función logout limpia
localStorage y resetea user a null. Función register similar a login. useEffect inicial verifica si hay token en localStorage al
montar, llama getProfile para obtener datos de usuario. Exportar hook useAuth = () => useContext(AuthContext). En
app/layout.js, envolver children con AuthProvider. Ahora cualquier componente puede acceder a usuario autenticado con
useAuth().
PASO C7: Creación de componente de navegación
Objetivo: Implementar navbar consistente en todas las páginas.
Acciones:
• Crear directorio: components/.
• Crear archivo: components/Navbar.js.
• Usar AppBar y Toolbar de MUI.
• Mostrar logo/título del sistema.
• Mostrar enlaces: Inicio, Elecciones (si autenticado), Historial.
• Mostrar botón de Login/Register si no autenticado.
• Mostrar nombre de usuario y botón Logout si autenticado.
• Hacer responsivo con navegación colapsable en móvil.
Verificación: Navbar se visualiza correctamente y responde a estado de autenticación.
INSTRUCCIÓN:
Crear componente Navbar que aparecerá en todas las páginas. Importar AppBar, Toolbar, Button, IconButton de MUI. Usar
useAuth para acceder a usuario autenticado. Si user existe, mostrar enlaces a "Elecciones", "Historial", nombre de usuario,
botón "Cerrar Sesión" que llama logout(). Si user es null, mostrar botones "Iniciar Sesión", "Registrarse" que navegan a

/login y /register. Usar Link de next/link para navegación. Hacer responsivo usando Box y sx props de MUI para
ocultar/mostrar elementos según breakpoints. Este componente será agregado al layout principal para aparecer en todas
las páginas.
PASO C8: Creación de layout principal
Objetivo: Configurar layout que incluya Navbar en todas las páginas.
Acciones:
• Abrir app/layout.js.
• Importar Navbar.
• Importar ThemeProvider y createTheme de MUI.
• Crear tema de Material UI.
• Envolver children con ThemeProvider.
• Agregar Navbar antes de {children}.
• Configurar metadatos de la página.
Verificación: Navbar visible en todas las páginas con tema de MUI aplicado.
INSTRUCCIÓN:
Configurar layout principal de Next.js para incluir configuraciones globales. En app/layout.js, importar ThemeProvider y
createTheme de MUI. Crear tema: const theme = createTheme({ palette: { primary: { main: '#1976d2' } } }). Envolver
estructura con AuthProvider (del PASO C6) y ThemeProvider. Agregar Navbar antes de {children}.
Estructura: <AuthProvider><ThemeProvider theme={theme}><Navbar
/><main>{children}</main></ThemeProvider></AuthProvider>. Configurar metadata de Next.js con título y descripción del
sistema. Este layout se aplica a todas las páginas, garantizando consistencia visual y disponibilidad de contexto de auth.
PASO C9: Creación de página de inicio (Landing)
Objetivo: Implementar página de presentación del sistema.
Acciones:
• Archivo ya existe: app/page.js (ruta raíz).
• Reemplazar contenido con diseño de landing page.
• Usar Container, Typography, Button, Box de MUI.
• Sección hero con título: "Sistema de Votaciones en Línea".
• Descripción breve del sistema.
• Botones "Iniciar Sesión" y "Registrarse" si no autenticado.
• Botón "Ver Elecciones" si autenticado.
• Sección de características del sistema.
Verificación: Landing page se visualiza correctamente con diseño atractivo.
INSTRUCCIÓN:
Crear página de inicio que presenta el sistema. En app/page.js, limpiar contenido generado por Next.js. Importar
componentes de MUI (Container, Box, Typography, Button, Grid). Usar useAuth para verificar si hay usuario autenticado.
Estructura: Container centrado, Box con sección hero (fondo con color, padding), Typography variant="h2" con título
"Sistema de Votaciones en Línea", Typography variant="h5" con descripción "Realiza votaciones de forma segura, rápida y
transparente". Botones condicionales: si user existe, mostrar botón que navega a /elections, si no existe, mostrar botones
a /login y /register. Grid con 3 columnas mostrando características: "Seguro", "Tiempo Real", "Fácil de Usar" con íconos de
MUI. Diseño debe ser responsivo colapsando grid en móvil.
PASO C10: Creación de página de registro
Objetivo: Implementar formulario de registro de usuarios.
Acciones:
• Crear archivo: app/register/page.js.
• Crear formulario con campos: Nombre completo, Email, Contraseña, Confirmar contraseña.
• Usar TextField, Button, Card de MUI.
• Implementar validación básica (campos requeridos, passwords coinciden, email válido).
• Al enviar: llamar register del AuthContext.

• Manejar errores (email ya existe, etc.).
• Redirigir a /elections tras registro exitoso.
• Mostrar mensajes de error con Alert de MUI.
Verificación: Formulario permite registrar usuario y redirige correctamente.
INSTRUCCIÓN:
Crear página de registro en app/register/page.js. Importar useState, useRouter de next/navigation, useAuth, componentes
de MUI. Crear estados para formData (fullName, email, password, passwordConfirm) y error. Renderizar Card centrado
con TextField para cada campo, tipo "email" para email, tipo "password" para contraseñas. Botón "Registrarse" que al
hacer clic valida (campos no vacíos, passwords coinciden, email formato válido), llama register(formData) del contexto,
maneja éxito redirigiendo a /elections con router.push(), maneja error mostrando mensaje con Alert. Link "¿Ya tienes
cuenta? Inicia sesión" que navega a /login. Diseño responsivo con Container maxWidth="sm". Este formulario permite
crear nuevas cuentas.
PASO C11: Creación de página de login
Objetivo: Implementar formulario de inicio de sesión.
Acciones:
• Crear archivo: app/login/page.js.
• Crear formulario con campos: Email, Contraseña.
• Usar componentes de MUI.
• Al enviar: llamar login del AuthContext.
• Manejar errores (credenciales incorrectas).
• Redirigir a /elections tras login exitoso.
• Link a página de registro.
• Mostrar loading state durante petición.
Verificación: Formulario permite login y redirige correctamente.
INSTRUCCIÓN:
Crear página de login en app/login/page.js. Similar a página de registro pero solo campos email y password. Crear estados
para email, password, error, loading. Formulario con TextField para email y password. Botón "Iniciar Sesión" que al hacer
clic setea loading=true, llama login(email, password), si exitoso redirige a /elections, si falla muestra error con Alert,
finalmente setea loading=false. Botón debe mostrar CircularProgress si loading=true. Link "¿No tienes cuenta? Regístrate"
a /register. Card centrado con diseño limpio. Esta página es punto de entrada para usuarios existentes.
PASO C12: Creación de componente de ruta protegida
Objetivo: Crear HOC para proteger rutas que requieren autenticación.
Acciones:
• Crear archivo: components/ProtectedRoute.js.
• Crear componente que verifica si hay usuario autenticado.
• Si no hay usuario, redirigir a /login.
• Si hay usuario, renderizar children.
• Manejar loading state mientras verifica autenticación.
Verificación: Componente redirige correctamente a login si no autenticado.
INSTRUCCIÓN:
Crear Higher-Order Component para proteger rutas. En ProtectedRoute.js, importar useAuth y useRouter. Componente
recibe children como prop. Usar useAuth para obtener user y loading. Si loading=true, mostrar CircularProgress centrado
(auth aún verificando). Si loading=false y user=null, ejecutar router.push('/login') para redirigir. Si user existe, retornar
children. Exportar componente. Este componente envolverá páginas que requieren autenticación (elections, vote)
garantizando que solo usuarios logueados accedan. Uso: <ProtectedRoute><ContenidoProtegido /></ProtectedRoute>.
PASO C13: Creación de página de lista de elecciones
Objetivo: Mostrar elecciones activas disponibles para votar.
Acciones:
• Crear archivo: app/elections/page.js.
• Envolver contenido con ProtectedRoute.

• Obtener elecciones con getElections() al montar componente.
• Mostrar cada elección en Card con: título, descripción, fechas.
• Botón "Votar" que navega a /elections/[id]/vote.
• Botón "Ver Resultados" que navega a /elections/[id]/results.
• Manejar loading state.
• Manejar caso de lista vacía.
Verificación: Lista de elecciones se muestra correctamente con datos del backend.
INSTRUCCIÓN:
Crear página de lista de elecciones en app/elections/page.js. Usar ProtectedRoute para proteger acceso. Crear estado
elections y loading. useEffect llama electionService.getElections(), guarda resultados en estado. Si loading, mostrar
CircularProgress. Si elections.length === 0, mostrar Typography "No hay elecciones activas". Si hay elecciones, mapear
con Grid de Cards. Cada Card muestra: Typography variant="h5" con election.title, Typography con election.description,
Typography con fechas (formatear con new Date), Stack con botones "Votar" (navega a /elections/${election.id}/vote) y "Ver
Resultados" (navega a /elections/${election.id}/results). Diseño responsivo con Grid cols={1} sm={2} md={3}. Esta página es
hub principal tras login.
PASO C14: Creación de página de votación
Objetivo: Implementar interfaz para emitir voto.
Acciones:
• Crear archivo: app/elections/[id]/vote/page.js.
• Usar ProtectedRoute.
• Obtener ID de elección desde params.
• Obtener detalle de elección con candidatos.
• Verificar si usuario ya votó con hasVoted().
• Si ya votó: mostrar mensaje de confirmación sin formulario.
• Si no ha votado: mostrar RadioGroup con candidatos.
• Botón "Confirmar Voto" que llama castVote().
• Mostrar Dialog de confirmación antes de enviar.
• Tras voto exitoso, actualizar estado para mostrar confirmación.
Verificación: Interfaz permite votar una vez y previene doble votación.
INSTRUCCIÓN:
Crear página de votación en app/elections/[id]/vote/page.js. Next.js App Router proporciona params con id dinámico. Usar
ProtectedRoute. Estados: election, candidates, selectedCandidate, hasVoted, loading, confirmDialog. useEffect obtiene
election detail y verifica hasVoted(params.id). Si hasVoted=true, mostrar Alert success "Ya has votado en esta elección" y
botón para ver resultados. Si hasVoted=false, mostrar título de elección, RadioGroup con FormControlLabel por cada
candidato mostrando avatar/foto, nombre, descripción. Botón "Votar" deshabilitado si no hay selección. Al hacer clic, abrir
Dialog de confirmación "¿Confirmar voto por [candidato]?". Al confirmar, llamar castVote(electionId, selectedCandidate),
si exitoso setear hasVoted=true para actualizar UI. Manejar errores mostrando Alert. Esta página es núcleo funcional del
sistema.
PASO C15: Creación de página de resultados
Objetivo: Mostrar resultados de elección en tiempo real.
Acciones:
• Crear archivo: app/elections/[id]/results/page.js.
• Obtener ID de elección desde params.
• Obtener resultados con getResults(id).
• Implementar polling: actualizar resultados cada 10 segundos.
• Mostrar resultados en Table con nombre de candidato, votos, porcentaje.
• Mostrar gráfico de barras con Recharts.
• Mostrar total de votos emitidos.
• Detener polling al desmontar componente.

Verificación: Resultados se muestran y actualizan automáticamente.
INSTRUCCIÓN:
Crear página de resultados en app/elections/[id]/results/page.js. Estados: results, election, loading. Función fetchResults()
llama getResults(params.id) y actualiza estado. useEffect llama fetchResults() al montar y configura
setInterval(fetchResults, 10000) para polling cada 10 segundos. useEffect con cleanup retorna () => clearInterval(interval)
para detener polling al desmontar. Renderizar Typography con título de elección, Typography con total de votos. Table con
TableHead (Candidato, Votos, Porcentaje) y TableBody mapeando results con TableRow por candidato. Usar BarChart de
recharts para visualización gráfica con XAxis (nombres), YAxis (votos), Bar. Diseño responsivo. Este componente cumple
requerimiento de "resultados en tiempo real" mediante polling.
PASO C16: Creación de página de historial
Objetivo: Mostrar elecciones pasadas con resultados finales.
Acciones:
• Crear archivo: app/history/page.js.
• Obtener historial con getHistory().
• Mostrar cada elección en Accordion expandible.
• Información visible: título, fecha de cierre.
• Al expandir: mostrar resultados finales completos.
• Destacar ganador (candidato con más votos).
• Ordenar por fecha descendente.
Verificación: Historial muestra elecciones cerradas con resultados correctos.
INSTRUCCIÓN:
Crear página de historial en app/history/page.js. Estado: history, loading. useEffect llama resultService.getHistory().
Mapear history con Accordion por cada elección. AccordionSummary muestra Typography con election.title y fecha de
cierre formateada. AccordionDetails muestra resultados: List con ListItem por candidato mostrando nombre y votos.
Identificar ganador (candidato con max votos) y mostrar Chip "Ganador" o usar color diferente. Typography con total de
votos. Si history vacío, mostrar mensaje "No hay elecciones finalizadas". Esta página cumple requerimiento de "consultar
historial de votaciones".
PASO C17: Creación de componentes reutilizables
Objetivo: Extraer componentes comunes para evitar duplicación.
Acciones:
• Crear components/ElectionCard.js para mostrar tarjeta de elección.
• Crear components/CandidateCard.js para mostrar tarjeta de candidato.
• Crear components/LoadingSpinner.js para estado de carga centralizado.
• Crear components/ErrorAlert.js para mostrar errores consistentemente.
• Reutilizar estos componentes en páginas existentes.
Verificación: Componentes reutilizables reducen duplicación de código.
INSTRUCCIÓN:
Refactorizar componentes repetidos. ElectionCard recibe election como prop y renderiza Card con título, descripción,
fechas, botones de acción (evita duplicar este código en lista e historial). CandidateCard recibe candidate y renderiza Card
con avatar, nombre, descripción (usado en votación). LoadingSpinner es simplemente CircularProgress centrado en Box.
ErrorAlert recibe message y severity, renderiza Alert de MUI. Importar y usar estos componentes en páginas donde se repite
lógica. Esto mejora mantenibilidad y consistencia visual. Componentes reutilizables son buena práctica de React.
PASO C18: Mejoras de UX - Loading y estados vacíos
Objetivo: Pulir experiencia de usuario con estados de carga y casos vacíos.
Acciones:
• Asegurar que todas las páginas muestren loading spinner mientras cargan datos.
• Implementar estados vacíos con mensajes claros (ej: "No hay elecciones activas").
• Agregar Skeleton de MUI en listas mientras carga (opcional).
• Deshabilitar botones durante envío de formularios.
• Mostrar CircularProgress en botones durante acciones.

Verificación: Aplicación responde visualmente a todos los estados de carga.
INSTRUCCIÓN:
Mejorar feedback visual en toda la aplicación. Revisar cada página que hace peticiones HTTP. Mientras loading=true,
mostrar LoadingSpinner o Skeleton. Cuando data está vacía (elections.length === 0), mostrar Box con Typography y ícono
ilustrativo explicando estado vacío. En formularios (login, register, vote), deshabilitar botón durante envío y mostrar
CircularProgress con <Button disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Enviar'}</Button>. Estas
mejoras dan sensación de aplicación profesional y responsiva.
PASO C19: Mejoras de diseño responsivo
Objetivo: Asegurar que diseño funcione perfectamente en móviles.
Acciones:
• Revisar cada página en tamaños de pantalla diferentes.
• Usar Grid de MUI con breakpoints (xs, sm, md).
• Ajustar padding y spacing para móvil.
• Hacer tablas scrolleables horizontalmente en móvil.
• Probar en DevTools con simulación de dispositivos móviles.
• Ajustar Navbar para colapsar en móvil.
Verificación: Aplicación se ve y funciona bien en desktop, tablet y móvil.
INSTRUCCIÓN:
Validar y mejorar responsividad en todas las páginas. Usar Chrome DevTools (F12) y activar vista de dispositivos móviles.
Probar cada página en tamaños iPhone, iPad, Desktop. Usar sistema de Grid de MUI configurando cols={{ xs: 1, sm: 2, md:
3 }} para que sea 1 columna en móvil, 2 en tablet, 3 en desktop. En Navbar, ocultar texto de enlaces en móvil mostrando
solo íconos, o implementar drawer lateral. En tablas, envolver con Box sx={{ overflowX: 'auto' }} para scroll horizontal.
Ajustar padding con sx={{ px: { xs: 2, md: 4 } }}. Estas mejoras cumplen requerimiento de "responsivo y funcionar en
diferentes dispositivos".
PASO C20: Optimización de imágenes y assets
Objetivo: Optimizar carga de imágenes de candidatos.
Acciones:
• Usar componente Image de Next.js para imágenes.
• Configurar placeholder para fotos de candidatos que no tienen imagen.
• Usar servicio de avatars para generar placeholders (ej: UI Avatars).
• Asegurar que imágenes tengan tamaño apropiado.
• Lazy loading de imágenes.
Verificación: Imágenes cargan eficientemente sin afectar performance.
INSTRUCCIÓN:
Optimizar carga de imágenes. Importar Image de next/image. Usar para fotos de candidatos con width, height, alt
definidos. Next.js optimiza imágenes automáticamente. Para candidatos sin foto, usar placeholder: si
!candidate.photo_url, usar https://ui-avatars.com/api/?name=${candidate.name}&background=random que genera avatar
con iniciales. Configurar loading="lazy" para lazy loading. En Avatar de MUI, usar src={candidate.photo_url || placeholder}.
Esto mejora performance especialmente con muchos candidatos, cumpliendo requerimiento de "tiempos de carga
rápidos".
PASO C21: Manejo de errores global
Objetivo: Implementar manejo consistente de errores de API.
Acciones:
• Crear interceptor de response en axios.js para manejar errores globalmente.
• Mostrar Toast o Snackbar con mensaje de error.
• Instalar notistack (opcional): npm install notistack.
• Configurar SnackbarProvider en layout.
• Usar enqueueSnackbar para mostrar errores.
Verificación: Errores de API se muestran de forma consistente al usuario.

INSTRUCCIÓN:
Implementar manejo centralizado de errores. Opción simple: en cada servicio, catch de error retorna mensaje claro.
Opción avanzada: instalar notistack, envolver app con SnackbarProvider en layout, crear interceptor en axios.js que en
response error ejecute enqueueSnackbar(error.response?.data?.message || 'Error', { variant: 'error' }). Esto muestra
notificación toast en esquina cuando cualquier petición falla. Permite remover código repetitivo de try-catch en
componentes. Mejora UX mostrando errores de forma no intrusiva.
PASO C22: Validación de formularios
Objetivo: Mejorar validación de inputs en formularios.
Acciones:
• En formulario de registro, validar formato de email con regex.
• Validar longitud mínima de password.
• Mostrar errores de validación debajo de campos con helperText.
• Validar en tiempo real (onBlur) para feedback inmediato.
• Deshabilitar submit si validaciones no pasan.
Verificación: Formularios muestran errores de validación claramente.
INSTRUCCIÓN:
Mejorar validación de formularios. En página de registro, crear estados: emailError, passwordError, passwordConfirmError.
Crear función validateEmail(email) que verifica regex. onBlur de TextField de email, ejecutar validación y setear emailError.
Mostrar error con prop error={!!emailError} helperText={emailError}. Similarmente para password (longitud mínima 6
caracteres) y confirmación (coincide con password). Botón de submit deshabilitado si hay errores. Esto previene envíos
inválidos y mejora UX con feedback inmediato. Similar lógica para otros formularios.
PASO C23: Configuración para producción
Objetivo: Preparar frontend para deployment en Vercel.
Acciones:
• Crear archivo .env.production con URL de backend de Railway:
• NEXT_PUBLIC_API_URL=https://[dominio-railway].railway.app/api
• Verificar que build de producción funcione: npm run build.
• Corregir errores de build si existen.
• Verificar que no haya console.logs innecesarios.
• Configurar metadatos en layout para SEO.
Verificación: Build de producción se completa sin errores.
INSTRUCCIÓN:
Preparar frontend para producción. Crear .env.production con NEXT_PUBLIC_API_URL apuntando a URL de Railway del
backend (obtenida en PLAN B). Ejecutar npm run build localmente para detectar errores antes de desplegar. Next.js
optimiza código, genera páginas estáticas donde es posible (SSG), y compila todo. Si hay errores (componentes no
importados, hooks mal usados), corregir. Revisar código y remover console.log innecesarios (dejar solo los críticos). En
layout.js, configurar metadata con título descriptivo y descripción para SEO. Una vez build exitoso, frontend está listo para
Vercel.
PASO C24: Deployment en Vercel
Objetivo: Desplegar frontend en producción.
Acciones:
• Crear cuenta en Vercel (https://vercel.com).
• Conectar con cuenta de GitHub.
• Importar repositorio.
• Configurar Root Directory como frontend si repo contiene backend también.
• Configurar variable de entorno: NEXT_PUBLIC_API_URL con URL de Railway.
• Ejecutar deployment.
• Vercel detecta Next.js automáticamente.
• Obtener URL de producción.

Verificación: Frontend accesible en URL de Vercel.
INSTRUCCIÓN:
Desplegar frontend en Vercel. Crear cuenta vinculada a GitHub. Click en "New Project", seleccionar repositorio. Si repo
tiene estructura con /frontend y /backend, configurar "Root Directory" como frontend en settings. Vercel detecta Next.js
automáticamente configurando build command (npm run build) y output directory (.next). En Environment Variables,
agregar NEXT_PUBLIC_API_URL con valor de URL del backend en Railway (ej: https://voting-backend.railway.app/api).
Deploy automáticamente. Vercel asigna URL (ej: voting-app.vercel.app). Acceder a URL y validar que aplicación carga. Si
hay errores, revisar logs de deployment en Vercel dashboard.
PASO C25: Actualización de CORS en backend
Objetivo: Permitir peticiones desde dominio de Vercel.
Acciones:
• Acceder a dashboard de Railway.
• Ir a variables de entorno del proyecto backend.
• Actualizar CORS_ALLOWED_ORIGINS agregando URL de Vercel.
• Formato: https://voting-app.vercel.app.
• Re-desplegar backend si no actualiza automáticamente.
• Validar que frontend pueda hacer peticiones.
Verificación: Frontend en Vercel puede comunicarse con backend en Railway sin errores CORS.
INSTRUCCIÓN:
Actualizar configuración CORS del backend para aceptar peticiones desde Vercel. En Railway dashboard del backend, ir a
Variables. Editar CORS_ALLOWED_ORIGINS. Si antes estaba vacío o en "http://localhost:3000", reemplazar con URL

completa de Vercel incluyendo https://. Si se necesitan múltiples orígenes, separar con comas. Railway puede re-
desplegar automáticamente al cambiar env vars. Validar accediendo a frontend en Vercel, intentar login - si funciona,

CORS está configurado correctamente. Si muestra error "blocked by CORS policy", revisar variable. Esta configuración es
crítica para comunicación frontend-backend en producción.
PASO C26: Testing en producción
Objetivo: Validar funcionamiento completo en ambiente de producción.
Acciones:
• Acceder a URL de Vercel desde diferentes dispositivos.
• Probar flujo completo: registro → login → votación → resultados → historial.
• Validar responsividad en móvil real.
• Probar en diferentes navegadores (Chrome, Firefox, Safari).
• Validar tiempos de carga.
• Verificar que imágenes carguen correctamente.
• Probar con múltiples usuarios simultáneos.
Verificación: Sistema completo funciona en producción sin errores.
INSTRUCCIÓN:
Realizar testing exhaustivo en producción. Acceder a URL de Vercel desde computadora, tablet y celular real. Ejecutar flujo
completo de usuario: crear cuenta nueva, hacer login, ver elecciones, votar en una elección, ver resultados actualizados,

consultar historial. Validar que navegación sea fluida. Probar en Chrome, Firefox y Safari para compatibilidad cross-
browser. Validar que diseño sea responsivo en todas las resoluciones. Verificar tiempos de carga aceptables (Next.js

optimiza automáticamente). Pedir a compañeros probar simultáneamente para validar concurrencia. Anotar cualquier
error y corregir. Esta validación final confirma que sistema está listo para presentación.
PASO C27: Optimizaciones finales
Objetivo: Pulir detalles finales de performance y UX.
Acciones:
• Verificar que no haya warnings en consola del navegador.
• Agregar meta tags para redes sociales (Open Graph).
• Configurar favicon personalizado.
• Optimizar polling de resultados (pausar si usuario no está en la página).

• Agregar transiciones suaves entre páginas si se desea.
• Verificar accesibilidad básica (labels, alt texts).
Verificación: Aplicación pulida sin warnings y con detalles profesionales.
INSTRUCCIÓN:
Realizar optimizaciones finales. Abrir DevTools en producción y revisar consola - no debe haber warnings de React (keys
faltantes, etc.). En layout.js metadata, agregar openGraph con título, descripción, imagen para compartir en redes
sociales. Agregar favicon.ico en public/ o configurar en metadata. En página de resultados, modificar polling para solo
ejecutar si document.visibilityState === 'visible' (pausar cuando usuario cambia de pestaña) - ahorra recursos. Verificar
que todos los img tengan alt text y form fields tengan labels apropiados (accesibilidad). Estas mejoras dan toque
profesional final.
PASO C28: Documentación del frontend
Objetivo: Documentar estructura, instalación y uso del frontend.
Acciones:
• Crear archivo README_FRONTEND.md en directorio frontend.
• Documentar tecnologías utilizadas.
• Documentar estructura de directorios.
• Documentar variables de entorno necesarias.
• Documentar comandos de desarrollo y build.
• Documentar URL de producción.
• Incluir screenshots de funcionalidades principales.
Verificación: README completo y claro.
INSTRUCCIÓN:
Crear documentación del frontend. README_FRONTEND.md debe incluir: Título "Frontend - Sistema de Votaciones",
descripción breve, tecnologías (Next.js 14, React 18, Material UI, Axios, Recharts), estructura de directorios explicada (app/
- páginas, components/ - componentes reutilizables, services/ - API calls, context/ - estado global), instalación (npm
install, configurar .env.local, npm run dev), variables de entorno necesarias (NEXT_PUBLIC_API_URL), comandos (dev,
build, start), URL de producción en Vercel, sección de funcionalidades con screenshots. Capturar pantallas de landing,
login, votación, resultados. Esta documentación facilita evaluación y comprensión del proyecto.
PASO C29: Preparación de demo y presentación
Objetivo: Preparar material para demostración del sistema completo.
Acciones:
• Grabar video corto (3-5 min) mostrando flujo completo del sistema.
• Capturar screenshots de todas las funcionalidades.
• Preparar datos de prueba en producción (elección activa con candidatos).
• Crear usuarios de prueba para demostrar en vivo.
• Anotar credenciales de demo en documento seguro.
• Practicar presentación del flujo completo.
Verificación: Material de demo preparado y flujo ensayado.
INSTRUCCIÓN:
Preparar demostración del sistema. Usar herramienta de grabación de pantalla (OBS, Loom, QuickTime) para grabar video
mostrando: acceso a landing, registro de usuario, login, navegación a elecciones, votación completa, visualización de
resultados actualizados, consulta de historial, acceso a panel admin. Narrar brevemente cada paso. Capturar screenshots
en alta resolución de cada página. En producción (Supabase), asegurar que haya al menos una elección activa con 3-4
candidatos. Crear usuario de prueba (demo@test.com / password123) para usar en presentación. Practicar flujo completo
para hacerlo fluido. Este material será usado en defensa del proyecto.
PASO C30: Validación final contra requisitos
Objetivo: Confirmar cumplimiento de todos los requerimientos del proyecto.
Acciones:
• Revisar checklist de requisitos funcionales:
o ✓ Usuario puede registrarse e iniciar sesión.

o ✓ Sistema permite votar por candidatos.
o ✓ Usuario puede ver resultados en tiempo real.
o ✓ Administradores pueden gestionar candidatos y votaciones.
o ✓ Se puede consultar historial de votaciones.
• Revisar checklist de requisitos no funcionales:
o ✓ Página responsiva en diferentes dispositivos.
o ✓ Tiempos de carga rápidos (Next.js optimizado).
o ✓ Seguridad de datos (JWT, HTTPS).
o ✓ Diseño con Material UI moderno y consistente.
o ✓ Código modular y mantenible.
• Documentar cumplimiento completo.
Verificación: Todos los requisitos cumplidos y documentados.
INSTRUCCIÓN:
Realizar validación final sistemática contra requisitos originales del proyecto. Crear checklist en documento. Requisitos
funcionales: (1) Registro/Login - implementado en /register y /login con autenticación JWT, (2) Votación - implementada en
/elections/[id]/vote con validación de un voto por usuario, (3) Resultados tiempo real - implementados en
/elections/[id]/results con polling cada 10 segundos, (4) Gestión admin - implementada con Django Admin accesible, (5)
Historial - implementado en /history con elecciones cerradas. Requisitos no funcionales: (1) Responsivo - validado en
múltiples dispositivos, (2) Carga rápida - Next.js SSR y optimizaciones, (3) Seguridad - JWT para auth, HTTPS en producción,
validaciones en backend, (4) Material UI - todos los componentes usan MUI, diseño consistente, (5) Código modular -
componentes reutilizables, servicios separados, contexto para estado. Confirmar 100% de cumplimiento. Proyecto
completo y exitoso.

ENTREGABLE DEL PLAN C
Al finalizar este plan se debe tener:
• Proyecto Next.js configurado y estructurado
• Material UI integrado con tema personalizado
• Sistema de autenticación con Context API
• Servicios de API para consumir backend
• Página de landing profesional
• Página de registro funcional
• Página de login funcional
• Página de lista de elecciones
• Página de votación con validaciones
• Página de resultados en tiempo real
• Página de historial de elecciones
• Navbar responsivo y dinámico
• Componentes reutilizables implementados
• Diseño completamente responsivo
• Optimizaciones de UX y performance
• Frontend desplegado en Vercel
• Integración completa con backend de Railway
• Testing en producción exitoso
• Documentación completa
• Material de demo preparado

• Frontend 100% completo y funcional

ENTREGABLE FINAL DEL PROYECTO COMPLETO
Al completar los 3 PLANES se tendrá:
BASE DE DATOS (Supabase)
• Esquema completo de 5 tablas diseñadas correctamente.
• Relaciones y constraints configuradas.
• Datos de prueba poblados coherentemente.
• Base de datos accesible y funcional.
BACKEND (Django + Railway)
• API REST completa con todos los endpoints requeridos.
• Sistema de autenticación JWT seguro.
• Lógica de votación con validaciones críticas.
• Django Admin para gestión administrativa.
• Tests automatizados implementados.
• Backend desplegado y accesible.
• Documentación de API completa.
FRONTEND (Next.js + Vercel)
• Interfaz de usuario completa e intuitiva.
• Diseño responsivo con Material UI.
• Todas las funcionalidades implementadas.
• Integración completa con backend.
• Frontend desplegado y accesible.
• Experiencia de usuario optimizada.
SISTEMA COMPLETO
• Flujo end-to-end funcionando en producción.
• Cumplimiento 100% de requisitos funcionales y no funcionales.
• Código limpio, modular y documentado.
• Sistema listo para presentación y evaluación.
• URLs de producción: Frontend (Vercel) + Backend (Railway) + BD (Supabase).

ORDEN DE EJECUCIÓN RECOMENDADO
1. PLAN A (Base de Datos) - 4-6 horas
Completar al 100% antes de continuar.
2. PLAN B (Backend) - 16-20 horas
Completar al 100% y validar endpoints antes de continuar.
3. PLAN C (Frontend) - 16-20 horas
Consumir API ya validada del backend.
Tiempo total estimado: 36-46 horas de trabajo efectivo

VENTAJAS DE ESTE ENFOQUE SECUENCIAL
• Enfoque claro: Una capa a la vez, sin distracciones.
• Validación progresiva: Cada capa 100% sólida antes de continuar.
• Menos retrabajo: BD estable → Backend estable → Frontend consume API ya probada.

• Curva de aprendizaje suave: Dominar una tecnología por vez.
• Deployment gradual: BD lista → Backend desplegado y probado → Frontend integra.
• Debugging más simple: Problemas aislados por capa.
• Motivación sostenida: Logros verificables al completar cada plan.

Resultado: Sistema completo, funcional, desplegado, documentado y listo para obtener calificación máxima.

FIN DE LOS PLANES DE DESARROLLO ESTRATÉGICO
BASE DE DATOS → BACKEND → FRONTEND