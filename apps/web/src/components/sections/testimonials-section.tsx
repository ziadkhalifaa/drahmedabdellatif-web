'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Section, SectionHeader, Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Star } from 'lucide-react';
import type { Testimonial } from '@dr-ahmed/shared';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    api.get<Testimonial[]>('/testimonials').then(setTestimonials).catch(() => {});
  }, []);

  if (!testimonials.length) return null;

  return (
    <Section id="testimonials" className="bg-[var(--card)]/50">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <p className="flex-1 text-sm text-[var(--muted)] leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                  {item.patientName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-[var(--foreground)]">{item.patientName}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
