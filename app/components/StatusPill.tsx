import { cn } from "@/app/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "neutral";

const toneStyles: Record<Tone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-info/10 text-info",
  neutral: "bg-surface-subtle text-text-muted",
};

export function StatusPill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] font-medium leading-none tracking-wide",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
