import express from 'express';
import { upload } from '../config/cloudinary.js';
import { uploadImage } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/image', authMiddleware, upload.single('image'), uploadImage);

export default router;