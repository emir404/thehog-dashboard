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
import { callsLineData as defaultData } from "@/app/lib/data";

type Datum = { date: string; calls: number };

const tickStyle = {
  fill: "var(--text-subtle)",
  fontSize: 13,
  fontWeight: 500,
};

function Dot(props: { cx?: number; cy?: number }) {
  if (props.cx == null || props.cy == null) return null;
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={4}
      fill="var(--surface)"
      stroke="var(--primary)"
      strokeWidth={2}
    />
  );
}

const series = { calls: { label: "Calls", dot: "var(--primary)" } };

export function CallsLineChart({ data = defaultData }: { data?: Datum[] }) {
  return (
    <ChartContainer>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 16, right: 24, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="calls-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
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
          dataKey="calls"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#calls-grad)"
          dot={<Dot />}
          activeDot={{
            r: 5,
            fill: "var(--surface)",
            stroke: "var(--primary)",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
    </ChartContainer>
  );
}
