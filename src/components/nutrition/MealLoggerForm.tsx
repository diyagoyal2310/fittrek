"use client";

import { useActionState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logMeal } from "@/actions/nutritionActions";
import type { Dictionary } from "@/lib/i18n/types";

export function MealLoggerForm({ dict }: { dict: Dictionary["nutrition"]["form"] }) {
  const [state, formAction, isPending] = useActionState(logMeal, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-3 sm:grid-cols-5">
      <div className="space-y-1.5 sm:col-span-1">
        <Label htmlFor="mealName">{dict.mealLabel}</Label>
        <Input id="mealName" name="mealName" placeholder={dict.mealPlaceholder} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="calories">{dict.calories}</Label>
        <Input id="calories" name="calories" type="number" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="proteinG">{dict.protein}</Label>
        <Input id="proteinG" name="proteinG" type="number" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="carbsG">{dict.carbs}</Label>
        <Input id="carbsG" name="carbsG" type="number" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fatG">{dict.fat}</Label>
        <Input id="fatG" name="fatG" type="number" required />
      </div>
      <div className="sm:col-span-5">
        <Button type="submit" disabled={isPending}>
          {isPending ? dict.saving : dict.logMeal}
        </Button>
        {state?.error ? (
          <p className="mt-2 text-sm text-status-critical">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
}
