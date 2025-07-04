// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import helmet from 'helmet';



import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import statsRoutes from './routes/stats.js';
import promotionRoutes from './routes/promotions.js';
import messageRoutes from './routes/messages.js';
import emailTestRoutes from './routes/emailtest.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/email', emailTestRoutes);


// Root Endpoint
app.get('/', (req, res) => {
  res.send('ChairSyncAI Server is Running 🚀');
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

// Security Middleware
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});











