import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // ✅ use `time` instead of timeSlot
  provider: { type: String, default: 'Dr. Default' },
  procedure: { type: String, default: 'General Checkup' },
  confirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  noShow: { type: Boolean, default: false }
});

export default mongoose.model('Appointment', appointmentSchema);


 



