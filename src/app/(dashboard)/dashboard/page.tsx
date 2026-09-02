import { Activity, Flame, Heart, Moon } from "lucide-react";
import { auth } from "@/auth";
import { getLatestBiometric } from "@/actions/biometricActions";
import { RecoveryGauge } from "@/components/dashboard/RecoveryGauge";
import { BiometricCard } from "@/components/dashboard/BiometricCard";
import { ManualBiometricForm } from "@/components/dashboard/ManualBiometricForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/FadeIn";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function DashboardPage() {
  const session = await auth();
  const latest = await getLatestBiometric(session!.user.id);
  const dict = getDictionary(await getLocale());
  const d = dict.dashboard;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{d.title}</h1>

      <RecoveryGauge recoveryScore={latest?.recoveryScore ?? 0} dict={d} />

      <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <BiometricCard label={d.activeCalories} value={latest?.activeCalories ?? "—"} unit="kcal" icon={Flame} />
        </StaggerItem>
        <StaggerItem>
          <BiometricCard
            label={d.restingHeartRate}
            value={latest?.restingHeartRate ?? "—"}
            unit="bpm"
            icon={Heart}
          />
        </StaggerItem>
        <StaggerItem>
          <BiometricCard label={d.sleepScore} value={latest?.sleepScore ?? "—"} unit="/100" icon={Moon} />
        </StaggerItem>
        <StaggerItem>
          <BiometricCard label={d.hrv} value={latest?.hrv ?? "—"} unit="ms" icon={Activity} />
        </StaggerItem>
      </StaggerGroup>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{d.manualLog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">{d.manualLog.description}</p>
          <ManualBiometricForm dict={d.manualLog} common={dict.common} />
        </CardContent>
      </Card>
    </div>
  );
}
