import React, { useState, useEffect } from 'react';
import { 
  User, Shield, CheckCircle, XCircle, 
  AlertCircle, UserPlus, Search, RefreshCw 
} from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleRequests, setRoleRequests] = useState([]);

  // Simulación de datos - Reemplazar con llamadas a tu API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Aquí deberías hacer la llamada a tu API
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    const fetchRoleRequests = async () => {
      try {
        // Aquí deberías hacer la llamada a tu API
        const response = await fetch('/api/role-requests');
        const data = await response.json();
        setRoleRequests(data);
      } catch (error) {
        console.error('Error fetching role requests:', error);
      }
    };

    fetchUsers();
    fetchRoleRequests();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Aquí deberías hacer la llamada a tu API
      await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleRoleRequest = async (requestId, status) => {
    try {
      // Aquí deberías hacer la llamada a tu API
      await fetch(`/api/role-requests/${requestId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Actualizar la lista de solicitudes
      setRoleRequests(roleRequests.filter(req => req.id !== requestId));
      
      // Si fue aprobada, actualizar el rol del usuario
      if (status === 'approved') {
        const request = roleRequests.find(req => req.id === requestId);
        if (request) {
          handleRoleChange(request.userId, 'organizador');
        }
      }
    } catch (error) {
      console.error('Error handling role request:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Solicitudes de Rol Pendientes */}
      {roleRequests.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-500" />
            Solicitudes Pendientes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">Usuario</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roleRequests.map(request => (
                  <tr key={request.id}>
                    <td className="px-6 py-4">{request.username}</td>
                    <td className="px-6 py-4">{request.email}</td>
                    <td className="px-6 py-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRoleRequest(request.id, 'approved')}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRoleRequest(request.id, 'rejected')}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gestión de Usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Rol Actual</th>
                <th className="px-6 py-3 text-left">Cambiar Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Cargando usuarios...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users
                  .filter(user => 
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
                          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'organizador' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          <Shield className="w-4 h-4" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className="border rounded-lg px-3 py-1"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="espectador">Espectador</option>
                          <option value="organizador">Organizador</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;