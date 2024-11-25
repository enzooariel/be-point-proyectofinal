import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event = {}, onOpenModal }) => {
  const {
    title = "Battle Dance 2024",
    image = "/api/placeholder/400/200",
    date = "2024-12-20",
    location = { city: "Buenos Aires", country: "Argentina" },
    price = 2500,
    capacity = 100,
    danceStyles = ["Hip Hop", "Breaking"]
  } = event || {};

  const defaultImage = "/api/placeholder/400/200"; // Imagen por defecto
  const [imgSrc, setImgSrc] = React.useState(image);
  const [imgError, setImgError] = React.useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(defaultImage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
      {/* Imagen del evento */}
      <div className="relative h-72 bg-gray-100"> {/* Agregado bg-gray-100 como fallback */}
        <img 
          src={imgSrc}
          alt={title} 
          className="w-full h-full object-cover object-center"
          onError={handleImageError}
          style={{ background: '#f3f4f6' }} // Color de fondo como fallback
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
          ${price}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{title}</h3>
          
          {/* Fecha y Ubicación */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {location.venue && `${location.venue}, `}
                {location.address && `${location.address}, `}
                {location.city || 'Ciudad Autónoma de Buenos Aires'}
              </span>
            </div>
            {/* <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location.city}, {location.country}</span>
            </div> */}
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
        </div>

        {/* Botón */}
        <button 
          onClick={() => onOpenModal(event)}
          className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors mt-auto"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default EventCard;