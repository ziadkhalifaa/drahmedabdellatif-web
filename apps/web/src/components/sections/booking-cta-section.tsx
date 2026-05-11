'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar } from 'lucide-react';
import { EditableText } from '@/components/editor/editable-components';

export function BookingCTASection() {
  const t = useTranslations('booking');

  return (
    <section className="bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            <EditableText 
              contentKey="booking.cta.title" 
              defaultAr={t('title')} 
              defaultEn={t('title')} 
            />
          </h2>
          <p className="mt-4 text-lg text-white/80">
            <EditableText 
              contentKey="booking.cta.subtitle" 
              defaultAr={t('subtitle')} 
              defaultEn={t('subtitle')} 
            />
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#booking-form">
              <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white gap-2 shadow-xl">
                <Calendar size={20} />
                {t('form.submit')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
