import {
  CaretDown,
  Copy,
  DotsThree,
  Eye,
} from "@phosphor-icons/react/dist/ssr";

type Credential = {
  label: string;
  environment: "Production" | "Development" | "Staging";
  key: string;
  created: string;
  lastUsed: string;
};

const credentials: Credential[] = [
  {
    label: "Postman",
    environment: "Production",
    key: "hog_sk_live_••••aebf",
    created: "Apr 28, 2026",
    lastUsed: "2 minutes ago",
  },
  {
    label: "Local CI",
    environment: "Development",
    key: "hog_sk_dev_••••3a91",
    created: "May 4, 2026",
    lastUsed: "1 hour ago",
  },
];

function EnvironmentPill({ env }: { env: Credential["environment"] }) {
  const styles =
    env === "Production"
      ? "bg-success-subtle text-success"
      : env === "Development"
      ? "bg-warning-subtle text-warning"
      : "bg-info-subtle text-info";
  return (
    <span
      className={`text-caption-strong rounded-full px-2 py-0.5 ${styles}`}
    >
      {env}
    </span>
  );
}

export default function CredentialsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-10 py-10 flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-text">API credentials</h1>
        <p className="text-body text-text-muted">
          Each credential has a public{" "}
          <span className="text-body-strong text-text">API key</span> and a
          private <span className="text-body-strong text-text">API secret</span>
          . The secret is shown once when generated.
        </p>
      </header>

      <section className="bg-surface border border-border-default rounded-lg p-6 flex flex-col gap-4">
        <h2 className="text-h3 text-text">Create credentials</h2>
        <div className="flex items-end gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-caption-strong text-text-muted">Label</label>
            <input
              type="text"
              placeholder="Optional label (e.g. Postman, CI)"
              className="h-10 px-3 rounded-md bg-surface border border-border-default text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-border-strong"
            />
          </div>
          <div className="w-56 flex flex-col gap-1.5">
            <label className="text-caption-strong text-text-muted">
              Environment
            </label>
            <button
              type="button"
              className="h-10 px-3 rounded-md bg-surface border border-border-default text-body text-text inline-flex items-center justify-between hover:bg-surface-hover transition-colors"
            >
              Production
              <CaretDown size={14} weight="regular" />
            </button>
          </div>
          <button
            type="button"
            className="h-10 px-4 rounded-md bg-primary text-text-on-primary text-body-strong hover:bg-primary-hover transition-colors"
          >
            Generate
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h2 text-text">Your credentials</h2>
        <div className="bg-surface border border-border-default rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_1.6fr_1fr_1fr_60px] gap-4 px-5 py-3 bg-surface-subtle border-b border-border-subtle">
            <span className="text-eyebrow">Label</span>
            <span className="text-eyebrow">Environment</span>
            <span className="text-eyebrow">API key</span>
            <span className="text-eyebrow">Created</span>
            <span className="text-eyebrow">Last used</span>
            <span />
          </div>
          {credentials.map((cred, i) => (
            <div
              key={cred.key}
              className={`grid grid-cols-[1.2fr_1fr_1.6fr_1fr_1fr_60px] gap-4 items-center px-5 py-4 ${
                i < credentials.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <span className="text-body-strong text-text">{cred.label}</span>
              <div>
                <EnvironmentPill env={cred.environment} />
              </div>
              <span className="text-code text-text">{cred.key}</span>
              <span className="text-body text-text-muted">{cred.created}</span>
              <span className="text-body text-text-muted">{cred.lastUsed}</span>
              <div className="flex items-center gap-1 justify-end">
                <button
                  type="button"
                  aria-label="Reveal"
                  className="h-8 w-8 grid place-items-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text transition-colors"
                >
                  <Eye size={14} weight="regular" />
                </button>
                <button
                  type="button"
                  aria-label="Copy"
                  className="h-8 w-8 grid place-items-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text transition-colors"
                >
                  <Copy size={14} weight="regular" />
                </button>
                <button
                  type="button"
                  aria-label="More"
                  className="h-8 w-8 grid place-items-center rounded-md text-text-muted hover:bg-surface-hover hover:text-text transition-colors"
                >
                  <DotsThree size={16} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
