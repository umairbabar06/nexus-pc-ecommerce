require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
const CarouselSlide = require('../models/CarouselSlide');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const migrate = async () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Cloudinary credentials missing in .env');
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('❌ MONGO_URI missing in .env');
    process.exit(1);
  }

  console.log('⏳ Connecting to MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('✅ Connected to MongoDB');

  const uploadsDir = path.join(__dirname, '..', 'uploads');

  // 1. Migrate Products
  console.log('\n--- Migrating Product Images to Cloudinary ---');
  const products = await Product.find({
    image: { $exists: true, $ne: '', $not: /^https?:\/\//i }
  });

  console.log(`Found ${products.length} products with local images to migrate.`);

  let successCount = 0;
  let skippedCount = 0;
  let failCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const imageName = product.image;
    const localPath = path.join(uploadsDir, imageName);

    if (!fs.existsSync(localPath)) {
      // Check thumbs
      const thumbPath = path.join(uploadsDir, 'thumbs', imageName);
      if (fs.existsSync(thumbPath)) {
        localPath = thumbPath;
      } else {
        console.log(`⚠️ [${i + 1}/${products.length}] File not found locally: ${imageName} for "${product.name}"`);
        skippedCount++;
        continue;
      }
    }

    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: 'nexus-pc-products',
        use_filename: true,
        unique_filename: false,
        resource_type: 'image',
      });

      product.image = result.secure_url;
      await product.save();
      successCount++;
      console.log(`✅ [${i + 1}/${products.length}] Uploaded & Updated: ${product.name} -> ${result.secure_url}`);
    } catch (err) {
      failCount++;
      console.error(`❌ [${i + 1}/${products.length}] Failed to upload: ${imageName}`, err.message);
    }
  }

  // 2. Migrate Carousel Slides
  console.log('\n--- Migrating Carousel Slide Images ---');
  const slides = await CarouselSlide.find({
    image: { $exists: true, $ne: '', $not: /^https?:\/\//i }
  });

  for (const slide of slides) {
    const localPath = path.join(uploadsDir, slide.image);
    if (fs.existsSync(localPath)) {
      try {
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'nexus-pc-carousel',
          use_filename: true,
          unique_filename: false,
          resource_type: 'image',
        });
        slide.image = result.secure_url;
        await slide.save();
        console.log(`✅ Slide uploaded: ${slide.title || 'Slide'} -> ${result.secure_url}`);
      } catch (err) {
        console.error(`❌ Failed to upload slide image: ${slide.image}`, err.message);
      }
    }
  }

  console.log('\n=======================================');
  console.log(`🎉 Migration Completed!`);
  console.log(`✅ Successfully migrated: ${successCount}`);
  console.log(`⚠️ Skipped (missing local file): ${skippedCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('=======================================');

  await mongoose.disconnect();
  process.exit(0);
};

migrate().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
