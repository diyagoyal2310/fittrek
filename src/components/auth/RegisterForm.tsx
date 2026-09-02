"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser } from "@/actions/authActions";
import type { Dictionary } from "@/lib/i18n/types";

export function RegisterForm({ dict }: { dict: Dictionary["auth"]["register"] }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state?.success) router.push("/login");
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="name">{dict.name}</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">{dict.email}</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">{dict.password}</Label>
        <Input id="password" name="password" type="password" minLength={8} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="weightKg">{dict.weight}</Label>
          <Input id="weightKg" name="weightKg" type="number" step="0.1" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="heightCm">{dict.height}</Label>
          <Input id="heightCm" name="heightCm" type="number" step="0.1" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="age">{dict.age}</Label>
          <Input id="age" name="age" type="number" defaultValue={30} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sex">{dict.sex}</Label>
          <Select name="sex" defaultValue="MALE">
            <SelectTrigger id="sex" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">{dict.male}</SelectItem>
              <SelectItem value="FEMALE">{dict.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="goal">{dict.goal}</Label>
        <Select name="goal" defaultValue="RECOMP">
          <SelectTrigger id="goal" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CUT">{dict.goals.cut}</SelectItem>
            <SelectItem value="BULK">{dict.goals.bulk}</SelectItem>
            <SelectItem value="RECOMP">{dict.goals.recomp}</SelectItem>
            <SelectItem value="HYPERTROPHY">{dict.goals.hypertrophy}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {state?.error ? <p className="text-sm text-status-critical">{state.error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? dict.creating : dict.createAccount}
      </Button>
    </form>
  );
}
