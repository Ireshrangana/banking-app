import type * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", {
  variants: {
    variant: {
      success: "bg-success/15 text-success",
      warning: "bg-warning/15 text-warning",
      danger: "bg-danger/15 text-danger",
      neutral: "bg-secondary text-secondary-foreground"
    }
  },
  defaultVariants: {
    variant: "neutral"
  }
});

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
