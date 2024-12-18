import express from 'express';
import { 
  register, 
  login, 
  getProfile,
  getAllUsers,
  updateProfile  // Añadido el import
} from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/profile', authMiddleware, getProfile);
router.get('/users', authMiddleware, getAllUsers);
router.put('/profile', authMiddleware, updateProfile);

export default router;