import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Datos de ejemplo, luego vendrán de la API
  const {
    title = "Battle Dance 2024",
    image = "/api/placeholder/400/200",
    date = "2024-12-20",
    location = { city: "Buenos Aires", country: "Argentina" },
    price = 2500,
    capacity = 100,
    danceStyles = ["Hip Hop", "Breaking"]
  } = event || {};

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen del evento */}
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
          ${price}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        
        {/* Fecha y Ubicación */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location.city}, {location.country}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Capacidad: {capacity} personas</span>
          </div>
        </div>

        {/* Estilos de danza */}
        <div className="flex flex-wrap gap-2 mb-4">
          {danceStyles.map((style, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
            >
              {style}
            </span>
          ))}
        </div>

        {/* Botón */}
        <Link 
          to={`/events/${event?.id || '1'}`}
          className="block text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default EventCard;