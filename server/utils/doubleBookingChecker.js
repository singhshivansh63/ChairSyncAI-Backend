// This utility checks if dynamic double-booking is possible
export const canDoubleBook = (existingAppointments, newAppointment) => {
  const MAX_OVERLAPS_ALLOWED = 1; // Define your policy (e.g., only 1 overlapping allowed)
  let overlaps = 0;

  existingAppointments.forEach((appt) => {
    const startsBeforeEndsAfter =
      new Date(appt.startTime) < new Date(newAppointment.endTime) &&
      new Date(appt.endTime) > new Date(newAppointment.startTime);

    if (startsBeforeEndsAfter) overlaps += 1;
  });

  return overlaps <= MAX_OVERLAPS_ALLOWED;
};
