const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register new user (replaces signup.php)
// ─────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    // Create verification token (replaces verify.php token)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create user (password hashed automatically by Mongoose pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpire,
    });

    // Send verification email
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <!-- Header -->
              <tr><td style="background:#111;padding:28px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:-0.5px;">NEXUS<span style="color:#aaa;font-weight:300;">PC</span></h1>
              </td></tr>
              <!-- Body -->
              <tr><td style="padding:40px;">
                <h2 style="margin:0 0 12px;font-size:20px;color:#111;">Verify your email address</h2>
                <p style="margin:0 0 8px;color:#555;font-size:15px;">Hello <strong>${name}</strong>,</p>
                <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.6;">Thank you for creating an account. Click the button below to verify your email and activate your account.</p>
                <a href="${verifyUrl}" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:0.3px;">Verify Email</a>
                <p style="margin:28px 0 0;color:#999;font-size:13px;">This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
              </td></tr>
              <!-- Footer -->
              <tr><td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #e4e4e7;">
                <p style="margin:0;color:#aaa;font-size:12px;">© ${new Date().getFullYear()} Nexus PC. All rights reserved.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    try {
      await sendEmail({ to: email, subject: 'Verify Your Email - Nexus PC', html: emailHtml });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
      // Don't block registration if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/auth/verify/:token
// @desc    Verify email address (replaces verify.php)
// ─────────────────────────────────────────────────────────
exports.verifyEmail = async (req, res) => {
  try {
    // First check if user is already verified with this token
    const alreadyVerified = await User.findOne({ verificationToken: req.params.token });
    if (alreadyVerified && alreadyVerified.is_verified) {
      return res.json({ success: true, message: 'Your email is already verified. Please log in.' });
    }

    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'This verification link has expired or already been used.' });
    }

    user.is_verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully! You can now log in.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Verification failed.' });
  }
};


// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Login user + return JWT (replaces LOGIN.php)
// ─────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Check password (replaces password_verify() from PHP)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Check if verified
    if (!user.is_verified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first.' });
    }

    // Generate JWT (replaces PHP $_SESSION)
    const token = generateToken(user._id);

    // Send login alert email
    const deviceInfo = req.headers['user-agent']?.split('(')[0]?.trim() || 'Unknown Device';
    const ipAddr = req.ip || 'Unknown';
    const loginEmailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <tr><td style="background:#111;padding:28px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:-0.5px;">NEXUS<span style="color:#aaa;font-weight:300;">PC</span></h1>
              </td></tr>
              <tr><td style="padding:40px;">
                <h2 style="margin:0 0 12px;font-size:20px;color:#111;">New login detected</h2>
                <p style="margin:0 0 20px;color:#555;font-size:15px;">Hello <strong>${user.name}</strong>, a new login was recorded on your account.</p>
                <table style="background:#f9f9f9;border:1px solid #e4e4e7;border-radius:8px;padding:20px;width:100%;">
                  <tr><td style="padding:6px 0;color:#555;font-size:14px;"><strong>Device:</strong> ${deviceInfo}</td></tr>
                  <tr><td style="padding:6px 0;color:#555;font-size:14px;"><strong>IP Address:</strong> ${ipAddr}</td></tr>
                  <tr><td style="padding:6px 0;color:#555;font-size:14px;"><strong>Time:</strong> ${new Date().toLocaleString()}</td></tr>
                </table>
                <p style="margin:24px 0 0;color:#999;font-size:13px;">If this wasn't you, please change your password immediately.</p>
              </td></tr>
              <tr><td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #e4e4e7;">
                <p style="margin:0;color:#aaa;font-size:12px;">© ${new Date().getFullYear()} Nexus PC. All rights reserved.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    try {
      await sendEmail({ to: user.email, subject: 'Login Alert - Nexus PC', html: loginEmailHtml });
    } catch (emailErr) {
      console.error('Login alert email failed:', emailErr.message);
    }

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        user_role: user.user_role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/forgot-password
// @desc    Send password reset email (replaces forgot_password.php)
// ─────────────────────────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account with that email.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <tr><td style="background:#111;padding:28px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:-0.5px;">NEXUS<span style="color:#aaa;font-weight:300;">PC</span></h1>
              </td></tr>
              <tr><td style="padding:40px;">
                <h2 style="margin:0 0 12px;font-size:20px;color:#111;">Reset your password</h2>
                <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.6;">You requested a password reset for your Nexus PC account. Click the button below to choose a new password.</p>
                <a href="${resetUrl}" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:0.3px;">Reset Password</a>
                <p style="margin:28px 0 0;color:#999;font-size:13px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
              </td></tr>
              <tr><td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #e4e4e7;">
                <p style="margin:0;color:#aaa;font-size:12px;">© ${new Date().getFullYear()} Nexus PC. All rights reserved.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    await sendEmail({ to: email, subject: 'Password Reset - Nexus PC', html: emailHtml });

    res.json({ success: true, message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ success: false, message: 'Failed to send reset email.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/reset-password/:token
// @desc    Reset password (replaces reset_password.php)
// ─────────────────────────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset link.' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful! You can now log in.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Password reset failed.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @desc    Get current logged-in user (replaces $_SESSION['user_id'])
// ─────────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/resend-verification
// @desc    Resend email verification link
// ─────────────────────────────────────────────────────────
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account with that email.' });
    }
    if (user.is_verified) {
      return res.status(400).json({ success: false, message: 'This email is already verified.' });
    }

    // Generate a fresh token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding:40px 20px;">
            <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <tr><td style="background:#111;padding:28px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:-0.5px;">NEXUS<span style="color:#aaa;font-weight:300;">PC</span></h1>
              </td></tr>
              <tr><td style="padding:40px;">
                <h2 style="margin:0 0 12px;font-size:20px;color:#111;">Verify your email address</h2>
                <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.6;">Here is your new verification link. Click below to activate your account.</p>
                <a href="${verifyUrl}" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:600;">Verify Email</a>
                <p style="margin:28px 0 0;color:#999;font-size:13px;">This link expires in 24 hours.</p>
              </td></tr>
              <tr><td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #e4e4e7;">
                <p style="margin:0;color:#aaa;font-size:12px;">© ${new Date().getFullYear()} Nexus PC. All rights reserved.</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    await sendEmail({ to: email, subject: 'Verify Your Email - Nexus PC', html: emailHtml });
    res.json({ success: true, message: 'Verification email resent. Please check your inbox.' });
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ success: false, message: 'Failed to resend verification email.' });
  }
};
