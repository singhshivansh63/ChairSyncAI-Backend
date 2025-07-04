import express from 'express';
import Patient from '../models/patientModel.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

// POST: Create a new patient and send confirmation email
router.post('/', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();

    // ✅ Send confirmation email
    if (newPatient.email) {
      await sendEmail({
        to: newPatient.email,
        subject: '🦷 Appointment Confirmation – ChairSyncAI',
        text: `Hi ${newPatient.name}, your appointment has been scheduled successfully.`,
        html: `<p>Hi <strong>${newPatient.name}</strong>, your appointment has been confirmed with ChairSyncAI!</p>`
      });
    }

    res.status(201).json({ message: 'Patient saved and email sent!' });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Failed to create patient or send email' });
  }
});

// ✅ GET: Test route to create a dummy patient and send email
router.get('/test', async (req, res) => {
  const samplePatient = {
    name: 'Test Patient',
    email: 'test@example.com',
    phone: '+911234567890',
    lastVisit: new Date()
  };

  try {
    const newPatient = new Patient(samplePatient);
    await newPatient.save();

    await sendEmail({
      to: samplePatient.email,
      subject: '🧪 ChairSyncAI Test Email',
      text: `Hi ${samplePatient.name}, this is a test appointment confirmation.`,
      html: `<p><strong>Hi ${samplePatient.name}</strong>, your test appointment has been confirmed with ChairSyncAI!</p>`
    });

    res.send('✅ Test patient saved and email sent!');
  } catch (err) {
    console.error('❌ Error in /test route:', err.message);
    res.status(500).send('❌ Failed to save test patient or send email');
  }
});

export default router;











