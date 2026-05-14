import { cn } from "@/app/lib/utils";

type ContentShellProps = {
  children: React.ReactNode;
  variant?: "wide" | "narrow";
  className?: string;
};

export function ContentShell({
  children,
  variant = "wide",
  className,
}: ContentShellProps) {
  return (
    <div className="h-full pr-3 py-3 flex flex-col overflow-hidden">
      <div
        className={cn(
          "flex-1 min-h-0 bg-surface border border-border-default rounded-[20px] shadow-[0_0_8px_rgba(0,0,0,0.05)] overflow-auto",
          className,
        )}
      >
        <div className="p-8">
          {variant === "narrow" ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-[840px] py-8 flex flex-col gap-16">
                {children}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-16">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
