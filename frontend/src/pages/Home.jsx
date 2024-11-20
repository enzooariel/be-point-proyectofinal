// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Hero from '../components/layout/Hero';
import SearchBar from '../components/event/SearchBar';
import EventCard from '../components/event/EventCard';
import { eventService } from '../services/api';

const Home = () => {
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

  const handleSearch = (searchResults) => {
    setEvents(searchResults);
  };

  return (
    <div className="min-h-screen pt-16">
      <Hero />
      
      {/* Barra de búsqueda */}
      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Eventos */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Eventos Destacados</h2>
        
        {loading && (
          <div className="text-center py-8">
            <p>Cargando eventos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {!loading && events.length === 0 && (
          <div className="text-center py-8">
            <p>No se encontraron eventos</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;