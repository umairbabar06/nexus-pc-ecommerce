const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  createStripeSession,
  stripeWebhook,
  verifyStripeSession,
  getBankDetails,
  initJazzCash,
  jazzCashCallback,
  initEasypaisa,
  easypaisaCallback,
} = require('../controllers/payment.controller');

// ── Stripe ────────────────────────────────────────────────────────────────────
// Webhook must use raw body (configured in server.js) — no auth required
router.post('/stripe/webhook',          stripeWebhook);
// Session creation requires auth
router.post('/stripe/create-session',   protect, createStripeSession);
// Verify session status (from success page)
router.get('/stripe/verify/:sessionId', verifyStripeSession);

// ── Bank Transfer ─────────────────────────────────────────────────────────────
router.get('/bank-details', getBankDetails);

// ── JazzCash (Coming Soon) ────────────────────────────────────────────────────
router.post('/jazzcash/init',      protect, initJazzCash);
router.post('/jazzcash/callback',           jazzCashCallback);

// ── Easypaisa (Coming Soon) ───────────────────────────────────────────────────
router.post('/easypaisa/init',     protect, initEasypaisa);
router.post('/easypaisa/callback',          easypaisaCallback);

module.exports = router;
