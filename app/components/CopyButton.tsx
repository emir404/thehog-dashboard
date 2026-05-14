"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/app/lib/utils";

export function CopyButton({
  value,
  className,
  size = 16,
  label = "Copy",
}: {
  value: string;
  className?: string;
  size?: number;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "relative shrink-0 inline-flex items-center justify-center rounded-md cursor-pointer text-text-muted hover:text-text [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-10 before:content-['']",
        className,
      )}
    >
      {copied ? (
        <Check size={size} weight="bold" />
      ) : (
        <Copy size={size} weight="regular" />
      )}
    </button>
  );
}
