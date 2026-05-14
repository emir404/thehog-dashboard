"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card } from "./Card";
import { CopyButton } from "./CopyButton";
import { mcpConfig } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

function TokenizedConfig({ className }: { className?: string }) {
  return (
    <pre className={cn("whitespace-pre", className)}>
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
  );
}

export function McpIntegrationCard() {
  return (
    <Card className="p-5 flex flex-col gap-3 relative overflow-hidden">
      <div className="flex items-start justify-between text-sm font-medium leading-none">
        <h3 className="text-text">MCP Integration</h3>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="relative inline-flex items-center justify-center cursor-pointer text-text-subtle hover:text-text-muted [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[max(40px,100%)] before:h-10 before:content-['']"
            >
              Extend
            </button>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <DialogTitle>MCP Integration</DialogTitle>
                <DialogDescription>
                  Add this to your MCP client config (Claude Desktop, Cursor, etc.) and restart the client to expose The Hog as a tool.
                </DialogDescription>
              </div>
              <div className="relative rounded-lg bg-code-bg px-4 py-3">
                <TokenizedConfig className="text-code-sm leading-[1.5] text-code-text overflow-x-auto pr-8" />
                <CopyButton
                  value={mcpConfig}
                  className="absolute top-2 right-2"
                  label="Copy config"
                />
              </div>
              <p className="text-caption text-text-muted">
                <code className="text-code-sm bg-code-bg rounded px-1 py-0.5">HOG_API_KEY</code> must be set in your shell environment to a key from{" "}
                <a className="text-primary hover:text-primary-hover underline underline-offset-2" href="/credentials">Credentials</a>.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg bg-code-bg px-3 py-2 h-[180px] overflow-hidden">
        <TokenizedConfig className="text-code-sm leading-[1.5] text-code-text" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
    </Card>
  );
}
