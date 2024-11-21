import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }

    res.json({
      success: true,
      imageUrl: req.file.path
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({
      success: false,
      message: 'Error al subir la imagen'
    });
  }
};