"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";
import type { Dictionary } from "@/lib/i18n/types";

const EXAMPLE_SCORE = 72;

export function RecoveryBandDiagram({
  caption,
  bands,
}: {
  caption: string;
  bands: Dictionary["dashboard"]["bands"];
}) {
  return (
    <DiagramFrame caption={caption}>
      <div className="relative mt-6 mb-2">
        <motion.div
          className="absolute -top-6 flex -translate-x-1/2 flex-col items-center"
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{ left: `${EXAMPLE_SCORE}%`, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <span className="text-xs font-semibold tabular-nums">{EXAMPLE_SCORE}%</span>
          <span className="h-2 w-0.5 bg-foreground/50" />
        </motion.div>
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          <div className="h-full" style={{ width: "50%", backgroundColor: "var(--status-critical)" }} />
          <div className="h-full" style={{ width: "30%", backgroundColor: "var(--status-warning)" }} />
          <div className="h-full" style={{ width: "20%", backgroundColor: "var(--status-good)" }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center text-xs text-muted-foreground">
        <span>{bands.low.label}</span>
        <span>{bands.moderate.label}</span>
        <span>{bands.high.label}</span>
      </div>
    </DiagramFrame>
  );
}
