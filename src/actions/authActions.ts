"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validation/auth";

export async function registerUser(_prevState: unknown, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    weightKg: formData.get("weightKg"),
    heightCm: formData.get("heightCm"),
    age: formData.get("age"),
    sex: formData.get("sex"),
    goal: formData.get("goal"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      weightKg: parsed.data.weightKg,
      heightCm: parsed.data.heightCm,
      age: parsed.data.age,
      sex: parsed.data.sex,
      goal: parsed.data.goal,
    },
  });

  return { success: true };
}
