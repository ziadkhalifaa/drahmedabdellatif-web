'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar } from 'lucide-react';
import { EditableText, EditableImage } from '@/components/editor/editable-components';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--primary-dark)]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary-dark)] via-[#0a2e4a] to-[var(--primary-light)] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:text-right sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col items-center lg:items-end">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]"
            >
              <EditableText 
                contentKey="hero.title" 
                defaultAr={t('title')} 
                defaultEn={t('title')} 
                as="span"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mt-8 text-xl text-white/80 sm:text-2xl lg:text-3xl max-w-3xl leading-relaxed font-light"
            >
              <EditableText 
                contentKey="hero.subtitle" 
                defaultAr={t('subtitle')} 
                defaultEn={t('subtitle')} 
                as="span"
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6"
            >
              <Link href="/booking">
                <Button size="lg" className="h-16 px-10 text-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-[var(--primary-dark)] font-bold gap-3 rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all hover:-translate-y-1">
                  <Calendar size={22} />
                  {t('cta')}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl transition-all">
                  {t('learnMore')}
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white/10 shadow-2xl">
              <EditableImage 
                contentKey="hero.image" 
                defaultSrc="/images/doctor.png" 
                alt="Dr. Ahmed Abdellatif"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--accent)] rounded-2xl -z-10 blur-2xl opacity-50" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-[var(--primary)] rounded-full -z-10 blur-3xl opacity-30" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="h-12 w-7 rounded-full border-2 border-white/20 flex items-start justify-center p-1 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2.5 w-1.5 rounded-full bg-white/60" 
          />
        </div>
      </motion.div>
    </section>
  );
}

