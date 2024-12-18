import React from 'react';
import { LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar = ({ user }) => {
  const { logout } = useAuth();

  return (
    <div className="bg-white py-4 px-6 fixed w-[calc(100%-16rem)] z-10 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">{user.username}</span>
            <button
              onClick={logout}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;