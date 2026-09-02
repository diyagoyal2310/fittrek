"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/types";

type RecoveryPoint = { date: string; recovery: number };
type VolumePoint = { date: string; volume: number };
type MacroPoint = { date: string; protein: number; carbs: number; fat: number };

const GRID_COLOR = "var(--border)";
const AXIS_COLOR = "var(--muted-foreground)";

function ChartCard({
  title,
  isEmpty,
  emptyLabel,
  delay,
  children,
}: {
  title: string;
  isEmpty: boolean;
  emptyLabel: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEmpty ? (
            <p className="text-sm text-muted-foreground">{emptyLabel}</p>
          ) : (
            <div className="h-64 w-full">{children}</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AnalyticsCharts({
  recoveryTrend,
  volumeTrend,
  macroTrend,
  dict,
}: {
  recoveryTrend: RecoveryPoint[];
  volumeTrend: VolumePoint[];
  macroTrend: MacroPoint[];
  dict: Dictionary["analytics"];
}) {
  return (
    <div className="grid gap-4">
      <ChartCard title={dict.recoveryTrend} isEmpty={recoveryTrend.length === 0} emptyLabel={dict.notEnoughData} delay={0}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={recoveryTrend}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="date" stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <YAxis domain={[0, 100]} stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="recovery"
              name={dict.series.recovery}
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={dict.volumeTrend} isEmpty={volumeTrend.length === 0} emptyLabel={dict.notEnoughData} delay={0.1}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={volumeTrend}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="date" stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volume"
              name={dict.series.volume}
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={dict.macroTrend} isEmpty={macroTrend.length === 0} emptyLabel={dict.notEnoughData} delay={0.2}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={macroTrend}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey="date" stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="protein" name={dict.series.protein} stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="carbs" name={dict.series.carbs} stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="fat" name={dict.series.fat} stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
