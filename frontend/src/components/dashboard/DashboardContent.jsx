import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Añade esta línea
import AdminDashboard from './dashboards/AdminDashboard';
import OrganizerDashboard from './dashboards/OrganizerDashboard';
import SpectatorDashboard from './dashboards/SpectatorDashboard';

const DashboardContent = () => {
  const { user } = useAuth(); // Obtén el usuario del contexto

  if (!user) {
    return <div>Cargando...</div>; // O cualquier componente de carga
  }

  const getDashboardByRole = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'organizador':
        return <OrganizerDashboard user={user} />;
      case 'espectador':
        return <SpectatorDashboard user={user} />;
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return getDashboardByRole();
};

export default DashboardContent;