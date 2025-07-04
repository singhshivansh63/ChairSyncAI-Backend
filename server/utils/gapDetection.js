export function detectScheduleGaps(schedule, slotLength = 30) {
  const gaps = [];

  for (let i = 1; i < schedule.length; i++) {
    const prev = new Date(schedule[i - 1]);
    const curr = new Date(schedule[i]);

    const diff = (curr - prev) / (1000 * 60); // in minutes
    if (diff > slotLength) {
      gaps.push({
        from: prev.toISOString(),
        to: curr.toISOString(),
        duration: diff,
      });
    }
  }

  return gaps;
}
