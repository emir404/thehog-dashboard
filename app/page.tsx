import {
  BookOpen,
  Copy,
  CreditCard,
  Eye,
  Gauge,
  Key,
  TrendDown,
  TrendUp,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  mirrored?: boolean;
};

const mcpConfig = `{
  "mcpServers": {
    "hog": {
      "command": "npx",
      "args": ["-y", "hog-mcp"],
      "env": { "HOG_API_KEY": "$HOG_API_KEY" }
    }
  }
}`;

const learnMore: { icon: ComponentType<IconProps>; title: string }[] = [
  { icon: BookOpen, title: "Quickstart" },
  { icon: Key, title: "Authentication" },
  { icon: Warning, title: "Error handling" },
  { icon: Gauge, title: "Rate limits" },
];

const sectionTitle = "text-base font-medium leading-none text-text";
const innerCard =
  "bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)]";

export default function Home() {
  return (
    <div className="pr-3 pt-3 pb-3 min-h-full">
      <div className="bg-surface border border-border-default rounded-[20px] p-8 shadow-[0_0_8px_rgba(0,0,0,0.05)] min-h-[calc(100vh-24px)] overflow-hidden flex flex-col items-center w-full">
        <div className="w-[840px] py-8 flex flex-col gap-12">
          <header className="flex flex-col gap-2.5">
            <h1 className="text-metric-lg text-text">Welcome back, Emir</h1>
            <p className="text-body text-text-muted">
              Signed in as reostraemir@gmail.com
            </p>
          </header>

          <section className="flex flex-col gap-5">
            <h2 className={sectionTitle}>Get Started</h2>
            <div className="grid grid-cols-3 gap-3 h-[148px]">
              <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-strong text-text">Generate credentials</h3>
                  <p className="text-caption text-text-muted">
                    Create an API key and secret. The secret is shown once when generated.
                  </p>
                </div>
                <a
                  href="/credentials"
                  className="self-start h-[34px] px-3 inline-flex items-center justify-center rounded-lg bg-primary/5 text-primary-subtle-text text-caption-strong hover:bg-primary/10 transition-colors"
                >
                  Create a key
                </a>
              </div>

              <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-strong text-text">Install the SDK</h3>
                  <p className="text-caption text-text-muted">
                    Bring The Hog into your project in seconds.
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 px-3 py-2 flex items-center justify-between">
                  <span className="text-code-sm text-primary-subtle-text">
                    npm install @thehog/sdk
                  </span>
                  <button
                    type="button"
                    aria-label="Copy install command"
                    className="text-primary-subtle-text/80 hover:text-primary-subtle-text transition-colors"
                  >
                    <Copy size={16} weight="regular" />
                  </button>
                </div>
              </div>

              <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-strong text-text">Make your first call</h3>
                  <p className="text-caption text-text-muted">
                    Try an endpoint in the playground with your live key prefilled.
                  </p>
                </div>
                <button
                  type="button"
                  className="self-start h-[34px] px-3 inline-flex items-center justify-center rounded-lg bg-primary text-text-on-primary text-caption-strong hover:bg-primary-hover transition-colors"
                >
                  Open playground
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={sectionTitle}>At a glance</h2>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3 h-[148px]">
                <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                  <span className="text-caption text-text-muted">Calls (7d)</span>
                  <div className="flex flex-col gap-4">
                    <span className="text-metric-lg text-text">12,483</span>
                    <div className="flex items-center gap-1.5">
                      <TrendUp size={14} weight="regular" className="text-success" />
                      <span className="text-caption-strong text-success">
                        +12.4% vs previous week
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                  <span className="text-caption text-text-muted">Credit balance</span>
                  <div className="flex flex-col gap-4">
                    <span className="text-metric-lg text-text">$120.42</span>
                    <div className="flex items-center gap-1.5">
                      <CreditCard size={14} weight="regular" className="text-text-muted" />
                      <span className="text-caption-strong text-text-muted">
                        Last topped up Apr 28
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                  <span className="text-caption text-text-muted">p95 Latency</span>
                  <div className="flex flex-col gap-4">
                    <span className="text-metric-lg text-text">142 ms</span>
                    <div className="flex items-center gap-1.5">
                      <TrendDown size={14} weight="regular" className="text-error" />
                      <span className="text-caption-strong text-error">
                        +18ms vs last week
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 h-[148px]">
                <div className={`${innerCard} p-5 flex flex-col justify-between`}>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-body-strong text-text">API Key</h3>
                    <p className="text-caption text-text-muted max-w-[230px]">
                      Use this key in the Authorization header as a bearer token.
                    </p>
                  </div>
                  <div className="rounded-lg bg-code-bg px-3 py-2 flex items-center justify-between">
                    <span className="text-code-sm text-code-text">
                      hog_sk_live_••••••••••••••••aebf
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Reveal key"
                        className="text-text-muted hover:text-text transition-colors"
                      >
                        <Eye size={16} weight="regular" />
                      </button>
                      <button
                        type="button"
                        aria-label="Copy key"
                        className="text-text-muted hover:text-text transition-colors"
                      >
                        <Copy size={16} weight="regular" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`${innerCard} p-5 flex flex-col gap-3 relative overflow-hidden`}>
                  <div className="flex items-start justify-between text-body-strong">
                    <h3 className="text-text">MCP Integration</h3>
                    <button
                      type="button"
                      className="text-text-subtle hover:text-text-muted transition-colors"
                    >
                      Extend
                    </button>
                  </div>
                  <div className="relative h-[180px] rounded-lg bg-code-bg overflow-hidden">
                    <pre className="px-3 py-2 text-code-sm text-code-text leading-[1.5] whitespace-pre">
                      {mcpConfig}
                    </pre>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={sectionTitle}>Learn more</h2>
            <div className="grid grid-cols-4 gap-3 h-[96px]">
              {learnMore.map(({ icon: Icon, title }) => (
                <a
                  key={title}
                  href="#"
                  className={`${innerCard} p-5 flex flex-col justify-between hover:border-border-strong transition-colors`}
                >
                  <Icon size={20} weight="regular" className="text-primary" />
                  <span className="text-body-strong text-text">{title}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
