type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
  goal: "CUT" | "BULK" | "RECOMP" | "HYPERTROPHY";
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "MALE" | "FEMALE";
};

type BiometricLogRecord = {
  id: string;
  userId: string;
  date: Date;
  recoveryScore: number;
  activeCalories: number;
  sleepScore: number;
  hrv: number;
  restingHeartRate: number | null;
};

type NutritionLogRecord = {
  id: string;
  userId: string;
  date: Date;
  mealName: string | null;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

type WorkoutSetRecord = {
  id: string;
  workoutSessionId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  rpe: number | null;
  createdAt: Date;
};

type WorkoutSessionRecord = {
  id: string;
  userId: string;
  name: string;
  goal?: string | null;
  createdAt: Date;
  completedAt: Date | null;
  readinessAtStart: number | null;
  sets: WorkoutSetRecord[];
  _count?: { sets: number };
};

type DbClient = {
  user: {
    findUnique: (args: { where: { email?: string; id?: string } }) => Promise<UserRecord | null>;
    findUniqueOrThrow: (args: { where: { id: string } }) => Promise<UserRecord>;
    create: (args: { data: Record<string, unknown> }) => Promise<UserRecord>;
  };
  biometricLog: {
    findFirst: (args?: Record<string, unknown>) => Promise<BiometricLogRecord | null>;
    findMany: (args?: Record<string, unknown>) => Promise<BiometricLogRecord[]>;
    create: (args: { data: Record<string, unknown> }) => Promise<BiometricLogRecord>;
  };
  nutritionLog: {
    findMany: (args?: Record<string, unknown>) => Promise<NutritionLogRecord[]>;
    create: (args: { data: Record<string, unknown> }) => Promise<NutritionLogRecord>;
  };
  workoutSession: {
    findMany: (args?: Record<string, unknown>) => Promise<WorkoutSessionRecord[]>;
    findFirst: (args?: Record<string, unknown>) => Promise<WorkoutSessionRecord | null>;
    create: (args: { data: Record<string, unknown> }) => Promise<WorkoutSessionRecord>;
    update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<WorkoutSessionRecord>;
  };
  workoutSet: {
    create: (args: { data: Record<string, unknown> }) => Promise<WorkoutSetRecord>;
  };
};

const emptyDb: DbClient = {
  user: {
    findUnique: async () => null,
    findUniqueOrThrow: async () => {
      throw new Error("Database is unavailable. Prisma client is not generated.");
    },
    create: async () => ({
      id: "local-user",
      email: "local@example.com",
      name: "Local user",
      passwordHash: null,
      goal: "RECOMP",
      weightKg: 70,
      heightCm: 175,
      age: 28,
      sex: "MALE",
    } as UserRecord),
  },
  biometricLog: {
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({ id: "local-biometric", userId: "local-user", date: new Date(), recoveryScore: 0, activeCalories: 0, sleepScore: 0, hrv: 0, restingHeartRate: null } as BiometricLogRecord),
  },
  nutritionLog: {
    findMany: async () => [],
    create: async () => ({ id: "local-nutrition", userId: "local-user", date: new Date(), mealName: null, calories: 0, proteinG: 0, carbsG: 0, fatG: 0 } as NutritionLogRecord),
  },
  workoutSession: {
    findMany: async () => [],
    findFirst: async () => null,
    create: async () => ({ id: "local-workout", userId: "local-user", name: "Local workout", createdAt: new Date(), completedAt: null, readinessAtStart: null, goal: null, sets: [], _count: { sets: 0 } } as WorkoutSessionRecord),
    update: async () => ({ id: "local-workout", userId: "local-user", name: "Local workout", createdAt: new Date(), completedAt: new Date(), readinessAtStart: null, goal: null, sets: [], _count: { sets: 0 } } as WorkoutSessionRecord),
  },
  workoutSet: {
    create: async () => ({ id: "local-set", workoutSessionId: "local-workout", exerciseName: "Local exercise", weightKg: 0, reps: 0, rpe: null, createdAt: new Date() } as WorkoutSetRecord),
  },
};

export function isDbAvailable() {
  return false;
}

export const db: DbClient = emptyDb;
