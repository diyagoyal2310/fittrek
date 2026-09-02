const LOW_READINESS_THRESHOLD = 50;
const VOLUME_DEDUCTION_FACTOR = 0.75;

/**
 * FR-2.2: scales planned working sets down by 25% when the day's
 * readiness/recovery score is below 50%, otherwise leaves volume unchanged.
 */
export function adjustPlannedVolume(
  plannedSets: number,
  readinessScore: number,
): number {
  if (readinessScore < LOW_READINESS_THRESHOLD) {
    return Math.round(plannedSets * VOLUME_DEDUCTION_FACTOR);
  }
  return plannedSets;
}
