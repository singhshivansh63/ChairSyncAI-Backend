// server/routes/emailTest.js

import express from 'express';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/test', async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Recipient email (to) is required' });
    }

    const result = await sendEmail({
      to,
      subject: '🚀 ChairSyncAI Email Test',
      text: 'This is a plain text email from ChairSyncAI!',
      html: '<h3>This is a test email from <strong>ChairSyncAI</strong> 🚀</h3>'
    });

    res.status(200).json({ message: 'Email sent!', messageId: result.messageId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

export default router;
