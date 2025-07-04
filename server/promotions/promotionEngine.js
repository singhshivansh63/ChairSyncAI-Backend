// server/promotions/promotionEngine.js

export const applyPromotions = (patient, appointmentType) => {
  const promotions = [];

  // Example: $79 cleaning for uninsured
  if (!patient.insurance && appointmentType === 'cleaning') {
    promotions.push({
      title: '$79 Cleaning for Uninsured',
      discount: 50, // assume original price is $129
      finalPrice: 79,
    });
  }

  // Add other promotion rules here...

  return promotions;
};

export const checkPromotion = (patient) => {
  const offers = [];

  if (!patient.insuranceProvider || patient.insuranceProvider === 'None') {
    offers.push({
      name: '$79 Cleaning Offer',
      description: 'Get a full cleaning for just $79 if you don’t have insurance.',
      code: 'CLEAN79',
      discountPrice: 79,
    });
  }

  // Future offers can be added here based on patient age, visit history, etc.

  return offers;
};
