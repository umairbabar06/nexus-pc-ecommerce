const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Model — replaces the `user_data` MySQL table
 * Fields match exactly what was in your PHP login/signup system
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // never returned by default
    },
    user_role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    // Email verification token (replaces your verify.php token)
    verificationToken: String,
    verificationTokenExpire: Date,
    // Password reset token (replaces reset_password.php)
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Profile info (from account.php)
    phone: String,
    address: String,
    avatar: String,
  },
  { timestamps: true }
);

// Hash password before saving (replaces PHP's password_hash())
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare entered password (replaces PHP's password_verify())
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
