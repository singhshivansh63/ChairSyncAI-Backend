// server/routes/promotionRoutes.js
import express from 'express';
import Patient from '../models/patientModel.js';
import { getPromotionsForPatient } from '../controllers/promotionController.js';

const router = express.Router();

// 🟢 Apply cleaning promotion if no insurance
router.get('/cleaning-offer/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    if (!patient.insuranceProvider || patient.insuranceProvider === 'None') {
      return res.json({
        offer: true,
        message: 'Eligible for $79 Cleaning Offer',
        price: 79
      });
    }

    // Example: GET /api/promotions/662db234214cae08fd221c0f
router.get('/:patientId', getPromotionsForPatient);

    res.json({ offer: false, message: 'Insurance present, standard pricing applies' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
