// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/db.js';

// Load environment variables early
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

// ✅ Connect DB
connectDB();

// ✅ Routes
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import statsRoutes from './routes/stats.js';
import promotionRoutes from './routes/promotions.js';
import messageRoutes from './routes/messages.js';
import emailTestRoutes from './routes/emailtest.js';
import testSmsRoute from './routes/testsms.js';
import authRoutes from './routes/authRoutes.js';

// ✅ Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/email', emailTestRoutes);
app.use('/api/test', testSmsRoute);
app.use('/api/auth', authRoutes);

// ✅ Health check root
app.get('/', (req, res) => {
  res.send('ChairSyncAI Server is Running 🚀');
});

// ✅ Test SMS route (for debugging only)
import twilio from 'twilio';
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/test-sms', async (req, res) => {
  try {
    const response = await twilioClient.messages.create({
      body: '📱 Test message from ChairSyncAI backend!',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+919335630892' // Replace with verified number
    });
    res.send(`✅ SMS sent! SID: ${response.sid}`);
  } catch (err) {
    console.error('❌ Twilio Error:', err.message);
    res.status(500).send(`❌ Twilio failed: ${err.message}`);
  }
});

// ✅ 404 Fallback (handles HTML error issues in frontend)
app.use('*', (req, res) => {
  res.status(404).json({ message: '❌ API route not found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});











