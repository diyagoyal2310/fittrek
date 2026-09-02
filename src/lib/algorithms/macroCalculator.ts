export type Sex = "MALE" | "FEMALE";
export type Goal = "CUT" | "BULK" | "RECOMP" | "HYPERTROPHY";

const TEF_RATE = 0.1; // Thermic Effect of Food, ~10% of intake

/** Mifflin-St Jeor basal metabolic rate. */
export function calculateBmr(params: {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: Sex;
}): number {
  const { weightKg, heightCm, age, sex } = params;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "MALE" ? base + 5 : base - 161;
}

/** FR-1.2: TDEE = BMR + Active Burn (Mi Watch) + TEF. */
export function calculateTdee(params: {
  bmr: number;
  activeCalories: number;
}): number {
  const { bmr, activeCalories } = params;
  const tef = (bmr + activeCalories) * TEF_RATE;
  return Math.round(bmr + activeCalories + tef);
}

export interface MacroPlan {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

const PROTEIN_G_PER_KG: Record<Goal, number> = {
  CUT: 2.4,
  BULK: 2.0,
  RECOMP: 2.2,
  HYPERTROPHY: 2.2,
};

/**
 * FR-3.1: goal-based macro split off maintenance TDEE.
 * Carb cycling (higher carbs on heavy training days) for Recomp is applied
 * by passing `isTrainingDay: true`.
 */
export function generateMacroPlan(params: {
  goal: Goal;
  weightKg: number;
  maintenanceCalories: number;
  isTrainingDay?: boolean;
}): MacroPlan {
  const { goal, weightKg, maintenanceCalories, isTrainingDay = true } = params;
  const proteinG = Math.round(PROTEIN_G_PER_KG[goal] * weightKg);
  const proteinCalories = proteinG * 4;

  let calories = maintenanceCalories;
  if (goal === "CUT") calories = Math.round(maintenanceCalories * 0.8);
  if (goal === "BULK") calories = Math.round(maintenanceCalories * 1.1);
  if (goal === "RECOMP" || goal === "HYPERTROPHY") {
    calories = Math.round(
      maintenanceCalories * (isTrainingDay ? 1.0 : 0.95),
    );
  }

  const remainingCalories = Math.max(calories - proteinCalories, 0);
  // Split remaining calories 55% carbs / 45% fat, shifting toward carbs on
  // training days for Recomp/Hypertrophy per the PRD's carb-cycling note.
  const carbShare = goal === "RECOMP" && isTrainingDay ? 0.65 : 0.55;
  const carbsG = Math.round((remainingCalories * carbShare) / 4);
  const fatG = Math.round((remainingCalories * (1 - carbShare)) / 9);

  return { calories, proteinG, carbsG, fatG };
}
