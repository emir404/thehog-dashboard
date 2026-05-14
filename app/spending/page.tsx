import { DownloadSimple, Plus } from "@phosphor-icons/react/dist/ssr";

type DayBar = {
  day: string;
  enrichments: number;
  deepResearch: number;
  peopleSearch: number;
};

const days: DayBar[] = [
  { day: "Mon", enrichments: 1.2, deepResearch: 0.8, peopleSearch: 0.4 },
  { day: "Tue", enrichments: 2.1, deepResearch: 1.3, peopleSearch: 0.2 },
  { day: "Wed", enrichments: 1.6, deepResearch: 0.9, peopleSearch: 0.5 },
  { day: "Thu", enrichments: 2.8, deepResearch: 1.7, peopleSearch: 0.3 },
  { day: "Fri", enrichments: 2.4, deepResearch: 1.4, peopleSearch: 0.6 },
  { day: "Sat", enrichments: 1.0, deepResearch: 0.6, peopleSearch: 0.1 },
  { day: "Sun", enrichments: 1.8, deepResearch: 1.1, peopleSearch: 0.4 },
];

const MAX_DAY = 5;

type BreakdownRow = {
  name: string;
  calls: string;
  unitCost: string;
  subtotal: string;
  launching?: boolean;
};

const breakdown: BreakdownRow[] = [
  { name: "/enrichments", calls: "1,243", unitCost: "$0.012 / call", subtotal: "$14.92" },
  { name: "/deep-research", calls: "812", unitCost: "$0.008 / credit", subtotal: "$6.50" },
  { name: "/people-search", calls: "604", unitCost: "$0.004 / call", subtotal: "$2.42" },
  { name: "/monitor", calls: "—", unitCost: "—", subtotal: "—", launching: true },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`w-11 h-6 rounded-full relative transition-colors ${
        on ? "bg-primary" : "bg-surface-hover border border-border-default"
      }`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-surface shadow transition-transform ${
          on ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}

export default function SpendingPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10 flex flex-col gap-10">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-text">Spending</h1>
          <p className="text-body text-text-muted">
            See where your credits go and forecast the rest of the month.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9 px-3 rounded-md bg-surface border border-border-default text-body-strong text-text-muted hover:text-text inline-flex items-center gap-2 transition-colors"
          >
            May 2026
          </button>
          <button
            type="button"
            className="h-9 px-3 rounded-md bg-surface border border-border-default text-body-strong text-text-muted hover:text-text inline-flex items-center gap-2 transition-colors"
          >
            <DownloadSimple size={14} weight="regular" />
            Export CSV
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-3">
          <span className="text-caption-strong text-text-muted">
            This period · May 1 – 31
          </span>
          <span className="text-metric-lg text-text">$24.18</span>
          <span className="text-caption text-warning">
            Projected $52 by end of month — exceeds $50 limit
          </span>
        </div>

        <div className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-3">
          <span className="text-caption-strong text-text-muted">Budget</span>
          <div className="flex items-baseline gap-2">
            <span className="text-metric-lg text-text">$24.18</span>
            <span className="text-body text-text-subtle">/ $50.00</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "48%" }} />
          </div>
          <span className="text-caption text-text-muted">
            48% used · 20 days remaining
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="text-h2 text-text">Spend over time</h2>
          <div className="inline-flex items-center bg-surface border border-border-default rounded-full p-1">
            {["Daily", "Weekly"].map((m) => (
              <button
                key={m}
                type="button"
                className={`px-3 h-6 rounded-full text-caption-strong transition-colors ${
                  m === "Daily"
                    ? "bg-primary-subtle text-primary-subtle-text"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-surface border border-border-default rounded-lg p-5">
          <div className="flex items-end gap-3 h-56 px-2">
            {days.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="flex-1 flex flex-col-reverse gap-px w-full justify-start">
                  <div
                    className="bg-primary rounded-t-sm"
                    style={{ height: `${(d.enrichments / MAX_DAY) * 100}%` }}
                  />
                  <div
                    className="bg-primary"
                    style={{
                      height: `${(d.deepResearch / MAX_DAY) * 100}%`,
                      opacity: 0.65,
                    }}
                  />
                  <div
                    className="bg-primary"
                    style={{
                      height: `${(d.peopleSearch / MAX_DAY) * 100}%`,
                      opacity: 0.35,
                    }}
                  />
                </div>
                <span className="text-caption text-text-subtle">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-border-subtle">
            {[
              { label: "/enrichments", opacity: 1 },
              { label: "/deep-research", opacity: 0.65 },
              { label: "/people-search", opacity: 0.35 },
            ].map((legend) => (
              <div key={legend.label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm bg-primary"
                  style={{ opacity: legend.opacity }}
                />
                <span className="text-caption text-text-muted">
                  {legend.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-text">Breakdown by endpoint</h2>
        <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-4 px-5 py-3 bg-surface-subtle border-b border-border-subtle">
            <span className="text-eyebrow">Endpoint</span>
            <span className="text-eyebrow text-right">Calls</span>
            <span className="text-eyebrow text-right">Unit cost</span>
            <span className="text-eyebrow text-right">Subtotal</span>
          </div>
          {breakdown.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-4 items-center px-5 py-3 ${
                i < breakdown.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-code text-code-accent">{row.name}</span>
                {row.launching && (
                  <span className="text-caption-strong text-warning bg-warning-subtle rounded-full px-2 py-0.5">
                    Soon
                  </span>
                )}
              </div>
              <span className="text-metric-sm text-text text-right">{row.calls}</span>
              <span className="text-body text-text-muted text-right">{row.unitCost}</span>
              <span className="text-metric-sm text-text text-right">{row.subtotal}</span>
            </div>
          ))}
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1fr] gap-4 items-center px-5 py-3 border-t border-border-default">
            <span className="text-body-strong text-text">Total</span>
            <span />
            <span />
            <span className="text-metric text-text text-right">$24.18</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-text">Budget alerts</h2>
        <div className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-4">
          <p className="text-body text-text-muted">
            Get notified before you hit your limit.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Toggle on />
            <span className="text-body text-text">Notify me when I hit</span>
            <div className="inline-flex items-center bg-surface-subtle border border-border-default rounded-md h-9 overflow-hidden">
              <input
                type="text"
                defaultValue="80"
                className="w-12 h-full px-3 bg-transparent text-body-strong text-text text-right focus:outline-none"
              />
              <span className="pr-3 text-body text-text-muted">%</span>
            </div>
            <span className="text-body text-text">of my budget</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap pl-14">
            <span className="text-body text-text-muted">Send to</span>
            <span className="inline-flex items-center gap-2 h-7 px-2.5 rounded-full bg-surface-subtle border border-border-default text-caption-strong text-text">
              emir@witharc.co
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-caption-strong text-primary hover:text-primary-hover"
            >
              <Plus size={12} weight="bold" />
              Add another
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
