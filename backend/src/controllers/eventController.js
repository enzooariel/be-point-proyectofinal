import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.userId
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Evento creado exitosamente',
      event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al crear evento', 
      error: error.message 
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const events = await Event.find()
      .populate('organizer', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Event.countDocuments();

    res.json({
      success: true,
      events,
      pagination: {
        totalEvents: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        hasMore: page * limit < count
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener eventos', 
      error: error.message 
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'username')
      .populate('registeredParticipants', 'username');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener evento', 
      error: error.message 
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    // Verificar permisos
    if (event.organizer.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'No tienes permiso para actualizar este evento' 
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('organizer', 'username');

    res.json({
      success: true,
      message: 'Evento actualizado exitosamente',
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al actualizar el evento', 
      error: error.message 
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    // Verificar permisos
    if (event.organizer.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'No tienes permiso para eliminar este evento' 
      });
    }

    await Event.findByIdAndDelete(id);

    res.json({ 
      success: true,
      message: 'Evento eliminado exitosamente',
      eventId: id
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al eliminar el evento', 
      error: error.message 
    });
  }
};

export const searchEvents = async (req, res) => {
  try {
    const {
      search,
      danceStyle,
      eventType,
      city,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    let filters = {};

    // Búsqueda por título o descripción
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtros adicionales
    if (danceStyle) filters.danceStyles = danceStyle;
    if (eventType) filters.eventType = eventType;
    if (city) filters['location.city'] = { $regex: city, $options: 'i' };

    // Rango de fechas
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    // Rango de precios
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const events = await Event.find(filters)
      .populate('organizer', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1 });

    const total = await Event.countDocuments(filters);

    res.json({
      success: true,
      events,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasMore: page * limit < total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar eventos',
      error: error.message
    });
  }
};

//REGISTRARSE AL EVENTOOOO

// Registrarse a un evento
export const registerToEvent = async (req, res) => {
  try {
    const { id } = req.params; // ID del evento
    const userId = req.userId; // ID del usuario que quiere registrarse

    const event = await Event.findById(id);
    
    // Verificar si el evento existe
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    // Verificar si el evento ya está lleno
    if (event.registeredParticipants.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'El evento está lleno'
      });
    }

    // Verificar si el usuario ya está registrado
    if (event.registeredParticipants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Ya estás registrado en este evento'
      });
    }

    // Registrar al usuario
    event.registeredParticipants.push(userId);
    await event.save();

    res.json({
      success: true,
      message: 'Registro exitoso al evento',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al registrarse al evento',
      error: error.message
    });
  }
};

// Cancelar registro a un evento
export const unregisterFromEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    // Verificar si el usuario está registrado
    if (!event.registeredParticipants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'No estás registrado en este evento'
      });
    }

    // Remover al usuario
    event.registeredParticipants = event.registeredParticipants.filter(
      participantId => participantId.toString() !== userId
    );
    await event.save();

    res.json({
      success: true,
      message: 'Registro cancelado exitosamente',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cancelar el registro',
      error: error.message
    });
  }
};

// Obtener eventos en los que estoy registrado
export const getMyRegisteredEvents = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    const events = await Event.find({
      registeredParticipants: userId
    })
      .populate('organizer', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1 });

    const total = await Event.countDocuments({
      registeredParticipants: userId
    });

    res.json({
      success: true,
      events,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasMore: page * limit < total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos registrados',
      error: error.message
    });
  }
};

//Cambiar de Rol de espectador a Organizador

export const requestOrganizerRole = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (user.role === 'organizador') {
      return res.status(400).json({
        success: false,
        message: 'Ya eres organizador'
      });
    }

    // Cambiar a pendiente de aprobación
    user.role = 'pendiente';
    await user.save();

    res.json({
      success: true,
      message: 'Solicitud de organizador enviada correctamente',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al solicitar rol de organizador',
      error: error.message
    });
  }
};

//Aprobar solicitud de organizador

export const approveOrganizer = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verificar que quien aprueba es admin
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    user.role = 'organizador';
    await user.save();

    res.json({
      success: true,
      message: 'Usuario aprobado como organizador',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al aprobar organizador',
      error: error.message
    });
  }
};

// Punto final para ver eventos propios (para organizadores) :

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.userId })
      .populate('registeredParticipants', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos',
      error: error.message
    });
  }
};