import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'djbw8z3bd',
  api_key: '694829672188796',
  api_secret: 'x0ADhjvgzcCglXzpM3v6PfWx7Yg'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bepoint-events', // carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // formatos permitidos
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // redimensionar imágenes
  }
});

export const upload = multer({ storage: storage });