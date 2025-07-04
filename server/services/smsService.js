// server/services/smsService.js
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Sends an SMS using Twilio
 * @param {string} to - The recipient's phone number
 * @param {string} message - The SMS text
 */
export async function sendSMS(to, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log('📲 SMS sent:', result.sid);
    return result;
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
    throw error;
  }
}

export default sendSMS;

