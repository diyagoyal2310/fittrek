"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const VIEWPORT = { once: true, amount: 0.5 } as const;

export function TdeeStackedBar({
  caption,
  labels,
}: {
  caption: string;
  labels: { bmr: string; active: string; tef: string };
}) {
  const segments = [
    { key: "bmr", label: labels.bmr, pct: 65, color: "var(--chart-1)" },
    { key: "active", label: labels.active, pct: 25, color: "var(--chart-2)" },
    { key: "tef", label: labels.tef, pct: 10, color: "var(--chart-3)" },
  ];

  return (
    <DiagramFrame caption={caption}>
      <div className="flex h-8 w-full overflow-hidden rounded-lg">
        {segments.map((segment, i) => (
          <motion.div
            key={segment.key}
            className="flex h-full items-center justify-center text-xs font-medium text-white"
            style={{ backgroundColor: segment.color }}
            initial={{ width: "0%" }}
            whileInView={{ width: `${segment.pct}%` }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
          >
            <span className="hidden sm:inline">{segment.pct}%</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
              aria-hidden="true"
            />
            {segment.label}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
