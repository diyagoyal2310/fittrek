"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const WIDTH = 320;
const HEIGHT = 120;
const PADDING = 12;
const VIEWPORT = { once: true, amount: 0.5 } as const;

// Illustrative stepped-increase curve: weight goes up in small jumps, not a
// straight line — this is what progressive overload looks like week to week.
const POINTS = [0, 0.08, 0.08, 0.22, 0.3, 0.3, 0.46, 0.55, 0.55, 0.7, 0.82, 1];

function toPath(points: number[]) {
  const stepX = (WIDTH - PADDING * 2) / (points.length - 1);
  return points
    .map((value, i) => {
      const x = PADDING + i * stepX;
      const y = HEIGHT - PADDING - value * (HEIGHT - PADDING * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function ProgressiveOverloadDiagram({
  caption,
  weeksLabel,
}: {
  caption: string;
  weeksLabel: string;
}) {
  const path = toPath(POINTS);
  const lastX = WIDTH - PADDING;
  const lastY = HEIGHT - PADDING - POINTS[POINTS.length - 1] * (HEIGHT - PADDING * 2);

  return (
    <DiagramFrame caption={caption}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label={caption}>
        <line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke="var(--border)"
          strokeWidth={1}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.circle
          cx={lastX}
          cy={lastY}
          r={4}
          fill="var(--chart-1)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{weeksLabel} 1</span>
        <span>
          {weeksLabel} {POINTS.length}
        </span>
      </div>
    </DiagramFrame>
  );
}
