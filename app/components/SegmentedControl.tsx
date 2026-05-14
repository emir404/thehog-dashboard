"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/app/lib/utils";

type Option = {
  value: string;
  label: string;
};

type SegmentedControlProps = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
};

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  ariaLabel,
}: SegmentedControlProps) {
  const layoutId = useId();
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const value = controlledValue ?? internal;

  const handleChange = (next: string) => {
    if (controlledValue === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-0 rounded-lg bg-primary/5 p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => handleChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center rounded-[4px] px-2 py-1.5 text-caption-strong cursor-pointer [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              active
                ? "text-primary-pressed"
                : "text-primary-pressed/70 hover:text-primary-pressed",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-pill-${layoutId}`}
                className="absolute inset-0 rounded-[4px] bg-surface shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
