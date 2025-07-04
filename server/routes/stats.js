import express from 'express';
import Patient from '../models/patientModel.js';
import Appointment from '../models/appointment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const patientsCount = await Patient.countDocuments();
  const appointmentsCount = await Appointment.countDocuments();
  const satisfaction = 98; // Static or from logic
  const revenue = 127000;

  res.json({
    patientsCount,
    appointmentsCount,
    satisfaction,
    revenue
  });
});

export default router;
