"use client";

import { TrendDown, TrendUp } from "@phosphor-icons/react";
import { ContentShell } from "../components/ContentShell";
import { SectionTitle } from "../components/SectionTitle";
import { Card } from "../components/Card";
import { CallsLineChart } from "../components/charts/CallsLineChart";
import { SegmentedControl } from "../components/SegmentedControl";
import { StatusPill } from "../components/StatusPill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { endpointRows, recentRequests, statusBreakdown } from "../lib/data";

export default function UsagePage() {
  return (
    <ContentShell variant="wide">
      <header className="flex flex-col gap-2.5">
        <h1 className="text-metric-lg text-text">Usage</h1>
        <p className="text-body text-text-muted">
          Track calls, latency, and credits across every endpoint.
        </p>
      </header>

      {/* KPI cards + chart */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3" style={{ height: 148 }}>
          <Card className="p-5 flex flex-col justify-between">
            <span className="text-caption-strong text-text-muted">
              Calls (7d)
            </span>
            <div className="flex flex-col gap-4">
              <span className="text-metric-lg text-text">12,483</span>
              <div className="flex items-center gap-1.5">
                <TrendUp size={14} weight="regular" className="text-success" />
                <span className="text-caption text-success">
                  +12.4% vs previous week
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <span className="text-caption-strong text-text-muted">
              Success rate
            </span>
            <div className="flex flex-col gap-4">
              <span className="text-metric-lg text-text">99.4%</span>
              <div className="flex items-center gap-1.5">
                <TrendUp size={14} weight="regular" className="text-success" />
                <span className="text-caption text-success">
                  0.2pts vs last period
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <span className="text-caption-strong text-text-muted">
              Avg latency
            </span>
            <div className="flex flex-col gap-4">
              <span className="text-metric-lg text-text">142 ms</span>
              <div className="flex items-center gap-1.5">
                <TrendDown size={14} weight="regular" className="text-error" />
                <span className="text-caption text-error">
                  +18ms vs last week
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <span className="text-caption-strong text-text-muted">
              Credits used
            </span>
            <div className="flex flex-col gap-4">
              <span className="text-metric-lg text-text">4,820</span>
              <span className="text-caption text-text-muted">≈ $24.18</span>
            </div>
          </Card>
        </div>

        {/* Chart card */}
        <Card className="p-5 flex flex-col gap-6 relative" height={400}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-muted">
              Calls over time
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
            style={{ height: 296 }}
          >
            <CallsLineChart />
          </div>
        </Card>
      </section>

      {/* By endpoint */}
      <section className="flex flex-col gap-5">
        <SectionTitle>By endpoint</SectionTitle>
        <div className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Endpoint</TableHead>
                <TableHead>Calls</TableHead>
                <TableHead>Success</TableHead>
                <TableHead>Avg latency</TableHead>
                <TableHead>P95</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpointRows.map((row, i) => (
                <TableRow
                  key={row.endpoint}
                  className={
                    i === endpointRows.length - 1 ? "border-b-0" : undefined
                  }
                >
                  <TableCell className="text-code text-primary-pressed">
                    {row.endpoint}
                  </TableCell>
                  <TableCell>{row.calls}</TableCell>
                  <TableCell>{row.success}</TableCell>
                  <TableCell>{row.avgLatency}</TableCell>
                  <TableCell>{row.p95}</TableCell>
                  <TableCell>{row.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Recent requests */}
      <section className="flex flex-col gap-5">
        <SectionTitle
          trailing={<span className="text-base text-text-muted">Last 5</span>}
        >
          Recent requests
        </SectionTitle>
        <div className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Time</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Calls</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRequests.map((row, i) => (
                <TableRow
                  key={`${row.time}-${row.endpoint}-${i}`}
                  className={
                    i === recentRequests.length - 1 ? "border-b-0" : undefined
                  }
                >
                  <TableCell>{row.time}</TableCell>
                  <TableCell className="text-code text-primary-pressed">
                    {row.endpoint}
                  </TableCell>
                  <TableCell>{row.calls}</TableCell>
                  <TableCell>
                    <StatusPill tone="success">200 OK</StatusPill>
                  </TableCell>
                  <TableCell>{row.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Status codes */}
      <section className="flex flex-col gap-5">
        <SectionTitle
          trailing={<span className="text-base text-text-muted">Last 5</span>}
        >
          Status codes
        </SectionTitle>
        <Card className="p-5 flex flex-col gap-6">
          <div className="h-5 w-full rounded-lg overflow-hidden flex">
            {statusBreakdown.map((s) => (
              <div
                key={s.label}
                style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                className="h-full first:rounded-l-lg last:rounded-r-lg"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {statusBreakdown.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-body text-text">{s.label}</span>
                </div>
                <span className="text-code text-text">{s.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </ContentShell>
  );
}
