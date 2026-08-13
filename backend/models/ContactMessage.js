const mongoose = require('mongoose');

/**
 * ContactMessage Model
 * Stores every contact form submission so messages are never lost
 * even if the email delivery fails.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    // 'new' = unread, 'read' = admin opened it, 'replied' = admin replied
    status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
