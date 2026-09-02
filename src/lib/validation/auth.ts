import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.email(),
  password: z.string().min(8),
  weightKg: z.coerce.number().positive(),
  heightCm: z.coerce.number().positive(),
  age: z.coerce.number().int().min(13).max(100),
  sex: z.enum(["MALE", "FEMALE"]),
  goal: z.enum(["CUT", "BULK", "RECOMP", "HYPERTROPHY"]),
});
