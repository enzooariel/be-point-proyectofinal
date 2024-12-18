import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardContent from './components/dashboard/DashboardContent';
import AdminDashboard from './components/dashboard/dashboards/AdminDashboard';
import OrganizerDashboard from './components/dashboard/dashboards/AdminDashboard';
import SpectatorDashboard from './components/dashboard/dashboards/SpectatorDashboard';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div>Cargando...</div>; // O cualquier componente de carga
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />

            {/* Rutas del Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardContent />} />
              
              {/* Rutas de Admin */}
              <Route path="users" element={<AdminDashboard />} />
              <Route path="events" element={<div>Todos los eventos</div>} />
              <Route path="requests" element={<div>Solicitudes</div>} />
              <Route path="reports" element={<div>Reportes</div>} />
              
              {/* Rutas de Organizador */}
              <Route path="my-events" element={<div>Mis eventos</div>} />
              <Route path="create-event" element={<div>Crear evento</div>} />
              <Route path="participants" element={<div>Participantes</div>} />
              
              {/* Rutas de Espectador */}
              <Route path="my-registrations" element={<div>Mis inscripciones</div>} />
              <Route path="saved" element={<div>Eventos guardados</div>} />
            </Route>

            {/* Ruta para manejar rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;