// src/components/event/EventModal.jsx
import React from 'react';
import { X, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10 bg-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header con imagen */}
        <div className="relative h-96"> {/* Aumentado a 96 unidades */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/400/200";
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
            <p className="text-white text-opacity-90">
              {event.eventType?.charAt(0).toUpperCase() + event.eventType?.slice(1) || 'Evento'}
            </p>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-8" style={{maxHeight: 'calc(90vh - 24rem)'}}>
          {/* Grid de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>{event.location.name} - {event.location.address}, {event.location.city}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-3 text-primary" />
                <span>Capacidad: {event.capacity} personas</span>
              </div>
              <div className="flex items-center text-gray-700">
                <DollarSign className="w-5 h-5 mr-3 text-primary" />
                <span>Precio: ${event.price}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Estilos de Danza</h3>
              <div className="flex flex-wrap gap-2">
                {event.danceStyles.map((style, index) => (
                  <span 
                    key={index}
                    className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3">Descripción del Evento</h3>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>

          {/* Botón de compra */}
          <div className="flex justify-center">
            <button 
              className="w-1/3 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark hover:scale-110 transition-transform duration-300 font-semibold"
              onClick={() => alert('Funcionalidad de compra en desarrollo')}
            >
              Comprar Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;