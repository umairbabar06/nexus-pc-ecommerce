require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Check if Wishlist model loads
  try {
    const Wishlist = require('../models/Wishlist');
    console.log('✅ Wishlist model loaded');

    // Get an admin user to simulate auth
    const User = require('../models/User');
    const admin = await User.findOne({ user_role: 'admin' });
    if (!admin) { console.log('❌ No admin user found'); return; }
    console.log(`✅ Found admin: ${admin.name} (${admin.email})`);

    // Test creating/fetching wishlist
    let wl = await Wishlist.findOne({ user: admin._id });
    if (!wl) {
      wl = await Wishlist.create({ user: admin._id, products: [] });
      console.log('✅ Created empty wishlist for admin');
    } else {
      console.log(`✅ Existing wishlist found: ${wl.products.length} products`);
    }

    // Test the populated query
    const populated = await Wishlist.findOne({ user: admin._id })
      .populate('products', 'name price image category brand stock deleted_at');
    const products = (populated?.products || []).filter(p => !p.deleted_at);
    console.log(`✅ Populated wishlist: ${products.length} active products`);

    // Generate a valid JWT for testing
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(`\n🔑 Test token (use in browser DevTools):\n   ${token.substring(0, 30)}...`);

    // Test the API endpoint directly with fetch
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: process.env.PORT || 5000,
      path: '/api/wishlist',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    };

    console.log('\n📡 Testing GET /api/wishlist...');
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        try {
          const json = JSON.parse(data);
          console.log(`   Response: ${JSON.stringify(json, null, 2).substring(0, 200)}`);
        } catch {
          console.log(`   Raw: ${data.substring(0, 200)}`);
        }
        mongoose.disconnect();
      });
    });
    req.on('error', (err) => {
      console.log(`   ❌ Connection error: ${err.message}`);
      console.log('   → Is the backend server running? Start it with: node server.js');
      mongoose.disconnect();
    });
    req.end();

  } catch (err) {
    console.error('❌ Error:', err.message);
    await mongoose.disconnect();
  }
}

test();
