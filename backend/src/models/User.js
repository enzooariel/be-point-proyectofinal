import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['espectador', 'organizador', 'admin', 'pendiente'], // Añadimos 'pendiente'
    default: 'espectador'
  },
  isOrganizadorVerified: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);