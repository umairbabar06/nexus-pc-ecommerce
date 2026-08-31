const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let storage;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  // Use Cloudinary for storage
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'nexus-pc-products',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
      transformation: [{ width: 1000, height: 1000, crop: 'limit', quality: 'auto' }],
    },
  });
} else {
  // Fallback to local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = {
  cloudinary,
  upload,
};
