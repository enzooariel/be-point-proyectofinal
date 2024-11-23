import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'espectador' // Valor por defecto
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* <div>
          <label className="block text-gray-700 mb-2">Tipo de Usuario</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="espectador">Espectador</option>
            <option value="organizador">Organizador</option>
            <option value="admin">Administrador</option>
          </select>
        </div> */}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-primary hover:text-primary-dark">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;