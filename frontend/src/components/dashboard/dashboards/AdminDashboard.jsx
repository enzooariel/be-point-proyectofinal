import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  UserPlus, 
  AlertTriangle, 
  BarChart, 
  Settings, 
  Shield,
  TrendingUp,
  UserCheck,
  Clock
} from 'lucide-react';
import UserManagement from "../../admin/UserManagement";
import axios from 'axios';

const AdminDashboard = ({ user }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    totalEvents: 0,
    activeEvents: 0
  });

  const loadStats = async () => {
    try {
      // Cargar estadísticas de usuarios
      const usersResponse = await axios.get('/api/roles/users');
      const pendingResponse = await axios.get('/api/roles/pending-requests');
      const eventsResponse = await axios.get('/api/events');

      setStats({
        totalUsers: usersResponse.data.users.length,
        pendingRequests: pendingResponse.data.pendingUsers.length,
        totalEvents: eventsResponse.data.events.length,
        activeEvents: eventsResponse.data.events.filter(event => 
          new Date(event.date) >= new Date()
        ).length
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Panel de Control Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveView('users')}
          className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg"
        >
          <Users className="w-8 h-8" />
          <span className="text-lg font-semibold">Gestionar Usuarios</span>
        </button>
        <button 
          className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg"
          onClick={() => setActiveView('events')}
        >
          <Calendar className="w-8 h-8" />
          <span className="text-lg font-semibold">Gestionar Eventos</span>
        </button>
        <button 
          className="p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg"
          onClick={() => setActiveView('settings')}
        >
          <Settings className="w-8 h-8" />
          <span className="text-lg font-semibold">Configuración</span>
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Total Usuarios</span>
              <span className="text-2xl font-bold">{stats.totalUsers}</span>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Solicitudes Pendientes</span>
              <span className="text-2xl font-bold">{stats.pendingRequests}</span>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Total Eventos</span>
              <span className="text-2xl font-bold">{stats.totalEvents}</span>
            </div>
            <Calendar className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Eventos Activos</span>
              <span className="text-2xl font-bold">{stats.activeEvents}</span>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Métricas de Rendimiento */}
      {activeView === 'dashboard' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-500" />
            Métricas de Rendimiento
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico de métricas (en desarrollo)
          </div>
        </div>
      )}

      {/* Vista de Gestión de Usuarios */}
      {activeView === 'users' && (
        <div className="bg-white rounded-lg shadow-md">
          <UserManagement onUpdate={loadStats} />
        </div>
      )}

      {/* Vista de Gestión de Eventos */}
      {activeView === 'events' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Gestión de Eventos</h3>
          <div className="text-gray-400 text-center">
            Módulo de gestión de eventos (en desarrollo)
          </div>
        </div>
      )}

      {/* Vista de Configuración */}
      {activeView === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Configuración del Sistema</h3>
          <div className="text-gray-400 text-center">
            Módulo de configuración (en desarrollo)
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;