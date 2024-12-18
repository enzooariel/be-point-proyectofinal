// pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4">
        <DashboardHeader user={user} />
        
        {/* Contenido específico según rol */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sección de Información Personal */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600">Nombre completo</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md"
                  defaultValue={user.username}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 border rounded-md"
                  defaultValue={user.email}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600">Teléfono</label>
                <input
                  type="tel"
                  className="mt-1 p-2 border rounded-md"
                />
              </div>
              {/* Campos específicos según rol */}
              {user.role === 'organizador' && (
                <div className="flex flex-col">
                  <label className="text-gray-600">Bio</label>
                  <textarea
                    className="mt-1 p-2 border rounded-md"
                    rows="4"
                  />
                </div>
              )}
            </div>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
              Guardar Cambios
            </button>
          </div>

          {/* Otras secciones según rol */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;