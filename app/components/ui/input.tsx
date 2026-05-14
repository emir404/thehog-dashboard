import * as React from "react";
import { cn } from "@/app/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full bg-surface border border-border-default rounded-lg p-3 text-sm font-medium leading-none text-text placeholder:text-text-subtle placeholder:font-medium shadow-[0_0_8px_rgba(0,0,0,0.02)] transition-colors focus:outline-none focus:border-border-strong focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
