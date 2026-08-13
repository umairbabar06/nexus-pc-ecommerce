require('dotenv').config();
const mongoose = require('mongoose');

async function diagnose() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to:', process.env.MONGO_URI);

    const User = require('../models/User');

    const users = await User.find({}).select('name email is_verified verificationToken verificationTokenExpire createdAt');

    console.log('\n=== ALL USERS ===');
    if (users.length === 0) {
      console.log('❌ NO USERS FOUND IN DATABASE');
      console.log('   This means registration is saving to a different DB, or backend is not running.');
    } else {
      users.forEach(u => {
        const expired = u.verificationTokenExpire && u.verificationTokenExpire < Date.now();
        console.log(`\nName:      ${u.name}`);
        console.log(`Email:     ${u.email}`);
        console.log(`Verified:  ${u.is_verified ? '✅ YES' : '❌ NO'}`);
        console.log(`Token:     ${u.verificationToken ? u.verificationToken.substring(0, 16) + '...' : 'NONE (already cleared)'}`);
        console.log(`Expires:   ${u.verificationTokenExpire ? (expired ? '❌ EXPIRED at ' + u.verificationTokenExpire : '✅ Valid until ' + u.verificationTokenExpire) : 'N/A'}`);
        console.log(`Joined:    ${u.createdAt}`);
      });
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

diagnose();
