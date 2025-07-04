import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  action: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
  meta: mongoose.Schema.Types.Mixed
});

export default mongoose.model('AuditLog', AuditLogSchema);
