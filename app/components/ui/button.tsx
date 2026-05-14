"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium leading-none cursor-pointer [transition-property:color,background-color,border-color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 focus-visible:ring-offset-surface [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-pressed",
        subtle:
          "bg-primary/5 text-primary-pressed hover:bg-primary/10 active:bg-primary/15",
        secondary:
          "bg-surface-subtle text-text hover:bg-surface-hover active:bg-surface-hover",
        ghost: "text-text-muted hover:bg-surface-hover hover:text-text",
        destructive:
          "bg-error/5 text-error hover:bg-error/10 active:bg-error/15",
        outline:
          "border border-border-default bg-surface text-text hover:bg-surface-hover",
        link: "text-primary hover:text-primary-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "px-3 py-2.5 text-sm",
        sm: "px-2.5 py-2 text-xs",
        lg: "px-4 py-3 text-sm",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
