import React, { useState, useEffect } from 'react';
import EventCard from '../components/event/EventCard';
import EventModal from '../components/event/EventModal';
import { eventService } from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventService.getEvents();
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-100">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Eventos</h1>
      </div>
      
      {!loading && events.length === 0 ? (
        <p className="text-gray-600 text-center">No hay eventos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onOpenModal={setSelectedEvent}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default EventsPage;