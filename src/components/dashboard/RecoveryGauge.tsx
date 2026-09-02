"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { BatteryFull, BatteryMedium, BatteryWarning } from "lucide-react";
import { getReadinessBand } from "@/lib/algorithms/recoveryCalculator";
import type { Dictionary } from "@/lib/i18n/types";

const BAND_ICON = {
  low: BatteryWarning,
  moderate: BatteryMedium,
  high: BatteryFull,
} as const;

const BAND_COLOR = {
  low: "var(--status-critical)",
  moderate: "var(--status-warning)",
  high: "var(--status-good)",
} as const;

export function RecoveryGauge({
  recoveryScore,
  dict,
}: {
  recoveryScore: number;
  dict: Dictionary["dashboard"];
}) {
  const band = getReadinessBand(recoveryScore);
  const { label, hint } = dict.bands[band];
  const Icon = BAND_ICON[band];
  const color = BAND_COLOR[band];
  const gradientId = useId();

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(recoveryScore, 0), 100);
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <motion.div
      className="relative flex items-center gap-6 overflow-hidden rounded-xl border bg-card p-6"
      style={{
        backgroundImage: `radial-gradient(circle at 12% 15%, color-mix(in oklch, ${color}, transparent 88%), transparent 60%)`,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={`color-mix(in oklch, ${color}, black 25%)`} />
            </linearGradient>
          </defs>
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            style={{ filter: `drop-shadow(0 0 8px color-mix(in oklch, ${color}, transparent 55%))` }}
          />
        </svg>
        <motion.div
          className="absolute flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span className="text-3xl font-semibold tabular-nums">{clamped}%</span>
          <span className="text-xs text-muted-foreground">{dict.readiness}</span>
        </motion.div>
      </div>
      <div className="relative flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color }}>
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
    </motion.div>
  );
}
