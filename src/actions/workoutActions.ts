"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { getLatestBiometric } from "@/actions/biometricActions";

export async function createWorkoutSession(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in.");
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Session name is required.");
  }

  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } });
  const latestBiometric = await getLatestBiometric(session.user.id);

  const workoutSession = await db.workoutSession.create({
    data: {
      userId: session.user.id,
      name,
      goal: user.goal,
      readinessAtStart: latestBiometric?.recoveryScore ?? null,
    },
  });

  revalidatePath("/workouts");
  redirect(`/workouts/${workoutSession.id}`);
}

export async function logWorkoutSet(data: {
  sessionId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  rpe: number;
}) {
  await db.workoutSet.create({
    data: {
      workoutSessionId: data.sessionId,
      exerciseName: data.exerciseName,
      weightKg: data.weightKg,
      reps: data.reps,
      rpe: data.rpe,
    },
  });

  revalidatePath("/workouts");
  revalidatePath(`/workouts/${data.sessionId}`);
}

export async function completeWorkoutSession(sessionId: string) {
  await db.workoutSession.update({
    where: { id: sessionId },
    data: { completedAt: new Date() },
  });

  revalidatePath("/workouts");
  revalidatePath(`/workouts/${sessionId}`);
}
