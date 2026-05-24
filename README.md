# 🍽️ TABLE-TRACK · Gestor de Reservas

Sistema de gestión de reservas para restaurantes. Aplicación SPA construida con React + Vite para prueba técnica de Desarrollador Frontend Junior.

---

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **React 18 + Vite** | Framework + bundler |
| **react-router-dom v6** | Routing + protected routes |
| **Tailwind CSS v3** | Estilos responsive |
| **SweetAlert2** | Confirmaciones y alertas |
| **Axios** | Peticiones HTTP |
| **LocalStorage** | Sesión simulada |

---

## 📁 Arquitectura

```
src/
 ├── components/
 │    ├── ReservationCard.jsx    # Card individual de reserva
 │    ├── ReservationForm.jsx    # Modal de crear/editar
 │    ├── Header.jsx             # Barra de navegación
 │    ├── FilterButtons.jsx      # Filtros por estado
 │    ├── Loader.jsx             # Spinner + skeleton cards
 │    └── EmptyState.jsx         # Estado vacío
 │
 ├── pages/
 │    ├── Login.jsx              # Página de login
 │    └── Panel.jsx              # Dashboard principal
 │
 ├── routes/
 │    └── ProtectedRoute.jsx     # Guard de rutas privadas
 │
 ├── services/
 │    └── reservationService.js  # Todas las llamadas HTTP
 │
 ├── hooks/
 │    └── useReservations.js     # Hook CRUD de reservas
 │
 ├── utils/
 │    └── storage.js             # Helpers de LocalStorage
 │
 ├── layouts/
 │    └── DashboardLayout.jsx    # Layout base del panel
 │
 ├── App.jsx                     # Router principal
 └── main.jsx                    # Entry point
```

---

## ⚙️ Configuración

### 1. Clonar e instalar

```bash
git clone <repo>
cd table-track
npm install
```

### 2. Configurar la API (MockAPI)

1. Crea un proyecto en [mockapi.io](https://mockapi.io)
2. Crea el recurso `/reservations` con el schema:

```json
{
  "id": "autoincrement",
  "nombreCliente": "string",
  "fechaHora": "datetime",
  "cantidadPersonas": "number",
  "estado": "Confirmada | En Espera | Finalizada"
}
```

3. Reemplaza la URL en `src/services/reservationService.js`:

```js
const BASE_URL = 'https://TU_PROYECTO.mockapi.io/api/v1'
```

### 3. Ejecutar

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 🔑 Funcionalidades

### Login
- Nombre completo + selección de turno (Mañana / Tarde / Noche)
- Sesión guardada en LocalStorage
- Redirección automática si ya hay sesión activa
- Protección de rutas privadas

### Dashboard
- Estadísticas de reservas por estado
- Filtros rápidos: Todas / Confirmadas / En Espera / Finalizadas
- Refresh manual de datos

### CRUD de Reservas
- **Crear**: Modal con validaciones (nombre y personas obligatorios)
- **Editar**: Modifica fecha, cantidad y estado
- **Finalizar**: Botón rápido → cambia estado a "Finalizada"
- **Eliminar**: Confirmación con SweetAlert2 + alerta de éxito

### Estados con colores
| Estado | Color |
|---|---|
| Confirmada | 🟢 Verde |
| En Espera | 🟡 Amarillo/Ámbar |
| Finalizada | ⚫ Gris |

---

## 🏗️ Decisiones de diseño

- **Sin Context API ni Redux** — estado local con `useState` y custom hook `useReservations`
- **Sin TypeScript** — JavaScript puro con código legible
- **Async/await con try/catch** en todas las peticiones
- **Mobile-first** — responsive desde 320px
- **Skeleton loaders** durante la carga inicial

---

## 📝 Scripts disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview del build
```

---

## 🌿 GitFlow sugerido

```
main
└── develop
     ├── feature/login
     ├── feature/panel-dashboard
     ├── feature/reservation-crud
     └── feature/filters
```
