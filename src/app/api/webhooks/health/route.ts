import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/prisma";
import { calculateRecoveryScore } from "@/lib/algorithms/recoveryCalculator";

const BASELINE_HRV = 55;

const healthPayloadSchema = z.object({
  userId: z.string().min(1),
  activeCalories: z.number().nonnegative().default(0),
  sleepScore: z.number().min(0).max(100).default(70),
  hrv: z.number().nonnegative().default(50),
  restingHeartRate: z.number().int().positive().optional(),
});

export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.HEALTH_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = healthPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { userId, activeCalories, sleepScore, hrv, restingHeartRate } = parsed.data;

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Unknown userId" }, { status: 404 });
  }

  const recoveryScore = calculateRecoveryScore({
    sleepScore,
    hrv,
    baselineHrv: BASELINE_HRV,
    activeCalories,
  });

  await db.biometricLog.create({
    data: {
      userId,
      activeCalories,
      sleepScore,
      hrv,
      restingHeartRate,
      recoveryScore,
      rawPayload: body as Record<string, unknown>,
    },
  });

  return NextResponse.json({ success: true, recoveryScore }, { status: 200 });
}
