const ContactMessage = require('../models/ContactMessage');
const sendEmail       = require('../utils/sendEmail');

// ─────────────────────────────────────────────────────────
// @route   POST /api/contact
// @desc    Save contact message + send email notifications
// @access  Public
// ─────────────────────────────────────────────────────────
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    // 1. Save to database (always — even if email fails)
    const contact = await ContactMessage.create({
      name:    name.trim().substring(0, 100),
      email:   email.trim().toLowerCase(),
      subject: subject.trim().substring(0, 200),
      message: message.trim().substring(0, 2000),
    });

    // 2. Send notification email to store owner (fire-and-forget — don't fail if SMTP not configured)
    const adminEmail = process.env.EMAIL_USER;
    if (adminEmail && process.env.EMAIL_PASS) {
      sendEmail({
        to: adminEmail,
        subject: `📬 New Contact Message: ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0a0a0a;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:20px;">📬 New Contact Message</h1>
              <p style="color:#888;margin:4px 0 0;">Nexus PC — Contact Form</p>
            </div>
            <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #eee;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#666;width:80px;font-weight:600;">From:</td><td style="padding:8px 0;">${name} &lt;${email}&gt;</td></tr>
                <tr><td style="padding:8px 0;color:#666;font-weight:600;">Subject:</td><td style="padding:8px 0;">${subject}</td></tr>
                <tr><td style="padding:8px 0;color:#666;font-weight:600;">Date:</td><td style="padding:8px 0;">${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
              <h3 style="margin:0 0 8px;color:#333;">Message:</h3>
              <p style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:16px;margin:0;white-space:pre-wrap;color:#444;">${message}</p>
              <p style="margin:20px 0 0;font-size:12px;color:#999;">Message ID: ${contact._id}</p>
            </div>
          </div>
        `,
      }).catch(() => {}); // silent fail — message is already saved to DB
    }

    // 3. Send auto-reply to the sender
    if (process.env.EMAIL_PASS) {
      sendEmail({
        to: email,
        subject: `✅ We received your message — Nexus PC`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0a0a0a;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:#fff;margin:0;font-size:20px;">NEXUS<span style="color:#888">PC</span></h1>
            </div>
            <div style="background:#f9f9f9;padding:28px;border-radius:0 0 12px 12px;border:1px solid #eee;">
              <h2 style="margin:0 0 8px;color:#1a1a1a;">Hi ${name},</h2>
              <p style="color:#444;line-height:1.7;">
                Thanks for reaching out! We've received your message and will get back to you within <strong>24 hours</strong>.
              </p>
              <div style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Your message</p>
                <p style="margin:0;color:#333;font-weight:600;">${subject}</p>
              </div>
              <p style="color:#666;font-size:14px;">
                Need urgent help? Email us directly at 
                <a href="mailto:${adminEmail}" style="color:#0a0a0a;">${adminEmail}</a>
              </p>
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
              <p style="margin:0;font-size:12px;color:#999;">Nexus PC • Pakistan's Premium PC Component Store</p>
            </div>
          </div>
        `,
      }).catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: "Message sent! We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/contact
// @desc    Admin — get all contact messages
// @access  Admin
// ─────────────────────────────────────────────────────────
exports.getMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [messages, total] = await Promise.all([
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      ContactMessage.countDocuments(query),
    ]);

    res.json({ success: true, messages, total, totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   PUT /api/contact/:id
// @desc    Admin — mark message as read or replied
// @access  Admin
// ─────────────────────────────────────────────────────────
exports.updateMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, message: 'Updated.', data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   DELETE /api/contact/:id
// @desc    Admin — delete a contact message
// @access  Admin
// ─────────────────────────────────────────────────────────
exports.deleteMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};
