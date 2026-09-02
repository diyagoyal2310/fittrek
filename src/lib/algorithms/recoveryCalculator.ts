export function calculateRecoveryScore(params: {
  sleepScore: number;
  hrv: number;
  baselineHrv: number;
  activeCalories: number;
}): number {
  const { sleepScore, hrv, baselineHrv } = params;

  // Weightings: Sleep (40%), HRV Ratio (60%)
  const hrvRatio = Math.min(hrv / baselineHrv, 1.2);
  const hrvScore = hrvRatio * 100;

  const totalScore = sleepScore * 0.4 + hrvScore * 0.6;
  return Math.round(Math.min(Math.max(totalScore, 0), 100));
}

export type ReadinessBand = "low" | "moderate" | "high";

export function getReadinessBand(recoveryScore: number): ReadinessBand {
  if (recoveryScore < 50) return "low";
  if (recoveryScore <= 80) return "moderate";
  return "high";
}
