import psycopg2
from datetime import datetime, timedelta
import uuid

# Conectar a Supabase
conn_string = "postgresql://postgres.snyryderudxskpwgiict:BASEamrm27*@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
conn = psycopg2.connect(conn_string)
cur = conn.cursor()

print("🔧 Creando datos de prueba...")

# 1. Crear elección activa
election_id = str(uuid.uuid4())
start_date = datetime.now() - timedelta(days=1)  # Comenzó ayer
end_date = datetime.now() + timedelta(days=7)    # Termina en 7 días

cur.execute("""
    INSERT INTO elections (id, title, description, start_date, end_date, status, results_public, created_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT DO NOTHING
    RETURNING id;
""", (
    election_id,
    'Elección de Representante Estudiantil 2025',
    'Votación para elegir al nuevo representante estudiantil del curso académico 2025',
    start_date,
    end_date,
    'active',
    True,
    datetime.now()
))

result = cur.fetchone()
if result:
    print(f"✅ Elección creada: {election_id}")
else:
    print("⚠️ Elección ya existe")

# 2. Crear candidatos
candidates = [
    {
        'name': 'Ana García Martínez',
        'description': 'Estudiante de 4to año con experiencia en liderazgo estudiantil. Propuestas: mejora de instalaciones, eventos deportivos y culturales.',
        'party_group': 'Movimiento Estudiantil Progresista',
        'order': 1
    },
    {
        'name': 'Carlos Rodríguez López',
        'description': 'Representante de clase con enfoque en tecnología educativa. Propuestas: digitalización de procesos, aulas virtuales, becas tecnológicas.',
        'party_group': 'Futuro Digital',
        'order': 2
    },
    {
        'name': 'María Fernández Ruiz',
        'description': 'Delegada de año con experiencia en gestión comunitaria. Propuestas: espacios de estudio, tutorías gratuitas, bienestar estudiantil.',
        'party_group': 'Unidos por la Educación',
        'order': 3
    }
]

for candidate in candidates:
    candidate_id = str(uuid.uuid4())
    cur.execute("""
        INSERT INTO candidates (id, election_id, name, description, party_group, display_order, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING;
    """, (
        candidate_id,
        election_id,
        candidate['name'],
        candidate['description'],
        candidate['party_group'],
        candidate['order'],
        datetime.now()
    ))
    print(f"✅ Candidato creado: {candidate['name']}")

# 3. Crear elección cerrada (para historial)
closed_election_id = str(uuid.uuid4())
closed_start = datetime.now() - timedelta(days=30)
closed_end = datetime.now() - timedelta(days=23)

cur.execute("""
    INSERT INTO elections (id, title, description, start_date, end_date, status, results_public, created_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT DO NOTHING;
""", (
    closed_election_id,
    'Elección de Delegado de Curso 2024',
    'Votación finalizada para elección de delegado del curso 2024',
    closed_start,
    closed_end,
    'closed',
    True,
    closed_start
))
print(f"✅ Elección cerrada creada: {closed_election_id}")

# Candidatos para elección cerrada
closed_candidates = [
    {'name': 'Pedro Sánchez', 'votes': 45},
    {'name': 'Laura González', 'votes': 62},
    {'name': 'Miguel Torres', 'votes': 28}
]

for candidate in closed_candidates:
    candidate_id = str(uuid.uuid4())
    cur.execute("""
        INSERT INTO candidates (id, election_id, name, description, party_group, display_order, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """, (
        candidate_id,
        closed_election_id,
        candidate['name'],
        f'Candidato en elección cerrada',
        'Independiente',
        1,
        closed_start
    ))
    
    # Agregar votos
    for _ in range(candidate['votes']):
        vote_id = str(uuid.uuid4())
        cur.execute("""
            INSERT INTO votes (id, election_id, candidate_id, cast_at)
            VALUES (%s, %s, %s, %s);
        """, (vote_id, closed_election_id, candidate_id, closed_end - timedelta(hours=1)))
    
    print(f"✅ Candidato cerrado creado con {candidate['votes']} votos: {candidate['name']}")

# Commit
conn.commit()
cur.close()
conn.close()

print("\n✅ ¡Datos de prueba creados exitosamente!")
print(f"\n📊 RESUMEN:")
print(f"- 1 elección ACTIVA con 3 candidatos")
print(f"- 1 elección CERRADA con 3 candidatos y 135 votos totales")
print(f"\n🔗 Recarga http://localhost:3000/elections para ver las elecciones")
