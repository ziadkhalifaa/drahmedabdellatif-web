import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}


export function SectionHeader({ title, subtitle, className, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-2xl', align === 'center' ? 'mx-auto text-center' : '', className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--foreground)]">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-[var(--muted)]">{subtitle}</p>}
    </div>
  );
}
