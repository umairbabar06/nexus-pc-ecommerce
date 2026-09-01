require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async () => {
  console.log('⏳ Starting local Cloudinary upload (bypassing MongoDB)...');
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const mapping = {};

  const files = fs.readdirSync(uploadsDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.webp' || ext === '.avif') {
      const localPath = path.join(uploadsDir, file);
      try {
        console.log(`Uploading ${file}...`);
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'nexus-pc-products',
          use_filename: true,
          unique_filename: false,
          resource_type: 'image',
        });
        mapping[file] = result.secure_url;
        console.log(`✅ Uploaded: ${result.secure_url}`);
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err.message);
      }
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'cloudinary-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('🎉 Done! Mapping saved to cloudinary-mapping.json');
};

uploadImages();
