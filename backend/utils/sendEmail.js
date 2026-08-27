const { Resend } = require('resend');

/**
 * Send an email using Resend (HTTP API — works on Render free tier)
 * Replaces nodemailer/SMTP which is blocked on Render's free plan
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - HTML body
 */
const sendEmail = async ({ to, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Nexus PC <onboarding@resend.dev>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
