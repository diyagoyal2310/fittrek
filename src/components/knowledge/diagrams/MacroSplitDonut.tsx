"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";
import type { Dictionary } from "@/lib/i18n/types";

const VIEWPORT = { once: true, amount: 0.4 } as const;

// Illustrative example split for a Recomposition training day.
const SEGMENTS = [
  { key: "protein", pct: 30, color: "var(--chart-1)" },
  { key: "carbs", pct: 45, color: "var(--chart-2)" },
  { key: "fat", pct: 25, color: "var(--chart-3)" },
] as const;

export function MacroSplitDonut({
  caption,
  macros,
}: {
  caption: string;
  macros: Dictionary["nutrition"]["macros"];
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  let cumulativePct = 0;

  return (
    <DiagramFrame caption={caption}>
      <div className="flex items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90 shrink-0">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border)" strokeWidth="14" />
          {SEGMENTS.map((segment, i) => {
            const segmentLength = (segment.pct / 100) * circumference;
            const offset = (cumulativePct / 100) * circumference;
            cumulativePct += segment.pct;
            return (
              <motion.circle
                key={segment.key}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="14"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              />
            );
          })}
        </svg>
        <div className="space-y-1.5">
          {SEGMENTS.map((segment) => (
            <div key={segment.key} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{macros[segment.key as "protein" | "carbs" | "fat"]}</span>
              <span className="font-medium tabular-nums">{segment.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}
