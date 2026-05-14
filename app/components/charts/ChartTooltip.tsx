"use client";

import type { TooltipContentProps } from "recharts";

type Series = { label: string; dot: string };

export function ChartTooltip({
  active,
  payload,
  label,
  series,
}: TooltipContentProps & { series?: Record<string, Series> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border-default rounded-lg px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="text-caption text-text-muted mb-1">{label}</div>
      <div className="flex flex-col gap-1">
        {payload.map((p) => {
          const key = (p.dataKey ?? p.name) as string;
          const cfg = series?.[key];
          return (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cfg?.dot ?? (p.color as string) }}
              />
              <span className="text-caption text-text-muted">
                {cfg?.label ?? key}
              </span>
              <span className="text-caption-strong text-text ml-auto tabular-nums">
                {p.value?.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
