"use client";

import { motion } from "framer-motion";
import { DiagramFrame } from "@/components/knowledge/diagrams/DiagramFrame";

const FILL_PCT = 75;

export function HydrationDiagram({ caption }: { caption: string }) {
  return (
    <DiagramFrame caption={caption}>
      <div className="flex items-center justify-center gap-6">
        <svg width="72" height="96" viewBox="0 0 72 96" role="img" aria-label={caption}>
          <defs>
            <clipPath id="glass-clip">
              <path d="M10,6 L62,6 L54,90 L18,90 Z" />
            </clipPath>
          </defs>
          <path
            d="M10,6 L62,6 L54,90 L18,90 Z"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <motion.rect
            x="10"
            width="52"
            fill="var(--chart-1)"
            clipPath="url(#glass-clip)"
            initial={{ y: 96, height: 0 }}
            whileInView={{ y: 96 - (96 - 6) * (FILL_PCT / 100), height: (96 - 6) * (FILL_PCT / 100) }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="text-3xl font-semibold tabular-nums" style={{ color: "var(--chart-1)" }}>
          {FILL_PCT}%
        </div>
      </div>
    </DiagramFrame>
  );
}
