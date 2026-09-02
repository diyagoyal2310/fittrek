import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActiveSetLogger } from "@/components/workouts/ActiveSetLogger";
import { adjustPlannedVolume } from "@/lib/algorithms/progressiveOverload";
import { completeWorkoutSession } from "@/actions/workoutActions";
import { getLocale, getDictionary } from "@/lib/i18n";

const DEFAULT_PLANNED_SETS = 3;

export default async function WorkoutSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const dict = getDictionary(await getLocale());
  const d = dict.workouts;

  const workoutSession = await db.workoutSession.findFirst({
    where: { id, userId: session!.user.id },
    include: { sets: { orderBy: { createdAt: "asc" } } },
  });

  if (!workoutSession) notFound();

  const readiness = workoutSession.readinessAtStart ?? 100;
  const adjustedSets = adjustPlannedVolume(DEFAULT_PLANNED_SETS, readiness);
  const isScaledDown = adjustedSets < DEFAULT_PLANNED_SETS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{workoutSession.name}</h1>
          <p className="text-sm text-muted-foreground">
            {d.detail.readinessAtStart}: {Math.round(readiness)}% · {d.detail.suggestedVolume}: {adjustedSets}{" "}
            {d.detail.perExercise}
            {isScaledDown ? ` ${d.detail.autoReduced}` : ""}
          </p>
        </div>
        {workoutSession.completedAt ? (
          <Badge variant="secondary">{d.completed}</Badge>
        ) : (
          <form
            action={async () => {
              "use server";
              await completeWorkoutSession(workoutSession.id);
            }}
          >
            <Button type="submit" variant="outline">
              {d.detail.completeSession}
            </Button>
          </form>
        )}
      </div>

      {!workoutSession.completedAt && <ActiveSetLogger sessionId={workoutSession.id} dict={d.logger} />}

      <div className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">{d.detail.loggedSets}</h2>
        {workoutSession.sets.length === 0 ? (
          <p className="text-sm text-muted-foreground">{d.detail.noSets}</p>
        ) : (
          <div className="divide-y rounded-lg border bg-card">
            {workoutSession.sets.map((set: { id: string; exerciseName: string; weightKg: number; reps: number; rpe: number | null }) => (
              <div key={set.id} className="flex items-center justify-between px-4 py-2 text-sm">
                <span className="font-medium">{set.exerciseName}</span>
                <span className="tabular-nums text-muted-foreground">
                  {set.weightKg}kg × {set.reps} @ {d.logger.rpe} {set.rpe ?? "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
