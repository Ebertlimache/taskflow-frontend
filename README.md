# TaskFlow — Frontend

Aplicación web de gestión de tareas con autenticación JWT. Parte del proyecto **TaskFlow** (React + Node.js), pensado como demo full-stack para desarrollo freelance: login, registro, CRUD de tareas y consumo de API REST.

Repositorio backend: [taskflow-backend](https://github.com/Ebertlimache/taskflow-backend)

---

## Funcionalidades

- Registro e inicio de sesión (JWT)
- Rutas protegidas y rutas solo para invitados
- Dashboard con contadores (total / completadas / pendientes)
- Lista de tareas con filtros (all / pending / completed)
- Crear, editar título, marcar completada y **eliminar** tareas
- Manejo de errores de API y estados de carga
- Layout responsive (sidebar + menú móvil)

---

## Stack

- React 19
- Vite 5
- React Router 7
- Axios
- Tailwind CSS 3
- Lucide React (iconos)

---

## Arquitectura

```
src/
  pages/          # Login, Register, Dashboard, Tasks
  components/     # UI reutilizable (TaskList, Modal, layout…)
  routes/         # ProtectedRoute, GuestOnly
  services/       # authService, taskService (HTTP + token)
  hooks/          # useAuth
```

Flujo de autenticación:

1. El usuario hace login/register → la API responde `{ token, user }`.
2. El frontend guarda el token y el usuario en `localStorage`.
3. Las rutas privadas comprueban si existe token.
4. Las peticiones a `/tasks` envían `Authorization: Bearer <token>`.
5. Si la API responde `401`, se limpia la sesión y se redirige a `/login`.

---

## Variables de entorno

Copia `.env.example` a `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

| Variable | Descripción |
|----------|-------------|
| `VITE_API_BASE_URL` | URL base del backend (sin slash final obligatorio; axios concatena rutas) |

**Backend local (desarrollo):** `http://localhost:3000`  
**Backend en producción (Railway):** actualizar cuando el servicio esté desplegado.  
La URL anterior `https://taskflow-backend-production-ab92.up.railway.app` actualmente responde `404 Application not found` (servicio no disponible en Railway). Tras redesplegar, actualiza este valor y `.env.example`.

---

## Cómo ejecutar localmente

Requisitos: Node.js 18+ y el [backend](https://github.com/Ebertlimache/taskflow-backend) corriendo.

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API
cp .env.example .env
# Edita VITE_API_BASE_URL si hace falta

# 3. Modo desarrollo
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | ESLint |

---

## Enlace al backend

- Código: https://github.com/Ebertlimache/taskflow-backend
- Health check (cuando esté desplegado): `GET {VITE_API_BASE_URL}/health` → `{ "ok": true }`

---

## Screenshots

No hay capturas en el repositorio todavía. Tras el deploy del frontend se pueden añadir en `/docs` o en este README.

---

## Notas para revisores / clientes

Este frontend demuestra integración real con una API REST (auth + CRUD), manejo de sesión, estados de UI y operaciones asíncronas con feedback de error/loading — el tipo de trabajo habitual en mantenimiento y bug-fixes de apps React.
