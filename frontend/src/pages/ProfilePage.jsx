import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
        
        <div className="space-y-4">
          <div>
            <label className="font-medium">Usuario:</label>
            <p>{user.username}</p>
          </div>
          <div>
            <label className="font-medium">Email:</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="font-medium">Rol:</label>
            <p className="capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;