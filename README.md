¿Cómo empezar? 🚀
Backend

Configuración inicial

# Instalar dependencias

cd backend
npm install

# Configurar variables de entorno
# Crear archivo .env con:
MONGODB_URI=mongodb+srv://enzoalcon:<rescate7>@enzoalcon.w4fol.mongodb.net/?retryWrites=true&w=majority&appName=enzoalcon
PORT=5000

# Iniciar servidor
npm run dev

Base de datos


MongoDB Atlas
Colecciones: users, events
----------------------------------------------------------------------------------------------------------------------
Frontend
# Instalar dependencias
cd frontend
npm install

# Iniciar aplicación
npm run dev
Funcionalidades Implementadas ⚡
1. Sistema de Usuarios y Roles

Registro y login
Autenticación con JWT
Roles: Admin, Organizador, Espectador
Permisos específicos por rol

2. Gestión de Eventos

Creación de eventos (Admin/Organizador)
Listado en grid con cards
Imágenes y detalles
Buscador y filtros

3. Modal de Detalles

Vista ampliada de eventos
Información completa
Botón de compra (próximamente)

Stack Tecnológico 💻
Backend

Node.js
Express
MongoDB
JWT
Mongoose

Frontend

React
Vite
Tailwind CSS
React Router
Axios

Estructura del Proyecto 📁
Copybepoint/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── context/
    └── package.json
API Endpoints 🛠
Autenticación
CopyPOST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
Eventos
CopyGET    /api/events
POST   /api/events
GET    /api/events/:id
PUT    /api/events/:id
DELETE /api/events/:id
Instrucciones de Prueba 🧪

Iniciar Sesión

Usar las credenciales proporcionadas
----------------------------
Demo de Usuarios 👤
Administrador
CopyEmail: admin@admin.com
Password: admin123

Espectador (Crea el usuario y ya seras espectador)
CopyEmail: test@test.com
Password: test123

Organizador
CopyEmail: mike@mike.com
Password: mike123
----------------------------

Crear Evento (como Admin u Organizador)

Llenar formulario
Subir imagen
Establecer detalles


Visualizar Eventos

Ver grid de eventos
Abrir modales
Probar filtros



Estado del Proyecto 📈
Completado ✅

Sistema de autenticación
CRUD de eventos
Visualización y modal
Roles y permisos

En Desarrollo 🚧

Sistema de pagos
Notificaciones
Panel admin
Reportes

Errores Conocidos 🐛

Las imágenes pueden tardar en cargar
Algunos estilos en móviles necesitan ajuste