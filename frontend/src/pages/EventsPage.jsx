import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data.events);
    } catch (err) {
      setError('Error al cargar los eventos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando eventos...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Eventos</h1>
        
        {events.length === 0 ? (
          <p className="text-center py-8">No hay eventos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={event.image || "/api/placeholder/400/200"} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>{event.location.city}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-primary font-bold">${event.price}</span>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;