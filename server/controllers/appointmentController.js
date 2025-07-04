import Appointment from '../models/appointment.js';
import { canDoubleBook } from '../utils/doubleBookingChecker.js';

export const createAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      timeSlot, // this now matches the schema
      provider = 'Dr. Default',
      procedure = 'General Cleaning',
      confirmed = true
    } = req.body;

    // ✅ Fallback if time not provided
    const appointmentTime = timeSlot || '10:00 AM';

    // ⚠️ Validate required fields
    if (!name || !phone || !date) {
      return res.status(400).json({ error: 'Missing required fields: name, phone, or date.' });
    }

    const newAppt = {
      name,
      email,
      phone,
      date,
      timeSlot: appointmentTime,
      provider,
      procedure,
      confirmed
    };

    const existing = await Appointment.find({
      date: new Date(date),
      provider
    });

    if (!canDoubleBook(existing, newAppt)) {
      return res.status(409).json({ message: 'Too many overlaps. Cannot double-book.' });
    }

    const savedAppt = await Appointment.create(newAppt);
    res.status(201).json({ message: '✅ Appointment booked!', appointment: savedAppt });

  } catch (error) {
    console.error('❌ Appointment booking error:', error.message);
    res.status(500).json({ error: 'Failed to create appointment or send notification.' });
  }
};



