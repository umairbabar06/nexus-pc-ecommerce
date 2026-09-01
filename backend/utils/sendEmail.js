const nodemailer = require('nodemailer');

/**
 * Send an email using Nodemailer and Gmail SMTPS (Port 465)
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - HTML body
 */
const sendEmail = async ({ to, subject, html }) => {
  // Create a transporter using Port 465 (Secure) which is less likely to be blocked
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const fromAddress = process.env.EMAIL_FROM || `Nexus PC <${process.env.EMAIL_USER}>`;

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully via Nodemailer (Port 465), id:', info.messageId);
  return info;
};

module.exports = sendEmail;
