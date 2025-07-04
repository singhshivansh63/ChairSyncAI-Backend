import Patient from '../models/patientModel.js';
import { checkPromotion } from '../promotions/promotionEngine.js';

export const getPromotionsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const promotions = checkPromotion(patient);
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
