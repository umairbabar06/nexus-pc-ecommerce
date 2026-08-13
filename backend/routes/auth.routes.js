const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, forgotPassword, resetPassword, getMe, resendVerification } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authLimiter, resetLimiter } = require('../middleware/rateLimiter');

// Public routes — rate limited on sensitive endpoints
router.post('/register',              authLimiter,  register);
router.post('/login',                 authLimiter,  login);
router.get('/verify/:token',                        verifyEmail);
router.post('/resend-verification',   resetLimiter, resendVerification);
router.post('/forgot-password',       resetLimiter, forgotPassword);
router.post('/reset-password/:token', resetLimiter, resetPassword);

// Protected route (requires JWT)
router.get('/me', protect, getMe);

module.exports = router;
