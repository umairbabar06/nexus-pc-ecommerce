const { Resend } = require('resend');

/**
 * Send an email using Resend HTTP API
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - HTML body
 */
const sendEmail = async ({ to, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Resend free tier requires sending from onboarding@resend.dev unless a custom domain is verified
  const fromAddress = process.env.EMAIL_FROM && process.env.EMAIL_FROM.includes('@resend.dev')
    ? process.env.EMAIL_FROM
    : 'Nexus PC <onboarding@resend.dev>';

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend error details:', JSON.stringify(error, null, 2));
    throw new Error(error.message || 'Failed to send email via Resend');
  }

  console.log('Email sent successfully via Resend, id:', data?.id);
  return data;
};

module.exports = sendEmail;
