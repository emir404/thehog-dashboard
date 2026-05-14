import {
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react/dist/ssr";

type EndpointRow = {
  name: string;
  calls: string;
  success: string;
  avgLatency: string;
  p95: string;
  credits: string;
  launching?: boolean;
};

const endpointRows: EndpointRow[] = [
  { name: "/enrichments", calls: "1,243", success: "99.8%", avgLatency: "128 ms", p95: "204 ms", credits: "3,729" },
  { name: "/deep-research", calls: "812", success: "99.4%", avgLatency: "38.2 s", p95: "61.4 s", credits: "812" },
  { name: "/people-search", calls: "604", success: "98.9%", avgLatency: "212 ms", p95: "418 ms", credits: "276" },
  { name: "/monitor", calls: "—", success: "—", avgLatency: "—", p95: "—", credits: "—", launching: true },
];

type LogRow = {
  time: string;
  endpoint: string;
  status: "200 OK" | "200 OK · agent" | "429 Rate limit" | "500 Server";
  latency: string;
  credits: string;
  expanded?: boolean;
  breakdown?: { name: string; count: number; credits: number }[];
};

const logRows: LogRow[] = [
  {
    time: "14:23:42",
    endpoint: "/enrichments",
    status: "200 OK",
    latency: "128 ms",
    credits: "8",
  },
  {
    time: "14:18:11",
    endpoint: "/deep-research",
    status: "200 OK · agent",
    latency: "42.1 s",
    credits: "32",
    expanded: true,
    breakdown: [
      { name: "enrichments", count: 1, credits: 10 },
      { name: "llm.completions", count: 3, credits: 20 },
      { name: "web.fetch", count: 2, credits: 2 },
    ],
  },
  {
    time: "14:02:55",
    endpoint: "/people-search",
    status: "200 OK",
    latency: "312 ms",
    credits: "4",
  },
  {
    time: "13:54:09",
    endpoint: "/enrichments",
    status: "429 Rate limit",
    latency: "12 ms",
    credits: "0",
  },
  {
    time: "13:41:22",
    endpoint: "/deep-research",
    status: "200 OK · agent",
    latency: "28.6 s",
    credits: "21",
  },
];

function StatusPill({ status }: { status: LogRow["status"] }) {
  const styles = status.startsWith("200")
    ? "bg-success-subtle text-success"
    : status.startsWith("4")
    ? "bg-warning-subtle text-warning"
    : "bg-error-subtle text-error";
  return (
    <span
      className={`text-caption-strong rounded-full px-2 py-0.5 inline-block ${styles}`}
    >
      {status}
    </span>
  );
}

function MetricCard({
  label,
  value,
  delta,
  deltaTone,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "success" | "warning" | "subtle";
}) {
  const deltaClass =
    deltaTone === "success"
      ? "text-success"
      : deltaTone === "warning"
      ? "text-warning"
      : "text-text-subtle";
  return (
    <div className="bg-surface border border-border-default rounded-lg p-5 flex flex-col gap-3">
      <span className="text-caption-strong text-text-muted">{label}</span>
      <span className="text-metric-lg text-text">{value}</span>
      <span className={`text-caption ${deltaClass}`}>{delta}</span>
    </div>
  );
}

export default function UsagePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10 flex flex-col gap-10">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-text">Usage</h1>
          <p className="text-body text-text-muted">
            Track calls, latency, and credits across every endpoint.
          </p>
        </div>
        <div className="inline-flex items-center bg-surface border border-border-default rounded-full p-1">
          {["24h", "7d", "30d", "Custom"].map((range) => (
            <button
              key={range}
              type="button"
              className={`px-3 h-7 rounded-full text-caption-strong transition-colors ${
                range === "30d"
                  ? "bg-primary-subtle text-primary-subtle-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-4 gap-4">
        <MetricCard label="Total calls" value="12,483" delta="+12.4% vs last period" deltaTone="success" />
        <MetricCard label="Success rate" value="99.4%" delta="+0.2 pts vs last period" deltaTone="success" />
        <MetricCard label="Avg latency" value="142 ms" delta="+18 ms vs last period" deltaTone="warning" />
        <MetricCard label="Credits used" value="4,820" delta="≈ $24.18" deltaTone="subtle" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="text-h2 text-text">Calls over time</h2>
          <div className="flex items-center gap-2">
            {[
              { label: "/enrichments", on: true },
              { label: "/deep-research", on: true },
              { label: "/people-search", on: true },
              { label: "/monitor", on: false },
            ].map((chip) => (
              <span
                key={chip.label}
                className={`text-caption-strong rounded-full px-2 py-0.5 border ${
                  chip.on
                    ? "bg-primary-subtle text-primary-subtle-text border-primary-subtle"
                    : "bg-surface text-text-subtle border-border-default"
                }`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-surface border border-border-default rounded-lg p-5">
          <svg
            viewBox="0 0 700 240"
            className="w-full h-60"
            preserveAspectRatio="none"
          >
            {[40, 80, 120, 160, 200].map((y) => (
              <line
                key={y}
                x1="40"
                x2="690"
                y1={y}
                y2={y}
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />
            ))}
            {[
              { y: 40, label: "2,000" },
              { y: 80, label: "1,500" },
              { y: 120, label: "1,000" },
              { y: 160, label: "500" },
              { y: 200, label: "0" },
            ].map((tick) => (
              <text
                key={tick.y}
                x="32"
                y={tick.y + 4}
                textAnchor="end"
                className="fill-[var(--text-subtle)]"
                style={{ fontSize: "10px", fontVariantNumeric: "tabular-nums" }}
              >
                {tick.label}
              </text>
            ))}
            <path
              d="M50 200 L50 136 L150 104 L250 124 L350 72 L450 88 L550 52 L650 48 L650 200 Z"
              fill="var(--primary)"
              fillOpacity="0.08"
            />
            <path
              d="M50 136 L150 104 L250 124 L350 72 L450 88 L550 52 L650 48"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <text
                key={day}
                x={50 + i * 100}
                y={224}
                textAnchor="middle"
                className="fill-[var(--text-subtle)]"
                style={{ fontSize: "11px" }}
              >
                {day}
              </text>
            ))}
          </svg>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-text">By endpoint</h2>
        <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1.4fr_repeat(5,1fr)] gap-4 px-5 py-3 bg-surface-subtle border-b border-border-subtle">
            <span className="text-eyebrow">Endpoint</span>
            <span className="text-eyebrow text-right">Calls</span>
            <span className="text-eyebrow text-right">Success %</span>
            <span className="text-eyebrow text-right">Avg latency</span>
            <span className="text-eyebrow text-right">p95</span>
            <span className="text-eyebrow text-right">Credits</span>
          </div>
          {endpointRows.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1.4fr_repeat(5,1fr)] gap-4 items-center px-5 py-3 ${
                i < endpointRows.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-code text-code-accent truncate">{row.name}</span>
                {row.launching && (
                  <span className="text-caption-strong text-warning bg-warning-subtle rounded-full px-2 py-0.5 shrink-0">
                    Soon
                  </span>
                )}
              </div>
              <span className="text-metric-sm text-text text-right">{row.calls}</span>
              <span className="text-metric-sm text-text text-right">{row.success}</span>
              <span className="text-metric-sm text-text text-right">{row.avgLatency}</span>
              <span className="text-metric-sm text-text text-right">{row.p95}</span>
              <span className="text-metric-sm text-text text-right">{row.credits}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
            <h2 className="text-h2 text-text">Recent requests</h2>
            <span className="text-caption text-text-subtle">Last 5</span>
          </div>
          <div className="grid grid-cols-[120px_1.6fr_1.2fr_1fr_0.7fr_36px] gap-4 px-5 py-2 bg-surface-subtle border-b border-border-subtle">
            <span className="text-eyebrow">Time</span>
            <span className="text-eyebrow">Endpoint</span>
            <span className="text-eyebrow">Status</span>
            <span className="text-eyebrow text-right">Latency</span>
            <span className="text-eyebrow text-right">Credits</span>
            <span />
          </div>
          {logRows.map((row, i) => (
            <div
              key={`${row.time}-${row.endpoint}`}
              className={
                i < logRows.length - 1 ? "border-b border-border-subtle" : ""
              }
            >
              <div className="grid grid-cols-[120px_1.6fr_1.2fr_1fr_0.7fr_36px] gap-4 items-center px-5 py-3">
                <span className="text-code-sm text-text-muted">{row.time}</span>
                <span className="text-code text-text">{row.endpoint}</span>
                <div>
                  <StatusPill status={row.status} />
                </div>
                <span className="text-metric-sm text-text text-right">{row.latency}</span>
                <span className="text-metric-sm text-text text-right">{row.credits}</span>
                <button
                  type="button"
                  aria-label={row.expanded ? "Collapse" : "Expand"}
                  className="h-7 w-7 grid place-items-center rounded-md text-text-subtle hover:bg-surface-hover hover:text-text transition-colors justify-self-end"
                >
                  {row.expanded ? (
                    <CaretUp size={14} weight="bold" />
                  ) : (
                    <CaretDown size={14} weight="bold" />
                  )}
                </button>
              </div>
              {row.expanded && row.breakdown && (
                <div className="px-5 pb-4 -mt-1">
                  <div className="bg-surface-subtle rounded-md border border-border-subtle p-3">
                    <span className="text-caption-strong text-text-muted">
                      Tools used by this request
                    </span>
                    <div className="mt-2 flex flex-col gap-1">
                      {row.breakdown.map((tool, idx) => {
                        const isLast = idx === row.breakdown!.length - 1;
                        return (
                          <div
                            key={tool.name}
                            className="grid grid-cols-[16px_1fr_60px_80px] items-center text-code-sm"
                          >
                            <span className="text-text-subtle">
                              {isLast ? "└" : "├"}
                            </span>
                            <span className="text-code text-text">{tool.name}</span>
                            <span className="text-text-subtle text-right">
                              × {tool.count}
                            </span>
                            <span className="text-metric-sm text-text text-right">
                              {tool.credits} credits
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border-default rounded-lg p-5 flex flex-col gap-4 self-start">
          <h3 className="text-h3 text-text">Status codes</h3>
          <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden flex">
            <div className="bg-success" style={{ width: "95.2%" }} />
            <div className="bg-warning" style={{ width: "3.6%" }} />
            <div className="bg-error" style={{ width: "1.2%" }} />
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "2xx success", value: "95.2%", color: "bg-success" },
              { label: "4xx client error", value: "3.6%", color: "bg-warning" },
              { label: "5xx server error", value: "1.2%", color: "bg-error" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${s.color}`} />
                <span className="text-body text-text-muted flex-1">{s.label}</span>
                <span className="text-metric-sm text-text">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
