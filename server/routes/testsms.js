// server/routes/testSms.js
import express from 'express';
import { sendSMS } from '../services/smsService.js';

const router = express.Router();

router.get('/test-sms', async (req, res) => {
  try {
    const result = await sendSMS('+91YOUR_NUMBER', '✅ Test SMS from ChairSyncAI');
    res.json({ message: 'SMS sent!', sid: result.sid });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send SMS', details: err.message });
  }
});

export default router;
