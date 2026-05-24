# 🍽️ TABLE-TRACK · Gestor de Reservas

Sistema de gestión de reservas para restaurantes. Aplicación SPA desarrollada como prueba técnica para la vacante de Desarrollador Frontend Junior.

---

## 📋 Descripción

TABLE-TRACK permite a los anfitriones de un restaurante gestionar las reservas de mesas de forma eficiente. Desde la aplicación se puede iniciar sesión, visualizar todas las reservas, crear nuevas, editarlas, finalizarlas y cancelarlas.

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React.js | 18 | Framework principal |
| Vite | 5 | Bundler y servidor de desarrollo |
| react-router-dom | 6 | Enrutamiento y rutas protegidas |
| Tailwind CSS | 3 | Estilos responsive |
| SweetAlert2 | 11 | Alertas y confirmaciones |
| Axios | 1.6 | Peticiones HTTP |
| LocalStorage | — | Sesión simulada |
| MockAPI | — | API REST fake |

---

## 🌐 API

La aplicación consume una API REST creada en MockAPI:

```
https://6a1257a078d0434e0d5d2c58.mockapi.io/api/v1/reservations
```

### Estructura de la entidad Reserva

```json
{
  "id": "1",
  "nombreCliente": "María López",
  "fechaHora": "2026-05-27T20:00",
  "cantidadPersonas": 4,
  "estado": "Confirmada"
}
```

Estados disponibles: `Confirmada` · `En Espera` · `Finalizada`

---

## 📁 Arquitectura del Proyecto

```
src/
 ├── components/
 │    ├── ReservationCard.jsx    # Card individual de reserva
 │    ├── ReservationForm.jsx    # Modal crear/editar
 │    ├── Header.jsx             # Barra de navegación
 │    ├── FilterButtons.jsx      # Filtros por estado
 │    ├── Loader.jsx             # Spinner y skeleton cards
 │    └── EmptyState.jsx         # Estado vacío
 │
 ├── pages/
 │    ├── Login.jsx              # Página de ingreso
 │    └── Panel.jsx              # Dashboard principal
 │
 ├── routes/
 │    └── ProtectedRoute.jsx     # Protección de rutas privadas
 │
 ├── services/
 │    └── reservationService.js  # Todas las peticiones HTTP
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

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/samuel200730/table-track.git
cd table-track
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 4. Construir para producción

```bash
npm run build
```

---

## 🔑 Funcionalidades

### Módulo de Login
- Registro de nombre completo y turno (Mañana / Tarde / Noche)
- Sesión persistida en LocalStorage
- Redirección automática si ya existe sesión activa
- Rutas protegidas — sin sesión redirige al login

### Dashboard de Reservas
- Estadísticas en tiempo real por estado
- Filtros rápidos: Todas / Confirmadas / En Espera / Finalizadas
- Skeleton loaders durante la carga de datos
- Estado vacío cuando no hay reservas

### CRUD Completo
- **Crear** — formulario con validaciones obligatorias
- **Editar** — modificar fecha, cantidad de personas y estado
- **Finalizar** — botón rápido para marcar como finalizada
- **Cancelar** — confirmación con SweetAlert2 antes de eliminar

### Estados con colores
| Estado | Color |
|---|---|
| Confirmada | 🟢 Verde |
| En Espera | 🟡 Ámbar |
| Finalizada | ⚫ Gris |

---

## 🌿 GitFlow utilizado

```
main
└── develop
     ├── feature/login-system
     ├── feature/reservations-crud
     ├── feature/ui-polishing
     └── feature/filters
```

---

## 🔗 Enlaces

- **Repositorio:** https://github.com/samuel200730/table-track
- **App desplegada:** https://samuel200730.github.io/table-track/
- **API MockAPI:** https://6a1257a078d0434e0d5d2c58.mockapi.io/api/v1/reservations
