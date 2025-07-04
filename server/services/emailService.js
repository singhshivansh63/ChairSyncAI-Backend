// server/services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();  // ✅ Load .env variables

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // should be 'apikey'
    pass: process.env.SMTP_PASS  // your SendGrid API key
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"ChairSyncAI" <shivanshsinghaps@gmail.com>',
    to,
    subject,
    text,
    html
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email failed:', error);
    throw error;
  }
};


