// components/dashboard/DashboardHeader.jsx
import React from 'react';
import { Crown, Users, User } from 'lucide-react';

const RoleBadge = ({ role }) => {
  const badges = {
    admin: {
      icon: <Crown className="w-5 h-5" />,
      color: 'bg-purple-500',
      text: 'Administrador'
    },
    organizador: {
      icon: <Users className="w-5 h-5" />,
      color: 'bg-primary',
      text: 'Organizador'
    },
    espectador: {
      icon: <User className="w-5 h-5" />,
      color: 'bg-secondary',
      text: 'Espectador'
    }
  };

  const badge = badges[role];

  return (
    <div className={`${badge.color} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
      {badge.icon}
      <span className="font-semibold">{badge.text}</span>
    </div>
  );
};

const DashboardHeader = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
          <p className="text-gray-600">Bienvenido, {user.username}</p>
        </div>
        <RoleBadge role={user.role} />
      </div>
    </div>
  );
};

export default DashboardHeader;