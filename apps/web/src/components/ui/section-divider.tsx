import { cn } from "@/lib/utils";
import React from "react";

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  flip?: boolean;
  height?: string;
}

export function SectionDivider({
  color = "var(--surface-0)",
  flip = false,
  height = "64px",
  className,
  ...props
}: SectionDividerProps) {
  return (
    <div
      className={cn("w-full overflow-hidden leading-none", className)}
      style={{ height, transform: flip ? "rotate(180deg)" : "none" }}
      {...props}
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
        ></path>
      </svg>
    </div>
  );
}
