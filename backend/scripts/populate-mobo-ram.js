require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('../models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected:', process.env.MONGO_URI);

  const products = await Product.find({ category: 'mobo', $or: [{ 'specs.ramType': { $exists: false } }, { 'specs.ramType': null }, { 'specs.ramType': '' }], deleted_at: null });
  console.log(`Processing ${products.length} mobo products...\n`);

  let updated = 0;

  for (const p of products) {
    const name = p.name;
    const socket = p.specs?.socket;
    let ramType = '';

    if (/DDR5/i.test(name)) {
      ramType = 'DDR5';
    } else if (/DDR4/i.test(name)) {
      ramType = 'DDR4';
    } else if (socket === 'AM4') {
      ramType = 'DDR4';
    } else if (socket === 'AM5') {
      ramType = 'DDR5';
    } else if (socket === 'LGA1700') {
      ramType = 'DDR5'; // default for LGA1700
    } else if (socket === 'LGA1200' || socket === 'LGA1151') {
      ramType = 'DDR4';
    }

    if (ramType) {
      const changes = { specs: { ...(p.specs || {}), ramType } };
      await Product.updateOne({ _id: p._id }, { $set: changes });
      updated++;
      console.log(`  ✓ [MOBO] ${name.substring(0, 60)} -> ${ramType}`);
    }
  }

  console.log(`\n✅ Done — updated ${updated}/${products.length} products`);
  await mongoose.disconnect();
}

run().catch(console.error);
