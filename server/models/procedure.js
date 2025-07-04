import mongoose from 'mongoose';

const ProcedureSchema = new mongoose.Schema({
  name: String,
  duration: Number, // in minutes
  cost: Number,
  coveredByInsurance: Boolean,
});

export default mongoose.model('Procedure', ProcedureSchema);
