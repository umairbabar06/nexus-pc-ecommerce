require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('=== EMAIL TEST ===');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER);
  console.log('Pass length:', process.env.EMAIL_PASS?.length, 'chars');
  console.log('');

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection OK!');
  } catch (err) {
    console.error('❌ SMTP connection FAILED:', err.message);
    console.error('Code:', err.code);
    return;
  }

  try {
    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // send to yourself
      subject: 'Nexus PC - Email Test',
      html: '<h2>Email is working!</h2><p>Your Nexus PC email is configured correctly.</p>',
    });
    console.log('✅ Email sent! Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ Send failed:', err.message);
  }
}

testEmail();
