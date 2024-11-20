// src/components/event/SearchBar.jsx
import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { eventService } from '../../services/api';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    eventType: '',
    city: '',
    date: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.searchEvents(searchParams);
      onSearch(response.data.events);
    } catch (error) {
      console.error('Error al buscar eventos:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg -mt-8 relative z-10">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda general */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchParams.search}
            onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
          />
        </div>

        {/* Tipo de evento */}
        <div className="flex-1">
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            value={searchParams.eventType}
            onChange={(e) => setSearchParams({ ...searchParams, eventType: e.target.value })}
          >
            <option value="">Tipo de evento</option>
            <option value="batalla">Batalla</option>
            <option value="clase">Clase</option>
            <option value="show">Show</option>
            <option value="competencia">Competencia</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>

        {/* Ciudad */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ciudad"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchParams.city}
            onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
          />
        </div>

        {/* Fecha */}
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
          />
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar Eventos
        </button>
      </form>
    </div>
  );
};

export default SearchBar;