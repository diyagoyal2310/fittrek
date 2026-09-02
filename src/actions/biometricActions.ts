"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { calculateRecoveryScore } from "@/lib/algorithms/recoveryCalculator";

const BASELINE_HRV = 55;

export async function getLatestBiometric(userId: string) {
  return db.biometricLog.findFirst({
    where: { userId },
    orderBy: { date: "desc" },
  });
}

export async function getRecentBiometrics(userId: string, days = 14) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return db.biometricLog.findMany({
    where: { userId, date: { gte: since } },
    orderBy: { date: "asc" },
  });
}

/**
 * Manual entry fallback for accounts without a Mi Watch / Health Connect
 * webhook wired up yet — computes the same recovery score the webhook does.
 */
export async function logManualBiometric(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not signed in." };
  }

  const activeCalories = Number(formData.get("activeCalories") ?? 0);
  const restingHeartRate = Number(formData.get("restingHeartRate") ?? 0);
  const sleepScore = Number(formData.get("sleepScore") ?? 70);
  const hrv = Number(formData.get("hrv") ?? 50);

  if (Number.isNaN(activeCalories) || Number.isNaN(sleepScore) || Number.isNaN(hrv)) {
    return { error: "Invalid biometric values." };
  }

  const recoveryScore = calculateRecoveryScore({
    sleepScore,
    hrv,
    baselineHrv: BASELINE_HRV,
    activeCalories,
  });

  await db.biometricLog.create({
    data: {
      userId: session.user.id,
      activeCalories,
      restingHeartRate: restingHeartRate || null,
      sleepScore,
      hrv,
      recoveryScore,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
