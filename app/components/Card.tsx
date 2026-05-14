import { cn } from "@/app/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: number | string;
};

export function Card({ children, className, height, style, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)]",
        className,
      )}
      style={height ? { height, ...style } : style}
      {...props}
    >
      {children}
    </div>
  );
}
