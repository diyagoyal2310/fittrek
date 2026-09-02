"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { getLatestBiometric } from "@/actions/biometricActions";
import { calculateBmr, calculateTdee, generateMacroPlan } from "@/lib/algorithms/macroCalculator";

export async function getMacroPlanForCurrentUser(isTrainingDay = true) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } });
  const latestBiometric = await getLatestBiometric(session.user.id);

  const bmr = calculateBmr({
    weightKg: user.weightKg,
    heightCm: user.heightCm,
    age: user.age,
    sex: user.sex,
  });
  const tdee = calculateTdee({
    bmr,
    activeCalories: latestBiometric?.activeCalories ?? 0,
  });

  return generateMacroPlan({
    goal: user.goal,
    weightKg: user.weightKg,
    maintenanceCalories: tdee,
    isTrainingDay,
  });
}

async function createNutritionLog(
  userId: string,
  data: { mealName: string | null; calories: number; proteinG: number; carbsG: number; fatG: number },
) {
  await db.nutritionLog.create({
    data: {
      userId,
      mealName: data.mealName,
      calories: data.calories,
      proteinG: data.proteinG,
      carbsG: data.carbsG,
      fatG: data.fatG,
    },
  });
  revalidatePath("/nutrition");
}

export async function logMeal(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not signed in." };
  }

  const mealName = String(formData.get("mealName") ?? "").trim() || null;
  const calories = Number(formData.get("calories"));
  const proteinG = Number(formData.get("proteinG"));
  const carbsG = Number(formData.get("carbsG"));
  const fatG = Number(formData.get("fatG"));

  if ([calories, proteinG, carbsG, fatG].some((n) => Number.isNaN(n) || n < 0)) {
    return { error: "Macro values must be non-negative numbers." };
  }

  await createNutritionLog(session.user.id, { mealName, calories, proteinG, carbsG, fatG });
  return { success: true };
}

export interface BarcodeLookupResult {
  name: string;
  caloriesPer100g: number;
  proteinPer100gG: number;
  carbsPer100gG: number;
  fatPer100gG: number;
  servingSizeG: number | null;
}

function toFiniteNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Looks up a scanned barcode against Open Food Facts (free, no API key).
 * Returns per-100g macros so the client can scale by grams actually eaten.
 */
export async function lookupBarcode(barcode: string): Promise<BarcodeLookupResult | null> {
  const trimmed = barcode.trim();
  if (!/^\d{6,14}$/.test(trimmed)) return null;

  let res: Response;
  try {
    res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${trimmed}.json?fields=product_name,nutriments,serving_quantity`,
      { headers: { "User-Agent": "FitPulseAI/1.0 (nutrition lookup)" } },
    );
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const data = await res.json().catch(() => null);
  if (!data || data.status !== 1 || !data.product) return null;

  const name = typeof data.product.product_name === "string" ? data.product.product_name.trim() : "";
  if (!name) return null;

  const n = data.product.nutriments ?? {};

  return {
    name,
    caloriesPer100g: toFiniteNumber(n["energy-kcal_100g"]),
    proteinPer100gG: toFiniteNumber(n["proteins_100g"]),
    carbsPer100gG: toFiniteNumber(n["carbohydrates_100g"]),
    fatPer100gG: toFiniteNumber(n["fat_100g"]),
    servingSizeG: data.product.serving_quantity ? toFiniteNumber(data.product.serving_quantity) : null,
  };
}

export async function logScannedMeal(data: {
  mealName: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in.");
  }
  await createNutritionLog(session.user.id, {
    mealName: data.mealName.trim() || null,
    calories: data.calories,
    proteinG: data.proteinG,
    carbsG: data.carbsG,
    fatG: data.fatG,
  });
}
