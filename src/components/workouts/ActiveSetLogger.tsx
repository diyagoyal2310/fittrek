"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RpeSelector } from "@/components/workouts/RpeSelector";
import { logWorkoutSet } from "@/actions/workoutActions";
import type { Dictionary } from "@/lib/i18n/types";

export function ActiveSetLogger({
  sessionId,
  dict,
}: {
  sessionId: string;
  dict: Dictionary["workouts"]["logger"];
}) {
  const [exerciseName, setExerciseName] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState(8);
  const [isPending, startTransition] = useTransition();

  const canSubmit = exerciseName.trim() !== "" && weightKg !== "" && reps !== "";

  function handleSubmit() {
    if (!canSubmit) return;
    startTransition(async () => {
      await logWorkoutSet({
        sessionId,
        exerciseName: exerciseName.trim(),
        weightKg: Number(weightKg),
        reps: Number(reps),
        rpe,
      });
      setWeightKg("");
      setReps("");
    });
  }

  return (
    <motion.div
      className="space-y-4 rounded-xl border bg-card p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5 sm:col-span-1">
          <Label htmlFor="exerciseName">{dict.exercise}</Label>
          <Input
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder={dict.exercisePlaceholder}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weightKg">{dict.weight}</Label>
          <Input
            id="weightKg"
            type="number"
            inputMode="decimal"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reps">{dict.reps}</Label>
          <Input
            id="reps"
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>{dict.rpe}</Label>
        <RpeSelector value={rpe} onChange={setRpe} />
      </div>
      <Button onClick={handleSubmit} disabled={!canSubmit || isPending}>
        {isPending ? dict.logging : dict.logSet}
      </Button>
    </motion.div>
  );
}
