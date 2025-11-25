import psycopg2
import os

# Conectar a Supabase (conexión directa sin pgbouncer)
conn_string = "postgresql://postgres.snyryderudxskpwgiict:BASEamrm27*@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
conn = psycopg2.connect(conn_string)
cur = conn.cursor()

print("=" * 80)
print("SCHEMA DE TABLA: users")
print("=" * 80)
cur.execute("""
    SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_name='users' 
    ORDER BY ordinal_position;
""")
for row in cur.fetchall():
    print(f"{row[0]:<20} | {row[1]:<20} | max_len={row[2]} | nullable={row[3]} | default={row[4]}")

print("\n" + "=" * 80)
print("SCHEMA DE TABLA: elections")
print("=" * 80)
cur.execute("""
    SELECT column_name, data_type, character_maximum_length, is_nullable
    FROM information_schema.columns 
    WHERE table_name='elections' 
    ORDER BY ordinal_position;
""")
for row in cur.fetchall():
    print(f"{row[0]:<20} | {row[1]:<20} | max_len={row[2]} | nullable={row[3]}")

print("\n" + "=" * 80)
print("SCHEMA DE TABLA: candidates")
print("=" * 80)
cur.execute("""
    SELECT column_name, data_type, character_maximum_length, is_nullable
    FROM information_schema.columns 
    WHERE table_name='candidates' 
    ORDER BY ordinal_position;
""")
for row in cur.fetchall():
    print(f"{row[0]:<20} | {row[1]:<20} | max_len={row[2]} | nullable={row[3]}")

print("\n" + "=" * 80)
print("SCHEMA DE TABLA: vote_registry")
print("=" * 80)
cur.execute("""
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns 
    WHERE table_name='vote_registry' 
    ORDER BY ordinal_position;
""")
for row in cur.fetchall():
    print(f"{row[0]:<20} | {row[1]:<20} | nullable={row[2]}")

print("\n" + "=" * 80)
print("SCHEMA DE TABLA: votes")
print("=" * 80)
cur.execute("""
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns 
    WHERE table_name='votes' 
    ORDER BY ordinal_position;
""")
for row in cur.fetchall():
    print(f"{row[0]:<20} | {row[1]:<20} | nullable={row[2]}")

conn.close()
print("\n✅ Conexión cerrada")
