'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] focus:ring-[var(--primary)]':
              variant === 'primary',
            'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] focus:ring-[var(--accent)]':
              variant === 'secondary',
            'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white':
              variant === 'outline',
            'text-[var(--foreground)] hover:bg-[var(--card-hover)]': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-base': size === 'md',
            'px-8 py-3.5 text-lg': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },

          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
