import { cn } from "@/lib/utils";
import React from "react";

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  text: React.ReactNode;
  positionClass?: string; // e.g., "top-10 left-10"
}

export function FloatingCard({
  icon,
  text,
  positionClass,
  className,
  ...props
}: FloatingCardProps) {
  return (
    <div
      className={cn(
        "absolute glass animate-float rounded-2xl p-4 flex items-center gap-3 shadow-lg z-10",
        positionClass,
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </div>
      <div className="font-medium text-[var(--text-primary)]">{text}</div>
    </div>
  );
}
