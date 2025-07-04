export const calculateRiskScore = (patient) => {
  const noShowRate = patient.noShowCount / (patient.visits.length || 1);
  const monthsSinceLastVisit = (new Date() - new Date(patient.lastVisit)) / (1000 * 60 * 60 * 24 * 30);
  return Math.min(100, Math.floor(noShowRate * 70 + monthsSinceLastVisit));
};
