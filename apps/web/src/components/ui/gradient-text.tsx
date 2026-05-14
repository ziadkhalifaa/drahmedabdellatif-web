import { cn } from "@/lib/utils";
import React from "react";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string;
  to?: string;
  children: React.ReactNode;
}

export function GradientText({
  from = "var(--primary)",
  to = "var(--accent)",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
