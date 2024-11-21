import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const canCreateEvents = user?.role === 'admin' || user?.role === 'organizador';

  return (
    <nav className="bg-black py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Be<span className="text-primary">Point</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-white hover:text-primary transition-colors">
              Eventos
            </Link>
            <Link to="/about" className="text-white hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="text-white hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {canCreateEvents && (
                  <Link 
                    to="/create-event" 
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Crear Evento
                  </Link>
                )}
                <span className="text-white">
                  {user.username} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="text-white hover:text-primary transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-primary transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;