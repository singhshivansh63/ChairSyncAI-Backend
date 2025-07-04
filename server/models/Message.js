import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  type: { type: String, enum: ['sms', 'email'], required: true },
  direction: { type: String, enum: ['sent', 'received'], default: 'sent' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  to: String,
  from: String,
  content: String,
  status: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);
