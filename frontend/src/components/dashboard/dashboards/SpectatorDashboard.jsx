import React, { useState, useEffect } from 'react';
import { Calendar, BookmarkCheck, Star, UserPlus, Save, Loader, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const SpectatorDashboard = ({ user }) => {
  const { requestOrganizerRole, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({
    registeredEvents: 0,
    savedEvents: 0
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [requestStatus, setRequestStatus] = useState('none');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    favoriteStyles: user?.favoriteStyles || []
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        favoriteStyles: user.favoriteStyles || []
      });
      if (user.role === 'pendiente') {
        setRequestStatus('pending');
      }
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      await Promise.all([
        loadStats(),
        loadUpcomingEvents()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadStats = async () => {
    try {
      // Aquí deberías hacer las llamadas a tu API real
      // Estos son datos de ejemplo
      setStats({
        registeredEvents: 0,
        savedEvents: 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadUpcomingEvents = async () => {
    try {
      // Aquí deberías hacer la llamada a tu API real
      setUpcomingEvents([]);
    } catch (error) {
      console.error('Error loading upcoming events:', error);
    }
  };

  const handleRequestOrganizer = async () => {
    try {
      setIsLoading(true);
      await requestOrganizerRole();
      setRequestStatus('pending');
      setSaveMessage('Solicitud enviada correctamente');
    } catch (error) {
      setSaveMessage('Error al enviar la solicitud: ' + 
        (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStylesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      favoriteStyles: selectedOptions
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      await updateProfile(formData);
      setSaveMessage('Cambios guardados correctamente');
    } catch (error) {
      setSaveMessage('Error al guardar los cambios: ' + 
        (error.response?.data?.message || error.message));
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Información Personal */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Información Personal</h2>
          {requestStatus === 'none' && (
            <button 
              onClick={handleRequestOrganizer}
              disabled={isLoading}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              Solicitar ser Organizador
            </button>
          )}
          {requestStatus === 'pending' && (
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Solicitud pendiente
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Nombre completo</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-2 border rounded-md"
              value={formData.username}
              onChange={handleInputChange}
              disabled={requestStatus === 'pending'}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 border rounded-md bg-gray-50"
              value={formData.email}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Teléfono</label>
            <input
              type="tel"
              name="phone"
              className="mt-1 p-2 border rounded-md"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Estilos de danza favoritos</label>
            <select 
              multiple 
              name="favoriteStyles"
              className="mt-1 p-2 border rounded-md"
              value={formData.favoriteStyles}
              onChange={handleStylesChange}
            >
              <option value="Breaking">Breaking</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="House">House</option>
              <option value="Popping">Popping</option>
              <option value="Locking">Locking</option>
            </select>
          </div>
        </div>

        {saveMessage && (
          <div className={`mt-2 p-2 rounded ${
            saveMessage.includes('Error') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {saveMessage}
          </div>
        )}

        <button 
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Mis Estadísticas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Eventos Inscritos
              </span>
              <span className="font-bold">{stats.registeredEvents}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-primary" />
                Eventos Guardados
              </span>
              <span className="font-bold">{stats.savedEvents}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos Eventos */}
      <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Evento</th>
                <th className="text-left py-2">Fecha</th>
                <th className="text-left py-2">Ubicación</th>
                <th className="text-left py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.length === 0 ? (
                <tr>
                  <td className="py-4 text-center text-gray-500" colSpan="4">
                    No hay eventos próximos
                  </td>
                </tr>
              ) : (
                upcomingEvents.map(event => (
                  <tr key={event._id}>
                    <td className="py-2">{event.title}</td>
                    <td className="py-2">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-2">{event.location.name}</td>
                    <td className="py-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        Inscrito
                      </span>
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

export default SpectatorDashboard;