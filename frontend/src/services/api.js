import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  requestPasswordReset: (email) => api.post('/auth/request-reset', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword })
};

export const eventService = {
  getEvents: () => api.get('/events'),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  searchEvents: (params) => api.get('/events/search', { params }),
  registerToEvent: (eventId) => api.post(`/events/${eventId}/register`),
  unregisterFromEvent: (eventId) => api.delete(`/events/${eventId}/register`),
  getMyEvents: () => api.get('/events/my-events'),
  getEventParticipants: (eventId) => api.get(`/events/${eventId}/participants`),
  updateEventStatus: (eventId, status) => api.put(`/events/${eventId}/status`, { status }),
  getFeaturedEvents: () => api.get('/events/featured'),
  saveEvent: (eventId) => api.post(`/events/${eventId}/save`),
  unsaveEvent: (eventId) => api.delete(`/events/${eventId}/save`),
  getSavedEvents: () => api.get('/events/saved')
};

export const userService = {
  // Gestión de usuarios (admin)
  getAllUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateUserRole: (userId, role) => api.put(`/users/${userId}/role`, { role }),
  
  // Gestión de roles y permisos
  getRoleRequests: () => api.get('/role-requests'),
  createRoleRequest: () => api.post('/role-requests'),
  handleRoleRequest: (requestId, status) => api.put(`/role-requests/${requestId}`, { status }),
  getMyRoleRequests: () => api.get('/role-requests/my-requests'),
  
  // Estadísticas y métricas (admin)
  getUserStats: () => api.get('/users/stats'),
  getActiveUsers: () => api.get('/users/active'),
  getUserActivity: (userId) => api.get(`/users/${userId}/activity`)
};

export const adminService = {
  // Dashboard stats
  getDashboardStats: () => api.get('/admin/dashboard-stats'),
  getPlatformMetrics: () => api.get('/admin/metrics'),
  
  // Configuración del sistema
  getSystemSettings: () => api.get('/admin/settings'),
  updateSystemSettings: (settings) => api.put('/admin/settings', settings),
  
  // Logs y auditoría
  getSystemLogs: (params) => api.get('/admin/logs', { params }),
  getAuditTrail: (params) => api.get('/admin/audit', { params })
};

export default api;