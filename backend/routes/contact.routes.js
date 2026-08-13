const express = require('express');
const router  = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { contactLimiter } = require('../middleware/rateLimiter');
const {
  submitContact,
  getMessages,
  updateMessage,
  deleteMessage,
} = require('../controllers/contact.controller');

// Public — rate limited to 5 per hour to prevent spam
router.post('/', contactLimiter, submitContact);

// Admin — view/manage messages
router.get('/',       protect, adminOnly, getMessages);
router.put('/:id',    protect, adminOnly, updateMessage);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
