import multer from 'multer';

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 5MB
});