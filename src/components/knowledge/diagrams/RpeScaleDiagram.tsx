"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const SCALE = [6, 7, 8, 9, 10];
const EXAMPLE_RPE = 8;
const EXAMPLE_PCT = ((EXAMPLE_RPE - 6) / (10 - 6)) * 100;

export function RpeScaleDiagram({ caption, rpeLabel }: { caption: string; rpeLabel: string }) {
  return (
    <DiagramFrame caption={caption}>
      <div className="relative mt-6 mb-2">
        <motion.div
          className="absolute -top-6 flex -translate-x-1/2 flex-col items-center"
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{ left: `${EXAMPLE_PCT}%`, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <span className="text-xs font-semibold tabular-nums">
            {rpeLabel} {EXAMPLE_RPE}
          </span>
          <span className="h-2 w-0.5 bg-foreground/50" />
        </motion.div>
        <div
          className="h-3 w-full rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, color-mix(in oklch, var(--chart-1), white 55%), var(--chart-1) 55%, color-mix(in oklch, var(--chart-1), black 25%))",
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {SCALE.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>
    </DiagramFrame>
  );
}
