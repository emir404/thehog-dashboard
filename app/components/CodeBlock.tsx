"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/app/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: "shell" | "json";
  copyable?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** When provided, overrides default text rendering — useful for tokenized JSON */
  display?: React.ReactNode;
  tone?: "default" | "primary";
};

export function CodeBlock({
  code,
  copyable = true,
  className,
  display,
  tone = "default",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // noop
    }
  };

  const bg = tone === "primary" ? "bg-primary/5" : "bg-code-bg";
  const text = tone === "primary" ? "text-primary-pressed" : "text-code-text";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg px-3 py-2",
        bg,
        className,
      )}
    >
      <div className={cn("font-mono text-[0.75rem] leading-[1.51] whitespace-nowrap overflow-hidden text-ellipsis min-w-0", text)}>
        {display ?? code}
      </div>
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy"}
          className={cn(
            "relative shrink-0 inline-flex items-center justify-center rounded-md cursor-pointer [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-10 before:content-['']",
            tone === "primary"
              ? "text-primary-pressed hover:text-primary"
              : "text-text-muted hover:text-text",
          )}
        >
          {copied ? (
            <Check size={16} weight="bold" />
          ) : (
            <Copy size={16} weight="regular" />
          )}
        </button>
      )}
    </div>
  );
}
