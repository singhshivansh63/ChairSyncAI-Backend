// server/utils/notify.js
import twilio from 'twilio';
import nodemailer from 'nodemailer';

export const sendSMS = async (to, message) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  await client.messages.create({ body: message, from: process.env.TWILIO_PHONE, to });
};

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // sendgrid //
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ChairSync AI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

