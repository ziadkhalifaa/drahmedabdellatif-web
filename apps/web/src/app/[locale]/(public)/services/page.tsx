'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Card } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { api } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';
import { Activity, Scan, Heart, Stethoscope, Shield, Gem, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { EditableText, EditableImage } from '@/components/editor/editable-components';

const iconMap: Record<string, any> = {
  Stethoscope, Activity, Scan, Heart, Shield, Gem,
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.get<Service[]>('/services').then(setServices).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Section className="bg-gradient-to-b from-[var(--primary)]/5 to-transparent overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-2 items-center mb-12">
            <div>
              <SectionHeader 
                title={<EditableText contentKey="services.hero.title" defaultAr={t('title')} defaultEn={t('title')} />} 
                subtitle={<EditableText contentKey="services.hero.desc" defaultAr={t('subtitle')} defaultEn={t('subtitle')} />} 
                className="text-right"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-video rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl"
            >
              <EditableImage 
                contentKey="services.hero.image"
                defaultSrc="/images/urology.png"
                alt="Services Hero"
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Activity;
              const title = locale === 'ar' ? service.titleAr : service.titleEn;
              const description = locale === 'ar' ? service.descriptionAr : service.descriptionEn;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card className="group h-full flex flex-col overflow-hidden rounded-[2.5rem] border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-white/5">
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                      <EditableImage 
                        contentKey={`service:${service.id}:image`}
                        defaultSrc={service.image || ''}
                        alt={title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />



                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                           {t('badge')}
                         </div>
                         <h3 className="text-2xl font-black text-white leading-tight">
                            <EditableText 
                              contentKey={`service:${service.id}:${locale === 'ar' ? 'titleAr' : 'titleEn'}`}
                              defaultAr={service.titleAr}
                              defaultEn={service.titleEn}
                              className="pointer-events-auto"
                            />
                         </h3>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col space-y-4">
                      <div className="text-[var(--muted)] leading-relaxed line-clamp-4">
                         <EditableText 
                            contentKey={`service:${service.id}:${locale === 'ar' ? 'descriptionAr' : 'descriptionEn'}`}
                            defaultAr={service.descriptionAr}
                            defaultEn={service.descriptionEn}
                            as="p"
                         />
                      </div>
                      <div className="pt-4 mt-auto">
                         <button className="flex items-center gap-2 font-bold text-[var(--primary)] group-hover:gap-3 transition-all">
                           {t('details')} 
                           <ChevronRight size={18} className={locale === 'ar' ? 'rotate-180' : ''} />
                         </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>


        </Section>

        {/* Call to Action */}
        <Section className="py-20">
          <div className="rounded-3xl bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
                <p className="text-white/80 max-w-2xl mx-auto text-lg">
                  {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Link href="/booking">
                    <button className="bg-white text-[var(--primary)] px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all shadow-xl">
                      {t('cta.book')}
                    </button>
                  </Link>
                  <a href="https://wa.me/+201002621743" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[var(--accent)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--accent-light)] transition-all shadow-xl">
                      {t('cta.whatsapp')}
                    </button>
                  </a>
                </div>
             </div>
          </div>
        </Section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
