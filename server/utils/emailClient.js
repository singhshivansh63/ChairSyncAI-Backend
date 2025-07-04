import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net', // default to SendGrid
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // typically 'apikey' for SendGrid
    pass: process.env.SMTP_PASS  // your actual SendGrid API key
  }
});

/**
 * Sends an email using Nodemailer and SMTP.
 * @param {Object} options - Email options.
 * @param {string} options.to - Recipient email.
 * @param {string} options.subject - Email subject.
 * @param {string} options.text - Plain text content.
 * @param {string} [options.html] - Optional HTML content.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"ChairSyncAI" <no-reply@chairsync.ai>',
    to,
    subject,
    text,
    html // optional: allows sending styled content
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};

 
