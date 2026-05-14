"use client";

import { ContentShell } from "../components/ContentShell";
import { Card } from "../components/Card";
import { ActivityChart } from "../components/charts/ActivityChart";
import { SegmentedControl } from "../components/SegmentedControl";
import { spendingSummary as summary } from "../lib/data";

export default function SpendingPage() {
  return (
    <ContentShell variant="wide">
      <header className="flex flex-col gap-2.5">
        <h1 className="text-metric-lg text-text">Spending</h1>
        <p className="text-body text-text-muted">
          See where your credits go and forecast the rest of the month.
        </p>
      </header>

      <section className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="grid grid-cols-3 gap-4" style={{ height: 148 }}>
          {summary.map((s) => (
            <Card
              key={s.label}
              className="p-5 flex flex-col justify-between"
              height={148}
            >
              <span className="text-sm font-medium text-text-muted">
                {s.label}
              </span>
              <span className="text-metric-lg text-text">{s.value}</span>
            </Card>
          ))}
        </div>

        <Card className="p-5 flex flex-col gap-6 relative" height={530}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-muted">
              Activity (success vs failed over time)
            </span>
            <SegmentedControl
              ariaLabel="Time range"
              defaultValue="7d"
              options={[
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
                { value: "90d", label: "90 days" },
              ]}
            />
          </div>
          <div
            className="rounded-xl bg-surface-subtle/50"
            style={{ height: 426 }}
          >
            <ActivityChart />
          </div>
        </Card>
      </section>
    </ContentShell>
  );
}
