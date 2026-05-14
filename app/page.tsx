import {
  BookOpen,
  CreditCard,
  Gauge,
  Key,
  TrendDown,
  TrendUp,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { ContentShell } from "./components/ContentShell";
import { SectionTitle } from "./components/SectionTitle";
import { Card } from "./components/Card";
import { CodeBlock } from "./components/CodeBlock";
import { RevealableSecret } from "./components/RevealableSecret";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { apiKey, homeMetrics, user } from "./lib/data";

const learnMore: {
  icon: React.ComponentType<{ size?: number; weight?: "regular"; className?: string }>;
  title: string;
  href: string;
}[] = [
  { icon: BookOpen, title: "Quickstart", href: "#" },
  { icon: Key, title: "Authentication", href: "#" },
  { icon: Warning, title: "Error handling", href: "#" },
  { icon: Gauge, title: "Rate limits", href: "#" },
];

function McpCodeBlock() {
  return (
    <div className="rounded-lg bg-code-bg px-3 py-2 h-[180px] overflow-hidden">
      <pre className="text-code-sm leading-[1.5] text-code-text whitespace-pre">
        <span>{`{`}</span>
        {"\n"}
        <span>{`  "mcpServers": {`}</span>
        {"\n"}
        <span>{`    "hog": {`}</span>
        {"\n"}
        <span>{`      "command": "`}</span>
        <span className="text-primary-hover">{`npx`}</span>
        <span>{`",`}</span>
        {"\n"}
        <span>{`      "args": ["`}</span>
        <span className="text-primary-hover">{`-y`}</span>
        <span>{`", "`}</span>
        <span className="text-primary-hover">{`hog-mcp`}</span>
        <span>{`"],`}</span>
        {"\n"}
        <span>{`      "env": { "HOG_API_KEY": "$HOG_API_KEY" }`}</span>
        {"\n"}
        <span>{`    }`}</span>
        {"\n"}
        <span>{`  }`}</span>
        {"\n"}
        <span>{`}`}</span>
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <ContentShell variant="narrow">
      {/* Header */}
      <header className="flex flex-col gap-2.5">
        <h1 className="text-metric-lg text-text">Welcome back, {user.name}</h1>
        <p className="text-body text-text-muted">Signed in as {user.email}</p>
      </header>

      {/* Get Started */}
      <section className="flex flex-col gap-5">
        <SectionTitle>Get Started</SectionTitle>
        <div className="grid grid-cols-3 gap-3" style={{ height: 148 }}>
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium leading-none text-text">
                Generate credentials
              </h3>
              <p className="text-caption text-text-muted leading-[1.51]">
                Create an API key and secret. The secret is shown once when
                generated.
              </p>
            </div>
            <Button variant="subtle" size="default" asChild className="self-start h-[34px]">
              <Link href="/credentials">Create a key</Link>
            </Button>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium leading-none text-text">
                Install the SDK
              </h3>
              <p className="text-caption text-text-muted leading-[1.51]">
                Bring The Hog into your project in seconds.
              </p>
            </div>
            <CodeBlock code="npm install @thehog/sdk" tone="primary" />
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium leading-none text-text">
                Make your first call
              </h3>
              <p className="text-caption text-text-muted leading-[1.51]">
                Try an endpoint in the playground with your live key prefilled.
              </p>
            </div>
            <Button variant="default" size="default" className="self-start h-[34px]">
              Open playground
            </Button>
          </Card>
        </div>
      </section>

      {/* At a glance */}
      <section className="flex flex-col gap-5">
        <SectionTitle>At a glance</SectionTitle>
        <div className="flex flex-col gap-3">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-3" style={{ height: 148 }}>
            <Card className="p-5 flex flex-col justify-between">
              <span className="text-caption-strong text-text-muted">
                Calls (7d)
              </span>
              <div className="flex flex-col gap-4">
                <span className="text-metric-lg text-text">
                  {homeMetrics.calls7d.value}
                </span>
                <div className="flex items-center gap-1.5">
                  <TrendUp size={14} weight="regular" className="text-success" />
                  <span className="text-caption text-success">
                    {homeMetrics.calls7d.delta}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <span className="text-caption-strong text-text-muted">
                Credit balance
              </span>
              <div className="flex flex-col gap-4">
                <span className="text-metric-lg text-text">
                  {homeMetrics.creditBalance.value}
                </span>
                <div className="flex items-center gap-1.5">
                  <CreditCard
                    size={14}
                    weight="regular"
                    className="text-text-muted"
                  />
                  <span className="text-caption text-text-muted">
                    {homeMetrics.creditBalance.caption}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <span className="text-caption-strong text-text-muted">
                p95 Latency
              </span>
              <div className="flex flex-col gap-4">
                <span className="text-metric-lg text-text">
                  {homeMetrics.p95Latency.value}
                </span>
                <div className="flex items-center gap-1.5">
                  <TrendDown
                    size={14}
                    weight="regular"
                    className="text-error"
                  />
                  <span className="text-caption text-error">
                    {homeMetrics.p95Latency.delta}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3" style={{ height: 148 }}>
            <Card className="p-5 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium leading-none text-text">
                  API Key
                </h3>
                <p className="text-caption text-text-muted leading-[1.51] max-w-[203px]">
                  Use this key in the Authorization header as a bearer token.
                </p>
              </div>
              <RevealableSecret value={apiKey.value} masked={apiKey.masked} />
            </Card>

            <Card className="p-5 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-start justify-between text-sm font-medium leading-none">
                <h3 className="text-text">MCP Integration</h3>
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center cursor-pointer text-text-subtle hover:text-text-muted [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[max(40px,100%)] before:h-10 before:content-['']"
                >
                  Extend
                </button>
              </div>
              <McpCodeBlock />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
            </Card>
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="flex flex-col gap-5">
        <SectionTitle>Learn more</SectionTitle>
        <div className="grid grid-cols-4 gap-3" style={{ height: 96 }}>
          {learnMore.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:border-primary/30 [transition-property:border-color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.98]"
            >
              <Icon size={20} weight="regular" className="text-primary" />
              <span className="text-sm font-medium text-text">{title}</span>
            </Link>
          ))}
        </div>
      </section>
    </ContentShell>
  );
}
