const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'model'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSessionSchema = new mongoose.Schema({
  sessionId: { 
    type: String, 
    required: true, 
    unique: true 
    // For WhatsApp, this will be the phone number (e.g. 'whatsapp:+1234567890')
    // For Web UI, this will be a unique browser session ID or user ID
  },
  history: [messageSchema],
  expiresAt: { 
    type: Date, 
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // Expires in 24 hours
  }
}, { timestamps: true });

// TTL index to automatically delete sessions after 24 hours of inactivity
chatSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('ChatSession', chatSessionSchema);
