const express = require('express');
const router = express.Router();
const { handleWebChat } = require('../controllers/chat.controller');

// @route   POST /api/chat/web
// @desc    Handle messages from the web UI
router.post('/web', handleWebChat);

module.exports = router;
