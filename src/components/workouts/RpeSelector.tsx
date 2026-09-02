"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RPE_VALUES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export function RpeSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (rpe: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {RPE_VALUES.map((rpe) => (
        <motion.button
          key={rpe}
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(rpe)}
          className={cn(
            "flex h-8 w-10 items-center justify-center rounded-md border text-xs font-medium tabular-nums transition-colors",
            value === rpe
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-background hover:bg-accent",
          )}
        >
          {rpe}
        </motion.button>
      ))}
    </div>
  );
}
