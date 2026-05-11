'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section, SectionHeader, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Link } from '@/i18n/routing';
import type { Service } from '@dr-ahmed/shared';

import { Stethoscope, Activity, Scan, Heart, Shield, Gem, ChevronRight } from 'lucide-react';
import { EditableText, EditableImage } from '@/components/editor/editable-components';


const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Kidney: Activity, Scan, Heart, Shield, Gem,
};

export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.get<Service[]>('/services').then(setServices).catch(() => {});
  }, []);

  return (
    <Section id="services" className="bg-gradient-to-b from-transparent to-[var(--primary)]/5">
      <SectionHeader title={<EditableText contentKey="services.title" defaultAr={t('title')} defaultEn={t('title')} />} subtitle={<EditableText contentKey="services.subtitle" defaultAr={t('subtitle')} defaultEn={t('subtitle')} />} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service, i) => {
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
                    <div className="text-[var(--muted)] leading-relaxed line-clamp-3">
                       <EditableText 
                          contentKey={`service:${service.id}:${locale === 'ar' ? 'descriptionAr' : 'descriptionEn'}`}
                          defaultAr={service.descriptionAr}
                          defaultEn={service.descriptionEn}
                          as="p"
                       />
                    </div>
                    <div className="pt-4 mt-auto">
                       <Link href="/services">
                         <Button variant="ghost" className="p-0 h-auto font-bold text-[var(--primary)] group-hover:gap-2 transition-all">
                           {t('learnMore')} 
                           <ChevronRight size={18} className={locale === 'ar' ? 'rotate-180' : ''} />
                         </Button>
                       </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>



        <div className="mt-16 text-center">
          <Link href="/services">
            <Button size="lg" variant="outline" className="rounded-full px-12 py-6 text-lg font-bold border-2 hover:bg-[var(--primary)] hover:text-white transition-all">
              {t('viewAll')}
            </Button>
          </Link>
        </div>
    </Section>
  );
}
