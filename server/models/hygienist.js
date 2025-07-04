import mongoose from 'mongoose';

const HygienistSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  availability: [String], // e.g., ['2025-07-01T10:00', '2025-07-01T11:00']
});

export default mongoose.model('Hygienist', HygienistSchema);
