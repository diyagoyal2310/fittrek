import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/FadeIn";
import { createWorkoutSession } from "@/actions/workoutActions";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function WorkoutsPage() {
  const session = await auth();
  const dict = getDictionary(await getLocale());
  const d = dict.workouts;

  const sessions = await db.workoutSession.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { sets: true } } },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{d.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{d.startSession.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createWorkoutSession} className="flex items-end gap-3">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="name">{d.startSession.nameLabel}</Label>
              <Input id="name" name="name" placeholder={d.startSession.namePlaceholder} required />
            </div>
            <Button type="submit">{d.startSession.start}</Button>
          </form>
        </CardContent>
      </Card>

      <StaggerGroup className="space-y-2">
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">{d.noSessions}</p>
        ) : (
          sessions.map((s) => (
            <StaggerItem key={s.id}>
              <Link
                href={`/workouts/${s.id}`}
                className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.createdAt.toLocaleDateString()} · {(s._count?.sets ?? 0)} {d.setsSuffix}
                  </p>
                </div>
                <Badge variant={s.completedAt ? "secondary" : "default"}>
                  {s.completedAt ? d.completed : d.inProgress}
                </Badge>
              </Link>
            </StaggerItem>
          ))
        )}
      </StaggerGroup>
    </div>
  );
}
