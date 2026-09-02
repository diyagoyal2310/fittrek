"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const VIEWPORT = { once: true, amount: 0.5 } as const;
const MEALS = [0.28, 0.24, 0.26, 0.22];

export function ProteinDistributionDiagram({
  caption,
  mealLabel,
}: {
  caption: string;
  mealLabel: string;
}) {
  return (
    <DiagramFrame caption={caption}>
      <div className="flex h-28 justify-around gap-3">
        {MEALS.map((value, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <motion.div
              className="w-full rounded-t-md"
              style={{ backgroundColor: "var(--chart-1)" }}
              initial={{ height: "0%" }}
              whileInView={{ height: `${value * 100 * 3}%` }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            />
            <span className="text-xs text-muted-foreground">
              {mealLabel} {i + 1}
            </span>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
