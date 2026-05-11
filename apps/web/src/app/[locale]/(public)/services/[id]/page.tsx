'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, Card, Button } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { Calendar, CheckCircle2, Stethoscope } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { api, getMediaUrl } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Service>(`/services/${id}`)
      .then(setService)
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-[var(--primary)] animate-pulse font-bold text-xl">Loading...</div>
        </main>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{locale === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'}</h1>
            <Link href="/services"><Button>{locale === 'ar' ? 'العودة للخدمات' : 'Back to Services'}</Button></Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const title = locale === 'ar' ? service.titleAr : service.titleEn;
  const description = locale === 'ar' ? service.descriptionAr : service.descriptionEn;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <Section>
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-center mb-16"
            >
              <div className="space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--primary)]/10">
                  <Stethoscope className="h-10 w-10 text-[var(--primary)]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight">{title}</h1>
                <p className="text-lg text-[var(--muted)] leading-relaxed">{description}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/booking">
                    <Button className="w-full py-7 rounded-2xl text-lg font-black shadow-2xl shadow-[var(--primary)]/20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]">
                      {tNav('bookNow')}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full py-7 rounded-2xl text-lg font-bold border-2">
                      {tNav('contact')}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {service.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)]"
                >
                  <img 
                    src={getMediaUrl(service.image)} 
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-8 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16" />
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-[var(--primary)]" />
                  {locale === 'ar' ? 'لماذا تختارنا لهذه الخدمة؟' : 'Why Choose Us for This Service?'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    locale === 'ar' ? 'فريق طبي متخصص بخبرة تزيد عن 20 عاماً' : 'Specialized medical team with 20+ years of experience',
                    locale === 'ar' ? 'أحدث الأجهزة والتقنيات العالمية' : 'Latest global equipment and technology',
                    locale === 'ar' ? 'رعاية شاملة قبل وبعد العملية' : 'Comprehensive pre and post-operative care',
                    locale === 'ar' ? 'متابعة دورية ونتائج مضمونة' : 'Regular follow-up and guaranteed results',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                      <span className="text-[var(--muted)] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
