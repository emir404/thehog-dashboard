"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "./ChartContainer";
import { ChartTooltip } from "./ChartTooltip";
import { activityData as defaultData } from "@/app/lib/data";

type Datum = { date: string; success: number; failed: number };

const tickStyle = {
  fill: "var(--text-subtle)",
  fontSize: 13,
  fontWeight: 500,
};

function SuccessDot(props: { cx?: number; cy?: number }) {
  if (props.cx == null || props.cy == null) return null;
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={4}
      fill="var(--surface)"
      stroke="var(--success)"
      strokeWidth={2}
    />
  );
}

function FailedDot(props: { cx?: number; cy?: number }) {
  if (props.cx == null || props.cy == null) return null;
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={4}
      fill="var(--surface)"
      stroke="var(--error)"
      strokeWidth={2}
    />
  );
}

const series = {
  success: { label: "Success", dot: "var(--success)" },
  failed: { label: "Failed", dot: "var(--error)" },
};

export function ActivityChart({ data = defaultData }: { data?: Datum[] }) {
  return (
    <ChartContainer>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 16, right: 24, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="ok-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="err-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--error)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--error)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--primary)"
          strokeOpacity={0.15}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={tickStyle}
          padding={{ left: 16, right: 16 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={tickStyle}
          width={40}
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]}
        />
        <Tooltip
          cursor={{
            stroke: "var(--primary)",
            strokeOpacity: 0.4,
            strokeDasharray: "3 3",
          }}
          content={(props) => <ChartTooltip {...props} series={series} />}
        />
        <Area
          type="monotone"
          dataKey="success"
          stroke="var(--success)"
          strokeWidth={2}
          fill="url(#ok-grad)"
          dot={<SuccessDot />}
          activeDot={{
            r: 5,
            fill: "var(--surface)",
            stroke: "var(--success)",
            strokeWidth: 2,
          }}
        />
        <Area
          type="monotone"
          dataKey="failed"
          stroke="var(--error)"
          strokeWidth={2}
          fill="url(#err-grad)"
          dot={<FailedDot />}
          activeDot={{
            r: 5,
            fill: "var(--surface)",
            stroke: "var(--error)",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
    </ChartContainer>
  );
}
