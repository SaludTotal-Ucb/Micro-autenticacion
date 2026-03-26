# 🔐 Microservicio de Autenticación Básica

Este microservicio proporciona autenticación básica con login y registro de usuarios, utilizando JWT para la gestión de sesiones.

## � Requisitos Previos

- **Node.js:** v20+ 
- **npm:** 9+
- **PostgreSQL:** 14+

## 🚀 Instalación y Setup

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Base de Datos

**Opción A: PostgreSQL Local**

Asegúrate de que PostgreSQL está corriendo en tu máquina:

```bash
# En macOS con Homebrew
brew services start postgresql@15

# Crear la base de datos
createdb salud_total
```

**Opción B: Base de Datos Remota (Neon)**

Usa [Neon](https://neon.tech) para una BD PostgreSQL serverless sin instalación local.

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Luego edita `.env` con tus credenciales:

```env
# Server
PORT=3001
NODE_ENV=development

# Database (reemplaza 'mayuminina' con tu usuario de PostgreSQL)
DATABASE_URL=postgresql://mayuminina@localhost:5432/salud_total

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_2026
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

### 4. Ejecutar Migraciones de Prisma

```bash
# Crear las tablas en la BD
npx prisma migrate dev --name init

# Generar Prisma Client
npx prisma generate
```

### 5. Cargar Datos de Prueba (Seed)

```bash
# Opción A: Usando npm script
npm run prisma:seed

# Opción B: Directamente con tsx
npx tsx prisma/seed.ts
```

Esto creará 3 usuarios de prueba:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@saludtotal.bo | 12345678 | ADMIN |
| doctor@saludtotal.bo | 12345678 | DOCTOR |
| paciente@saludtotal.bo | 12345678 | PATIENT |

## 🎯 Iniciar el Servidor

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3001**

## 🧪 Probar los Endpoints

### Login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@saludtotal.bo",
    "password": "12345678"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Bienvenido al sistema Salud Total",
  "data": {
    "user": {
      "id": "123",
      "name": "Admin Salud Total",
      "email": "admin@saludtotal.bo",
      "role": "ADMIN"
    },
    "token": "eyJhbGc..."
  }
}
```

### Obtener Perfil (Requiere JWT)

```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer <tu_token>"
```

### Logout

```bash
curl -X POST http://localhost:3001/auth/logout \
  -H "Authorization: Bearer <tu_token>"
```

### Registrar Usuario

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Secure123"
  }'
```

### Recuperar Contraseña

```bash
curl -X POST http://localhost:3001/auth/recover-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@saludtotal.bo"
  }'
```

## 📚 Endpoints Disponibles

### Públicos (Sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/recover-password` | Recuperar contraseña |

### Protegidos (Requieren JWT)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/auth/profile` | Obtener perfil del usuario | Todos |
| POST | `/auth/logout` | Cerrar sesión | Todos |
| GET | `/auth/admin/users` | Gestionar usuarios | ADMIN |
| GET | `/auth/doctor/appointments` | Ver citas | DOCTOR |

## 🔐 Envío de JWT en Requests

Todos los endpoints protegidos requieren el token en el header:

```bash
Authorization: Bearer <tu_token_jwt>
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev         # Iniciar servidor con hot-reload

# Build y Testing
npm run build       # Compilar TypeScript
npm run lint        # Ejecutar Biome linter
npm run format      # Formatear código

# Prisma
npm run prisma:migrate    # Ejecutar migraciones
npm run prisma:seed       # Cargar datos de prueba
npm run db:setup          # Migrar + Seed (todo en uno)
```

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Lógica HTTP (Request/Response)
├── services/           # Lógica de negocio y BD
├── middleware/         # Autenticación, validación, roles
├── routes/            # Definición de endpoints
├── schemas/           # Validación con Zod
└── server.ts         # Entry point

prisma/
├── schema.prisma     # Modelo de datos
└── seed.ts          # Datos iniciales

migrations/          # Historial de cambios BD
```

## 🔄 Flujo de Autenticación

1. **Login**: Usuario envía email + password
2. **Validación**: Se verifica contra BD y se genera JWT
3. **Request Protegida**: Cliente envía JWT en header Authorization
4. **Middleware**: Se verifica JWT y se extrae usuario
5. **Roles**: Se valida que el usuario tenga permisos

## 🌍 Conectar con Frontend

El backend acepta requests desde:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Puerto alternativo)

En tu frontend, usa:

```typescript
const API_BASE_URL = 'http://localhost:3001';

const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

## ⚙️ Tecnologías Utilizadas

* **Runtime:** Node.js 20+
* **Lenguaje:** TypeScript
* **Framework Web:** Express.js
* **Base de Datos:** PostgreSQL
* **ORM:** Prisma
* **Validación:** Zod
* **Autenticación:** JWT + bcryptjs
* **Linting:** Biome
* **Executor:** tsx

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3001 |
| NODE_ENV | Entorno (development/production) | development |
| DATABASE_URL | URL de conexión PostgreSQL | postgresql://user:pass@localhost/db |
| JWT_SECRET | Clave para firmar tokens | tu_clave_secreta |
| JWT_EXPIRES_IN | Expiración del token | 7d |
| FRONTEND_URL | URL del frontend (CORS) | http://localhost:5173 |

## 🐛 Troubleshooting

### Error: "ECONNREFUSED" al conectar BD

**Solución:** Verifica que PostgreSQL esté corriendo:

```bash
# macOS Homebrew
brew services start postgresql@15

# O verifica el estado
brew services list
```

### Error: "Module not found" al compilar

**Solución:** Regenera los types de Prisma:

```bash
npx prisma generate
npm install
```

### Error: "JWT_SECRET no está configurado"

**Solución:** Asegúrate de tener `.env` correctamente configurado:

```bash
cp .env.example .env
# Edita .env con tus valores
```

### Error: "Port 3001 already in use"

**Solución:** Cambia el puerto en `.env` o mata el proceso:

```bash
# Mac/Linux: Encontrar proceso en puerto 3001
lsof -i :3001

# Matar el proceso
kill -9 <PID>
```

## 📚 Documentación Adicional

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Zod Validation](https://zod.dev/)
- [JWT.io](https://jwt.io/)

## 👥 Equipo

Sistema Salud Total Bolivia - 2026

## 📄 Licencia
