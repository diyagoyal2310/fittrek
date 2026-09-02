import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function AnalyticsPage() {
  const session = await auth();
  const userId = session!.user.id;
  const dict = getDictionary(await getLocale());
  const d = dict.analytics;

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [biometrics, workoutSessions, nutritionLogs] = await Promise.all([
    db.biometricLog.findMany({
      where: { userId, date: { gte: since } },
      orderBy: { date: "asc" },
    }),
    db.workoutSession.findMany({
      where: { userId, createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      include: { sets: true },
    }),
    db.nutritionLog.findMany({
      where: { userId, date: { gte: since } },
      orderBy: { date: "asc" },
    }),
  ]);

  const recoveryTrend = biometrics.map((b: { date: Date; recoveryScore: number }) => ({
    date: b.date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    recovery: b.recoveryScore,
  }));

  const volumeTrend = workoutSessions.map((s: { createdAt: Date; sets: Array<{ weightKg: number; reps: number }> }) => ({
    date: s.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    volume: Math.round(s.sets.reduce((sum: number, set: { weightKg: number; reps: number }) => sum + set.weightKg * set.reps, 0)),
  }));

  const macroByDay = new Map<string, { date: string; protein: number; carbs: number; fat: number }>();
  for (const log of nutritionLogs) {
    const key = log.date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const entry = macroByDay.get(key) ?? { date: key, protein: 0, carbs: 0, fat: 0 };
    entry.protein += log.proteinG;
    entry.carbs += log.carbsG;
    entry.fat += log.fatG;
    macroByDay.set(key, entry);
  }
  const macroTrend = Array.from(macroByDay.values());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{d.title}</h1>
      <AnalyticsCharts
        recoveryTrend={recoveryTrend}
        volumeTrend={volumeTrend}
        macroTrend={macroTrend}
        dict={d}
      />
    </div>
  );
}
