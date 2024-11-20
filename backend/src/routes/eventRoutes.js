import express from 'express';
import { 
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    searchEvents,
    registerToEvent,
    unregisterFromEvent,
    getMyRegisteredEvents,
    requestOrganizerRole,
    approveOrganizer,
    getMyEvents
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getEvents);
router.get('/search', searchEvents);

// Rutas de gestión de perfil y eventos propios
router.get('/my-events', authMiddleware, getMyEvents);
router.get('/my-registrations', authMiddleware, getMyRegisteredEvents);

// Rutas de gestión de roles
router.post('/request-organizer', authMiddleware, requestOrganizerRole);
router.post('/approve-organizer/:userId', authMiddleware, approveOrganizer);

// Rutas que requieren ID
router.get('/:id', getEventById);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// Rutas de registro a eventos
router.post('/:id/register', authMiddleware, registerToEvent);
router.delete('/:id/register', authMiddleware, unregisterFromEvent);

// Ruta de creación de eventos
router.post('/', authMiddleware, createEvent);

export default router;