import { sendSMS } from '../utils/twilioClient.js';
import { sendEmail } from '../utils/emailClient.js';
import Message from '../models/Message.js';

export const sendPatientMessage = async (req, res) => {
  const { type, to, patientId, content, subject } = req.body;

  try {
    let result;
    if (type === 'sms') {
      result = await sendSMS(to, content);
    } else if (type === 'email') {
      result = await sendEmail({ to, subject, text: content });
    }

    const newMsg = new Message({
      type,
      direction: 'sent',
      patientId,
      to,
      from: type === 'sms' ? process.env.TWILIO_PHONE_NUMBER : process.env.EMAIL_USER,
      content,
      status: 'sent'
    });

    await newMsg.save();
    res.status(200).json({ message: 'Sent successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Sending failed', error: err.message });
  }
};
