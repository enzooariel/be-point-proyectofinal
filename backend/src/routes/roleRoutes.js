import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { 
  requestOrganizerRole, 
  getPendingRequests,
  handleRoleRequest,
  checkRoleRequest // Asegúrate de importar la nueva función
} from '../controllers/roleController.js';

const router = express.Router();

// Rutas públicas
router.post('/request-organizer', authMiddleware, requestOrganizerRole);

// Rutas protegidas
router.get('/my-request', authMiddleware, checkRoleRequest);
router.get('/pending-requests', authMiddleware, getPendingRequests);
router.put('/handle-request/:userId', authMiddleware, handleRoleRequest);

export default router;