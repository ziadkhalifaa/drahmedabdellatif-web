'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Section, SectionHeader, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { Stethoscope, Award, Users, Activity, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { EditableText, EditableImage } from '@/components/editor/editable-components';

const stats = [
  { icon: Award, key: 'experience', value: '15+' },
  { icon: Users, key: 'patients', value: '5000+' },
  { icon: Activity, key: 'surgeries', value: '2000+' },
  { icon: Stethoscope, key: 'awards', value: '20+' },
];

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <Section id="about">
      <SectionHeader title={t('title')} />
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <EditableImage 
            contentKey="about.image"
            defaultSrc="doctor.webp"
            alt={t('title')}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl border-4 border-white dark:border-white/5"
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-lg leading-relaxed text-[var(--muted)]">
            <EditableText 
              contentKey="about.description" 
              defaultAr={t('description')} 
              defaultEn={t('description')} 
              as="p"
            />
          </div>

          <div className="mt-10">
            <Link href="/about">
              <Button size="lg" className="rounded-full px-8 gap-2 group">
                {t('experience')} 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.key} className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <stat.icon size={28} className="mx-auto text-[var(--primary)] mb-3" />
                <p className="text-3xl font-bold text-[var(--foreground)] tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-[var(--muted)]">{t(stat.key)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}


