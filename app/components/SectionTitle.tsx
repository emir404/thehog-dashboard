import { cn } from "@/app/lib/utils";

export function SectionTitle({
  children,
  trailing,
  className,
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}) {
  if (trailing) {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-base font-medium leading-none text-text">
          {children}
        </h2>
        {trailing}
      </div>
    );
  }
  return (
    <h2
      className={cn("text-base font-medium leading-none text-text", className)}
    >
      {children}
    </h2>
  );
}
