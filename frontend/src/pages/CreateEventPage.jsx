import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { eventService } from '../services/api';
import ImageUpload from '../components/common/ImageUpload';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    danceStyles: [],
    date: '',
    location: {
      name: '',
      address: '',
      city: '',
      country: ''
    },
    image: '',
    price: '',
    capacity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando datos:', formData);
      const response = await eventService.createEvent(formData);
      console.log('Respuesta:', response);
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error al crear el evento');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Evento</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Título del Evento</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Battle Urban Dance 2024"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Gran batalla de breaking y hip hop con los mejores bailarines de la escena urbana..."
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tipo de Evento</label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({...formData, eventType: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Seleccionar tipo</option>
              <option value="batalla">Batalla</option>
              <option value="clase">Clase</option>
              <option value="show">Show</option>
              <option value="workshop">Workshop</option>
              <option value="competencia">Competencia</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Estilos de Danza</label>
            <input
              type="text"
              value={formData.danceStyles.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                danceStyles: e.target.value.split(',').map(s => s.trim())
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Breaking, Hip Hop, House (separar con comas)"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Fecha y Hora</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre del Lugar</label>
              <input
                type="text"
                value={formData.location.name}
                onChange={(e) => setFormData({
                  ...formData,
                  location: {...formData.location, name: e.target.value}
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: Centro Cultural Recoleta"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) => setFormData({
                  ...formData,
                  location: {...formData.location, address: e.target.value}
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: Junín 1930"
                required
              />
            </div>
          </div>

          <div>
              <label className="block text-gray-700 mb-2">Ciudad</label>
              <input
                type="text"
                value={formData.location.city}
                onChange={(e) => setFormData({
                  ...formData,
                  location: {
                    ...formData.location,
                    city: e.target.value
                  }
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: Ciudad Autónoma de Buenos Aires"
                required
              />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: 2500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Capacidad</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: 100"
                required
                min="1"
              />
            </div>
          </div>

          <div>
  <label className="block text-gray-700 mb-2">Imagen del Evento</label>
  <ImageUpload 
    onImageUpload={(imageUrl) => setFormData({...formData, image: imageUrl})}
  />
</div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Crear Evento
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;