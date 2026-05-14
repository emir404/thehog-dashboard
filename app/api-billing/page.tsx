import {
  CreditCard,
  DownloadSimple,
  PencilSimple,
} from "@phosphor-icons/react/dist/ssr";

type Invoice = {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Processing";
};

const invoices: Invoice[] = [
  { date: "May 1, 2026", description: "Pro · April 2026", amount: "$49.00", status: "Paid" },
  { date: "Apr 14, 2026", description: "Top-up credits", amount: "$100.00", status: "Paid" },
  { date: "Apr 1, 2026", description: "Pro · March 2026", amount: "$49.00", status: "Paid" },
  { date: "Mar 28, 2026", description: "Overage · Mar 17 – 28", amount: "$8.42", status: "Processing" },
];

function StatusPill({ status }: { status: Invoice["status"] }) {
  const styles =
    status === "Paid"
      ? "bg-success-subtle text-success"
      : "bg-warning-subtle text-warning";
  return (
    <span
      className={`text-caption-strong rounded-full px-2 py-0.5 inline-block ${styles}`}
    >
      {status}
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-eyebrow">{label}</span>
      <span className="text-body text-text whitespace-pre-line">{value}</span>
    </div>
  );
}

export default function ApiBillingPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10 flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-text">API Billing</h1>
        <p className="text-body text-text-muted">
          Manage your plan, payment method, and invoices.
        </p>
      </header>

      <section className="bg-primary-subtle border border-primary-subtle rounded-lg p-6 grid grid-cols-[1fr_1.4fr_auto] gap-8 items-center">
        <div className="flex flex-col gap-2">
          <span className="text-eyebrow text-primary-subtle-text">
            Current plan
          </span>
          <span className="text-h1 text-primary-subtle-text">Pro</span>
          <span className="text-caption text-primary-subtle-text/80">
            Renews May 28, 2026
          </span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Included credits", value: "100,000 / mo" },
            { label: "Overage rate", value: "$0.0008 / credit" },
            { label: "Monthly cost", value: "$49" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-eyebrow text-primary-subtle-text">
                {stat.label}
              </span>
              <span className="text-metric text-primary-subtle-text">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            className="h-9 px-4 rounded-md bg-primary text-text-on-primary text-body-strong hover:bg-primary-hover transition-colors"
          >
            Upgrade
          </button>
          <button
            type="button"
            className="text-caption text-primary-subtle-text/80 hover:text-primary-subtle-text"
          >
            Downgrade
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h3 text-text">Payment method</h3>
            <button
              type="button"
              className="text-caption-strong text-primary hover:text-primary-hover"
            >
              Update
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-14 rounded-md bg-text grid place-items-center">
              <CreditCard size={20} weight="regular" className="text-surface" />
            </div>
            <div className="flex flex-col">
              <span className="text-code text-text">Visa •••• 4242</span>
              <span className="text-caption text-text-subtle">
                Expires 04 / 28
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-4">
          <h3 className="text-h3 text-text">Top up credits</h3>
          <p className="text-body text-text-muted">
            Add credits to your account. One-time, never expires.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 inline-flex items-center bg-surface-subtle border border-border-default rounded-md h-10 overflow-hidden">
              <span className="pl-3 text-body text-text-muted">$</span>
              <input
                type="text"
                defaultValue="100"
                className="flex-1 h-full px-2 bg-transparent text-body-strong text-text focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="h-10 px-4 rounded-md bg-primary text-text-on-primary text-body-strong hover:bg-primary-hover transition-colors"
            >
              Add credits
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-h3 text-text">Billing details</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-caption-strong text-primary hover:text-primary-hover"
          >
            <PencilSimple size={12} weight="regular" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-5">
          <Field label="Company name" value="Arc Labs Inc." />
          <Field label="Billing email" value="billing@witharc.co" />
          <Field
            label="Address"
            value={"548 Market St #67890\nSan Francisco, CA 94104\nUnited States"}
          />
          <Field label="Tax ID" value="US-EIN 87-1234567" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-text">Invoices</h2>
        <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_60px] gap-4 px-5 py-3 bg-surface-subtle border-b border-border-subtle">
            <span className="text-eyebrow">Date</span>
            <span className="text-eyebrow">Description</span>
            <span className="text-eyebrow text-right">Amount</span>
            <span className="text-eyebrow">Status</span>
            <span />
          </div>
          {invoices.map((inv, i) => (
            <div
              key={`${inv.date}-${inv.description}`}
              className={`grid grid-cols-[1.2fr_2fr_1fr_1fr_60px] gap-4 items-center px-5 py-3 ${
                i < invoices.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <span className="text-body text-text-muted">{inv.date}</span>
              <span className="text-body text-text">{inv.description}</span>
              <span className="text-metric-sm text-text text-right">
                {inv.amount}
              </span>
              <div>
                <StatusPill status={inv.status} />
              </div>
              <button
                type="button"
                aria-label="Download invoice"
                className="h-8 w-8 grid place-items-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text transition-colors justify-self-end"
              >
                <DownloadSimple size={14} weight="regular" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
