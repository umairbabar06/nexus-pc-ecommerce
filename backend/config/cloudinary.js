const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage keeps file buffer in RAM for direct streaming to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/**
 * Upload a file buffer directly to Cloudinary
 * @param {Buffer} buffer - File buffer from req.file.buffer
 * @param {string} folder - Destination folder in Cloudinary
 * @returns {Promise<string>} Secure HTTPS URL
 */
const uploadToCloudinary = (buffer, folder = 'nexus-pc-products') => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return reject(new Error('Cloudinary credentials not configured in environment.'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ width: 1000, height: 1000, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary stream error:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
};
