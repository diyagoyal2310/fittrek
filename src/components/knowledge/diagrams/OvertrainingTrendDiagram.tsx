"use client";

import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const WIDTH = 320;
const HEIGHT = 120;
const PADDING = 12;
const VIEWPORT = { once: true, amount: 0.5 } as const;

// Illustrative decline: normal ups and downs at first, then a persistent slide —
// the pattern that separates overtraining from ordinary daily fluctuation.
const POINTS = [0.7, 0.78, 0.68, 0.74, 0.6, 0.5, 0.55, 0.4, 0.3, 0.32, 0.18, 0.1];

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

export function OvertrainingTrendDiagram({ caption }: { caption: string }) {
  const path = toPath(POINTS);
  const lastX = WIDTH - PADDING;
  const lastY = HEIGHT - PADDING - POINTS[POINTS.length - 1] * (HEIGHT - PADDING * 2);

  return (
    <DiagramFrame caption={caption}>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--status-critical)" }}>
        <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
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
          stroke="var(--status-critical)"
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
          fill="var(--status-critical)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
    </DiagramFrame>
  );
}
