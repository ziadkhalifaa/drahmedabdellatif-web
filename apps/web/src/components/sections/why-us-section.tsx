'use client';

import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/ui';
import { motion } from 'framer-motion';
import { Shield, Cpu, Heart, Smile } from 'lucide-react';
import { EditableText } from '@/components/editor/editable-components';

const iconMap: Record<string, React.ElementType> = {
  'Expert Care': Shield,
  'Modern Technology': Cpu,
  'Patient-Centered': Heart,
  'Compassionate Approach': Smile,
};

export function WhyUsSection() {
  const t = useTranslations('whyUs');
  const reasons = t.raw('reasons') as { title: string; description: string }[];

  return (
    <Section id="why-us">
      <SectionHeader title={t('title')} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => {
          const Icon = iconMap[reason.title] || Shield;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                <Icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                <EditableText 
                  contentKey={`whyUs.reason.${i}.title`} 
                  defaultAr={reason.title} 
                  defaultEn={reason.title} 
                />
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                <EditableText 
                  contentKey={`whyUs.reason.${i}.desc`} 
                  defaultAr={reason.description} 
                  defaultEn={reason.description} 
                />
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
