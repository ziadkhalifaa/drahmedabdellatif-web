import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-[var(--card)] border border-[var(--border)] p-6 transition-all duration-300',
        hover && 'hover:bg-[var(--card-hover)] hover:shadow-lg hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
