export const checkPromotionEligibility = (patient) => {
  if (!patient.isInsured) {
    return {
      eligible: true,
      offer: '$79 cleaning for uninsured patients'
    };
  }
  return { eligible: false };
};
