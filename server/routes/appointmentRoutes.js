// server/routes/appointmentRoutes.js
import express from 'express';
import Appointment from '../models/appointment.js';
import Patient from '../models/patientModel.js';
import { applyPromotions } from '../promotions/promotionEngine.js';
import { sendEmail } from '../services/emailService.js';
import { sendSMS } from '../services/smsService.js'; // make sure this is defined correctly

const router = express.Router();

// ✅ Simple route test
router.get('/', (req, res) => {
  res.send('✅ GET /api/appointments is working!');
});

// ✅ Book a new appointment (POST /api/appointments)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, procedure } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      timeSlot: req.body.timeSlot || '10:00 AM', // Fallback time
      date,
      procedure,
    });

    await newAppointment.save();

    // Send SMS
    if (phone) {
      await sendSMS(phone, `Hi ${name}, your appointment is confirmed for ${date}.`);
    }

    // Send Email
    if (email) {
      await sendEmail({
        to: email,
        subject: 'Appointment Confirmation',
        text: `Hi ${name}, your appointment is set for ${date}. Procedure: ${procedure}`,
        html: `<p>Hi <strong>${name}</strong>, your appointment is set for <strong>${date}</strong>. Procedure: ${procedure}</p>`,
      });
    }

    res.status(201).json({ message: 'Appointment created and notifications sent!' });
  } catch (err) {
    console.error('❌ Appointment booking error:', err.message);
    res.status(500).json({ error: 'Failed to create appointment or send notification' });
  }
});

// ✅ Check promotions route (POST /api/appointments/check-promotions)
router.post('/check-promotions', async (req, res) => {
  const { patientId, appointmentType } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const promos = applyPromotions(patient, appointmentType);
    res.status(200).json(promos);
  } catch (error) {
    console.error('❌ Promotion check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  console.log('▶️ Received data ->', req.body);

  // ... rest of logic
});



export default router;











