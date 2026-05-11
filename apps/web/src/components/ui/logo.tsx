'use client';

import { cn } from '@/lib/utils';

export function Logo({ className, iconOnly = false }: { className?: string, iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative h-12 w-12 flex-shrink-0 transition-transform group-hover:scale-110">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-md"
        >
          {/* Main Kidney Shape - Top */}
          <path
            d="M70 25C85 25 95 40 95 55C95 70 85 85 70 85C60 85 55 80 50 75C45 80 40 85 30 85C15 85 5 70 5 55C5 40 15 25 30 25C40 25 45 30 50 35C55 30 60 25 70 25Z"
            fill="url(#kidney_grad)"
          />
          
          {/* Subtle Shine/Highlight */}
          <path
            d="M30 35C20 35 15 45 15 55"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: 0.3 }}
          />
          
          {/* Medical Cross / Sparkle */}
          <circle cx="50" cy="55" r="12" fill="white" style={{ opacity: 0.9 }} />
          <path
            d="M50 48V62M43 55H57"
            stroke="url(#kidney_grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="kidney_grad" x1="5" y1="25" x2="95" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tight text-[var(--foreground)] dark:text-white">
            DR. AHMED
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
            Urology Specialist
          </span>
        </div>
      )}
    </div>
  );
}
