// /**
//  * One-off helper: promote an existing user to admin.
//  *
//  * Usage (from backend/ folder):
//  *   node scripts/makeAdmin.js youremail@example.com
//  *
//  * Sign up normally through the site first with that email, THEN run this.
//  */

// const path = require('path');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config({ path: path.join(__dirname, '..', '.env') });

// const User = require('../models/User');

// const email = process.argv[2];

// if (!email) {
//   console.error('Usage: node scripts/makeAdmin.js youremail@example.com');
//   process.exit(1);
// }

// async function run() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const user = await User.findOneAndUpdate(
//     { email: email.toLowerCase() },
//     { user_role: 'admin' },
//     { new: true }
//   );

//   if (!user) {
//     console.error(`No user found with email: ${email}`);
//     console.error('Sign up with that email through the site first, then re-run this.');
//   } else {
//     console.log(`Success: ${user.email} is now an admin.`);
//   }

//   await mongoose.disconnect();
//   process.exit(user ? 0 : 1);
// }

// run();