import { cn } from "@/app/lib/utils";
import { Card } from "./Card";

type KpiCardProps = {
  label: string;
  value: string;
  footer?: React.ReactNode;
  height?: number;
  className?: string;
};

export function KpiCard({
  label,
  value,
  footer,
  height = 148,
  className,
}: KpiCardProps) {
  return (
    <Card
      height={height}
      className={cn("flex flex-col justify-between p-5", className)}
    >
      <span className="text-caption-strong text-text-muted">{label}</span>
      <div className="flex flex-col gap-4">
        <span className="text-metric-lg text-text">{value}</span>
        {footer ? (
          <div className="flex items-center gap-1.5">{footer}</div>
        ) : null}
      </div>
    </Card>
  );
}
