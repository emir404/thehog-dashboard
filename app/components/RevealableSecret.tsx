"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { CopyButton } from "./CopyButton";

export function RevealableSecret({
  value,
  masked,
}: {
  value: string;
  masked: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-code-bg px-3 py-2">
      <span className="text-code-sm text-code-text truncate">
        {revealed ? value : masked}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          aria-label={revealed ? "Hide secret" : "Reveal secret"}
          className="relative inline-flex items-center justify-center rounded-md cursor-pointer text-text-muted hover:text-text [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-10 before:content-['']"
        >
          {revealed ? (
            <EyeSlash size={16} weight="regular" />
          ) : (
            <Eye size={16} weight="regular" />
          )}
        </button>
        <CopyButton value={value} label="Copy key" />
      </div>
    </div>
  );
}
