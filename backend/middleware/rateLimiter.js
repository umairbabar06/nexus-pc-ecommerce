const rateLimit = require('express-rate-limit');

/**
 * ─── Rate Limiters ────────────────────────────────────────────────────────────
 * Protects against brute-force attacks and abuse.
 * All limiters use the standard X-RateLimit-* response headers.
 */

// General API limiter — 200 requests per 15 min per IP
// Applied globally to all routes as a baseline
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' },
});

// Auth limiter — strict: 10 attempts per 15 min per IP
// Applied to: /api/auth/login, /api/auth/register, /api/auth/forgot-password
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please wait 15 minutes before trying again.' },
  skipSuccessfulRequests: true, // only count failed/error responses
});

// Contact form limiter — 5 messages per hour per IP
// Prevents contact form spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please wait an hour before sending again.' },
});

// Password reset limiter — 3 requests per hour per IP
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many password reset requests. Please wait an hour.' },
});

module.exports = { apiLimiter, authLimiter, contactLimiter, resetLimiter };
