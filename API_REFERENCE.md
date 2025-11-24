# API Reference - Sistema de Votaciones Backend

**Producción Base URL**: `https://app-votar-production.up.railway.app/api`  
**Local Base URL**: `http://127.0.0.1:8000/api`

## 🔑 Autenticación

Todos los endpoints protegidos requieren JWT token en el header:
```
Authorization: Bearer {access_token}
```

### POST `/register/`
Registrar nuevo usuario.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "full_name": "Nombre Completo"
}
```

**Response 201:**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "full_name": "Nombre Completo",
    "role": "voter",
    "is_active": true
  },
  "tokens": {
    "access": "eyJ...",
    "refresh": "eyJ..."
  }
}
```

### POST `/login/`
Iniciar sesión.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "message": "Login exitoso",
  "user": { ... },
  "tokens": {
    "access": "eyJ...",
    "refresh": "eyJ..."
  }
}
```

### GET `/profile/` 🔒
Obtener perfil del usuario autenticado.

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "full_name": "Nombre Completo",
  "role": "voter",
  "is_active": true,
  "created_at": "2024-01-23T..."
}
```

### POST `/token/refresh/`
Refrescar access token.

**Body:**
```json
{
  "refresh": "eyJ..."
}
```

**Response 200:**
```json
{
  "access": "eyJ..."
}
```

---

## 📋 Elecciones

### GET `/elections/`
Listar todas las elecciones.

**Query Params:**
- `?status=active` - Filtrar por estado (draft/active/closed)

**Response 200:**
```json
[
  {
    "id": "uuid",
    "title": "Elección Estudiantil 2024",
    "description": "Descripción...",
    "start_date": "2024-01-20T00:00:00Z",
    "end_date": "2024-01-27T23:59:59Z",
    "status": "active",
    "results_public": true,
    "is_active": true,
    "created_at": "2024-01-15T..."
  }
]
```

### GET `/elections/{id}/`
Detalle de una elección específica.

**Response 200:**
```json
{
  "id": "uuid",
  "title": "Elección Estudiantil 2024",
  "description": "...",
  "start_date": "2024-01-20T00:00:00Z",
  "end_date": "2024-01-27T23:59:59Z",
  "status": "active",
  "results_public": true,
  "is_active": true,
  "created_at": "2024-01-15T..."
}
```

---

## 👥 Candidatos

### GET `/candidates/`
Listar todos los candidatos.

**Query Params:**
- `?election={uuid}` - Filtrar por elección

**Response 200:**
```json
[
  {
    "id": "uuid",
    "election": "uuid-eleccion",
    "election_title": "Elección Estudiantil 2024",
    "name": "María González",
    "description": "Propuestas...",
    "photo_url": "https://...",
    "party_group": "Movimiento Estudiantil",
    "display_order": 1,
    "created_at": "2024-01-15T..."
  }
]
```

### GET `/candidates/{id}/`
Detalle de un candidato específico.

---

## 🗳️ Votación

### POST `/vote/` 🔒
Emitir un voto.

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "election_id": "uuid-eleccion",
  "candidate_id": "uuid-candidato"
}
```

**Response 201:**
```json
{
  "message": "Voto registrado exitosamente",
  "election": "Elección Estudiantil 2024",
  "candidate": "María González"
}
```

**Errores posibles:**
- `400`: Ya votó en esta elección
- `400`: Elección no está activa
- `400`: Votación no está en periodo válido
- `400`: Candidato no pertenece a la elección

### GET `/has-voted/{election_id}/` 🔒
Verificar si el usuario ya votó en una elección.

**Headers:** `Authorization: Bearer {token}`

**Response 200:**
```json
{
  "has_voted": true,
  "election_id": "uuid",
  "election_title": "Elección Estudiantil 2024",
  "voted_at": "2024-01-22T15:30:00Z"
}
```

---

## 📊 Resultados

### GET `/results/{election_id}/`
Obtener resultados de una elección.

**Response 200:**
```json
{
  "election": {
    "id": "uuid",
    "title": "Elección Estudiantil 2024",
    ...
  },
  "total_votes": 150,
  "results": [
    {
      "candidate_id": "uuid",
      "candidate_name": "María González",
      "candidate_photo": "https://...",
      "party_group": "Movimiento Estudiantil",
      "votes": 85,
      "percentage": 56.67
    },
    {
      "candidate_id": "uuid",
      "candidate_name": "Carlos Rodríguez",
      "candidate_photo": "https://...",
      "party_group": "Lista Verde",
      "votes": 65,
      "percentage": 43.33
    }
  ]
}
```

### GET `/history/`
Obtener historial de elecciones cerradas con resultados.

**Response 200:**
```json
[
  {
    "election": { ... },
    "total_votes": 200,
    "winner": "María González",
    "results": [
      {
        "candidate_name": "María González",
        "votes": 120,
        "percentage": 60.0
      },
      ...
    ]
  }
]
```

---

## 🔐 Códigos de Estado

- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado (registro, voto)
- `400 Bad Request` - Validación fallida
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - Sin permisos
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

---

## 💡 Notas de Implementación Frontend

1. **Tokens JWT**: Almacenar `access_token` y `refresh_token` en localStorage
2. **Interceptor Axios**: Incluir `Authorization: Bearer {token}` automáticamente
3. **Refresh Token**: Implementar lógica de refresh when access token expires (60 min)
4. **Polling Resultados**: Actualizar cada 10-15 segundos en página de resultados
5. **Manejo de Errores**: Capturar errores 401 y redirigir a login
6. **Anonimato**: El sistema garantiza anonimato - no hay forma de rastrear votos a usuarios

---

**Última actualización**: 2024-01-24  
**Versión Backend**: 1.0.0  
**Django**: 4.2.16 | **DRF**: 3.14.0
