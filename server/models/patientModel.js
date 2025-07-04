// server/models/Patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  insurance: { type: Boolean, default: false },
  lastVisit: { type: Date },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'overdue', 'lapsed', 'chronic_no_show'],
    default: 'active'
  },
  noShowCount: { type: Number, default: 0 },
  riskScore: { type: Number, default: 0 }, // ML-based no-show prediction score
  segments: [String] // optional tags like 'at-risk', 'VIP'
});

export default mongoose.model('Patient', patientSchema);





