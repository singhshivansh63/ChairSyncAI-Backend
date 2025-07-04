import express from 'express';
import { fetchPatients, fetchAppointments } from '../services/openDentalSync.js';

const router = express.Router();

router.get('/sync-patients', async (req, res) => {
  try {
    const data = await fetchPatients();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sync-appointments', async (req, res) => {
  try {
    const data = await fetchAppointments();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
