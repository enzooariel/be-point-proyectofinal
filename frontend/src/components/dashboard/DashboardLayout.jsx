import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando...</div>; // O cualquier componente de carga
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <Sidebar userRole={user.role} />
    <div className="ml-64 min-h-screen">
      <TopBar user={user} />
      <main className="p-6 pt-20"> {/* Añadido pt-20 para dar espacio al TopBar fijo */}
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default DashboardLayout;