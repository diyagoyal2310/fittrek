"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logManualBiometric } from "@/actions/biometricActions";
import type { Dictionary } from "@/lib/i18n/types";

export function ManualBiometricForm({
  dict,
  common,
}: {
  dict: Dictionary["dashboard"]["manualLog"];
  common: Dictionary["common"];
}) {
  const [state, formAction, isPending] = useActionState(logManualBiometric, null);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-4">
      <div className="space-y-1.5">
        <Label htmlFor="activeCalories">{dict.activeCalories}</Label>
        <Input id="activeCalories" name="activeCalories" type="number" defaultValue={0} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="restingHeartRate">{dict.restingHeartRate}</Label>
        <Input id="restingHeartRate" name="restingHeartRate" type="number" defaultValue={60} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sleepScore">{dict.sleepScore}</Label>
        <Input id="sleepScore" name="sleepScore" type="number" defaultValue={70} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="hrv">{dict.hrv}</Label>
        <Input id="hrv" name="hrv" type="number" defaultValue={50} />
      </div>
      <div className="sm:col-span-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? common.saving : common.save}
        </Button>
        {state?.error ? (
          <p className="mt-2 text-sm text-status-critical">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
}
