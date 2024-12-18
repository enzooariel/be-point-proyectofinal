import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, UserPlus, BarChart, PlusCircle, Ticket, Bookmark } from 'lucide-react';

const menuItems = {
  admin: [
    { title: 'Panel General', icon: Home, path: '/dashboard' },
    { title: 'Usuarios', icon: Users, path: '/dashboard/users' },
    { title: 'Todos los Eventos', icon: Calendar, path: '/dashboard/events' },
    { title: 'Solicitudes', icon: UserPlus, path: '/dashboard/requests' },
    { title: 'Reportes', icon: BarChart, path: '/dashboard/reports' }
  ],
  organizador: [
    { title: 'Panel General', icon: Home, path: '/dashboard' },
    { title: 'Mis Eventos', icon: Calendar, path: '/dashboard/my-events' },
    { title: 'Crear Evento', icon: PlusCircle, path: '/dashboard/create-event' },
    { title: 'Participantes', icon: Users, path: '/dashboard/participants' }
  ],
  espectador: [
    { title: 'Panel General', icon: Home, path: '/dashboard' },
    { title: 'Mis Inscripciones', icon: Ticket, path: '/dashboard/my-registrations' },
    { title: 'Eventos Guardados', icon: Bookmark, path: '/dashboard/saved' }
  ]
};

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const currentItems = menuItems[userRole] || [];

  return (
    <div className="bg-white w-64 min-h-screen fixed left-0 top-0 shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">BePoint</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {currentItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;