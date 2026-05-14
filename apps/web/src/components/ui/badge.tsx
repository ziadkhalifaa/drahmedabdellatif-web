import { cn } from "@/lib/utils";
import React from "react";

export type BadgeVariant = "primary" | "gold" | "success" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export function Badge({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-[var(--primary)] text-white border-transparent",
    gold: "bg-[var(--accent)] text-white border-transparent shadow-[var(--shadow-gold)]",
    success: "bg-[var(--success)] text-white border-transparent",
    outline: "bg-transparent text-[var(--primary)] border-[var(--primary)]/30 border",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="mr-1.5 -ml-0.5 inline-block">{icon}</span>}
      {children}
    </span>
  );
}
