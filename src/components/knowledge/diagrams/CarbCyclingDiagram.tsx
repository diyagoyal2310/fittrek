"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const VIEWPORT = { once: true, amount: 0.5 } as const;

export function CarbCyclingDiagram({
  caption,
  trainingDayLabel,
  restDayLabel,
}: {
  caption: string;
  trainingDayLabel: string;
  restDayLabel: string;
}) {
  const bars = [
    { label: trainingDayLabel, grams: 300, pct: 100 },
    { label: restDayLabel, grams: 150, pct: 50 },
  ];

  return (
    <DiagramFrame caption={caption}>
      <div className="flex h-28 items-end justify-center gap-10">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex h-full flex-col items-center justify-end gap-1.5">
            <span className="text-xs font-medium tabular-nums">{bar.grams}g</span>
            <motion.div
              className="w-14 rounded-t-md"
              style={{ backgroundColor: "var(--chart-2)" }}
              initial={{ height: "0%" }}
              whileInView={{ height: `${bar.pct}%` }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            />
            <span className="text-xs text-muted-foreground">{bar.label}</span>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
