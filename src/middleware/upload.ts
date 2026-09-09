import multer from 'multer';

// Use memory storage to avoid writing files to your local disk
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB size limit (supports videos)
  },
});


// This keeps uploaded files in temporary memory
// buffers before sending them to Cloudinary