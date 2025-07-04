import express from 'express';
import { sendPatientMessage } from '../controllers/messageController.js';

const router = express.Router();

// POST /api/messages
router.post('/', sendPatientMessage);

export default router;
