const express = require('express');
const router = express.Router();
const { handleWebChat, handleWhatsAppWebhook } = require('../controllers/chat.controller');

// @route   POST /api/chat/web
// @desc    Handle messages from the web UI
router.post('/web', handleWebChat);

// @route   POST /api/chat/webhook
// @desc    Handle incoming messages from Twilio WhatsApp Sandbox
// Twilio sends data as URL-encoded, which express.urlencoded() handles
router.post('/webhook', handleWhatsAppWebhook);

module.exports = router;
