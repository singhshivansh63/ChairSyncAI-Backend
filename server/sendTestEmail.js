import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SMTP_PASS // must match your .env SendGrid key
  }
});

const mailOptions = {
  from: 'shivanshsinghaps@gmail.com',
  to: 'shibu1863aps@gmail.com', // replace with your email
  subject: 'Test Email from SendGrid',
  text: 'If you received this, your SendGrid API key works!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('❌ Failed to send:', error);
  }
  console.log('✅ Email sent:', info.response);
});
