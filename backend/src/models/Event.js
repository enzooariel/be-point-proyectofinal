import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['batalla', 'clase', 'show', 'competencia', 'workshop', 'otro']
  },
  // Cambiamos danceStyles para que acepte cualquier string
  danceStyles: [{
    type: String,
    trim: true  // Esto eliminará espacios en blanco al inicio y final
  }],
  date: {
    type: Date,
    required: true
  },
  location: {
    name: String,
    address: String,
    city: String,
    country: String
  },
  image: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  registeredParticipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);