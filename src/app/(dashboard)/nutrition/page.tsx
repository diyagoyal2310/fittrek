import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMacroPlanForCurrentUser } from "@/actions/nutritionActions";
import { MealLoggerForm } from "@/components/nutrition/MealLoggerForm";
import { ScanMealDialog } from "@/components/nutrition/ScanMealDialog";
import { StaggerGroup, StaggerItem } from "@/components/motion/FadeIn";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function NutritionPage() {
  const session = await auth();
  const plan = await getMacroPlanForCurrentUser(true);
  const dict = getDictionary(await getLocale());
  const d = dict.nutrition;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const todaysLogs = await db.nutritionLog.findMany({
    where: { userId: session!.user.id, date: { gte: startOfDay } },
    orderBy: { date: "desc" },
  });

  const totals = todaysLogs.reduce(
    (acc: { calories: number; proteinG: number; carbsG: number; fatG: number }, log: { calories: number; proteinG: number; carbsG: number; fatG: number }) => ({
      calories: acc.calories + log.calories,
      proteinG: acc.proteinG + log.proteinG,
      carbsG: acc.carbsG + log.carbsG,
      fatG: acc.fatG + log.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{d.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{d.targetMacros}</CardTitle>
        </CardHeader>
        <CardContent>
          {plan ? (
            <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StaggerItem>
                <MacroStat label={d.macros.calories} value={plan.calories} unit="kcal" />
              </StaggerItem>
              <StaggerItem>
                <MacroStat label={d.macros.protein} value={plan.proteinG} unit="g" />
              </StaggerItem>
              <StaggerItem>
                <MacroStat label={d.macros.carbs} value={plan.carbsG} unit="g" />
              </StaggerItem>
              <StaggerItem>
                <MacroStat label={d.macros.fat} value={plan.fatG} unit="g" />
              </StaggerItem>
            </StaggerGroup>
          ) : (
            <p className="text-sm text-muted-foreground">{d.unableToCompute}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{d.intakeSoFar}</CardTitle>
          <CardAction>
            <ScanMealDialog dict={d.scan} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MacroStat label={d.macros.calories} value={Math.round(totals.calories)} unit="kcal" />
            <MacroStat label={d.macros.protein} value={Math.round(totals.proteinG)} unit="g" />
            <MacroStat label={d.macros.carbs} value={Math.round(totals.carbsG)} unit="g" />
            <MacroStat label={d.macros.fat} value={Math.round(totals.fatG)} unit="g" />
          </div>
          <MealLoggerForm dict={d.form} />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">{d.loggedMeals}</h2>
        {todaysLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">{d.noMeals}</p>
        ) : (
          <div className="divide-y rounded-lg border bg-card">
            {todaysLogs.map((log: { id: string; mealName: string | null; calories: number; proteinG: number; carbsG: number; fatG: number }) => (
              <div key={log.id} className="flex items-center justify-between px-4 py-2 text-sm">
                <span className="font-medium">{log.mealName ?? "Meal"}</span>
                <span className="tabular-nums text-muted-foreground">
                  {log.calories} kcal · P{log.proteinG} C{log.carbsG} F{log.fatG}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MacroStat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold tabular-nums">
        {value} <span className="text-xs text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}
