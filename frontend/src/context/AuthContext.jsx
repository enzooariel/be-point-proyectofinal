import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authService.getProfile();
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const requestOrganizerRole = async () => {
    try {
      const response = await authService.requestOrganizerRole();
      if (response.data.success) {
        setUser(prev => ({ ...prev, role: 'pendiente' }));
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading,
        error, 
        login, 
        register, 
        logout,
        updateProfile,
        requestOrganizerRole,
        isAuthenticated: !!user,
        isOrganizer: user?.role === 'organizador',
        isAdmin: user?.role === 'admin',
        isSpectator: user?.role === 'espectador'
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;