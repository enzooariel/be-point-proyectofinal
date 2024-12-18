// components/dashboard/dashboards/OrganizerDashboard.jsx
import React from 'react';
import { Calendar, Users, DollarSign, Star, TrendingUp } from 'lucide-react';

const OrganizerDashboard = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Información Personal del Organizador */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Información del Organizador</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Nombre completo</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md"
              defaultValue={user.username}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Email comercial</label>
            <input
              type="email"
              className="mt-1 p-2 border rounded-md"
              defaultValue={user.email}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Teléfono de contacto</label>
            <input
              type="tel"
              className="mt-1 p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Redes Sociales</label>
            <input
              type="text"
              placeholder="Instagram"
              className="mt-1 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Facebook"
              className="mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-600">Biografía/Descripción</label>
            <textarea
              className="mt-1 p-2 border rounded-md"
              rows="4"
              placeholder="Cuéntanos sobre tu experiencia organizando eventos..."
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
          Guardar Cambios
        </button>
      </div>

      {/* Estadísticas del Organizador */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Mis Estadísticas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Eventos Creados
              </span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Total Participantes
              </span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Ingresos Totales
              </span>
              <span className="font-bold">$0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos Activos */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Eventos Activos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Evento</th>
                <th className="text-left py-2">Fecha</th>
                <th className="text-left py-2">Inscritos</th>
                <th className="text-left py-2">Estado</th>
                <th className="text-left py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2" colSpan="5">
                  No hay eventos activos
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de Rendimiento */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Rendimiento</h3>
        <div className="flex items-center justify-center h-48">
          <TrendingUp className="w-12 h-12 text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;