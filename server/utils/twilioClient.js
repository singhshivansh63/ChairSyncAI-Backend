import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

export const twilioClient = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: fromNumber,
    to: to
  });
};
