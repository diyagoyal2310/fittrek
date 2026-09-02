"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const VIEWPORT = { once: true, amount: 0.4 } as const;

export function TrainingSplitCalendar({
  caption,
  labels,
}: {
  caption: string;
  labels: { push: string; pull: string; legs: string; rest: string };
}) {
  const categories = [
    { key: "push", label: labels.push, color: "var(--chart-1)" },
    { key: "pull", label: labels.pull, color: "var(--chart-2)" },
    { key: "legs", label: labels.legs, color: "var(--chart-3)" },
    { key: "rest", label: labels.rest, color: "var(--muted-foreground)" },
  ] as const;

  const week = ["push", "pull", "legs", "push", "pull", "legs", "rest"] as const;
  const byKey = Object.fromEntries(categories.map((c) => [c.key, c]));

  return (
    <DiagramFrame caption={caption}>
      <div className="grid grid-cols-7 gap-1.5">
        {week.map((key, i) => (
          <motion.div
            key={i}
            className="flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md text-[10px] font-medium text-white"
            style={{ backgroundColor: byKey[key].color, opacity: key === "rest" ? 0.5 : 1 }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: key === "rest" ? 0.5 : 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {categories.map((c) => (
          <div key={c.key} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
            {c.label}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
