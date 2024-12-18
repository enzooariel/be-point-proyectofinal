// controllers/roleController.js

import User from '../models/User.js';

// Verificar si el usuario tiene una solicitud de rol pendiente
export const checkRoleRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const hasActiveRequest = user.role === 'pendiente';

    res.json({
      success: true,
      request: hasActiveRequest ? {
        status: 'pending',
        userId: user._id,
        currentRole: user.role
      } : null
    });
  } catch (error) {
    console.error('Error checking role request:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar solicitud de rol'
    });
  }
};

// Solicitar el rol de organizador
export const requestOrganizerRole = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    if (user.role === 'organizador') {
      return res.status(400).json({
        success: false,
        message: 'Ya eres organizador'
      });
    }

    if (user.role === 'pendiente') {
      return res.status(400).json({
        success: false,
        message: 'Ya tienes una solicitud pendiente'
      });
    }

    user.role = 'pendiente';
    await user.save();

    res.json({
      success: true,
      message: 'Solicitud enviada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al solicitar rol de organizador',
      error: error.message
    });
  }
};

// Obtener todas las solicitudes pendientes
export const getPendingRequests = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para esta acción'
      });
    }

    const pendingUsers = await User.find({ role: 'pendiente' })
      .select('username email createdAt');

    res.json({
      success: true,
      pendingUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitudes pendientes',
      error: error.message
    });
  }
};

// Aprobar o rechazar solicitudes de rol
export const handleRoleRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action } = req.body;

    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para esta acción'
      });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'pendiente') {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado o sin solicitud pendiente'
      });
    }

    user.role = action === 'approve' ? 'organizador' : 'espectador';
    await user.save();

    res.json({
      success: true,
      message: action === 'approve' ? 'Usuario aprobado como organizador' : 'Solicitud rechazada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud',
      error: error.message
    });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para esta acción'
      });
    }

    const users = await User.find()
      .select('username email role createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};