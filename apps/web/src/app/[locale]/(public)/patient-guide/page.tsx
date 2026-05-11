'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Card } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { BookOpen, ClipboardCheck, Info, HeartPulse, ShieldAlert, CheckCircle2, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CLINIC_PHONE } from '@dr-ahmed/shared';


export default function PatientGuidePage() {
  const t = useTranslations('patientGuide');

  const guides = [
    {
      icon: ClipboardCheck,
      title: t('prep'),
      color: 'blue',
      items: t.raw('items.prep')
    },
    {
      icon: HeartPulse,
      title: t('postOp'),
      color: 'green',
      items: t.raw('items.postOp')
    },
    {
      icon: ShieldAlert,
      title: t('prevention'),
      color: 'orange',
      items: t.raw('items.prevention')
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Section className="bg-gradient-to-b from-[var(--primary)]/5 to-transparent">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
          
          <div className="grid gap-12 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="h-full p-8 flex flex-col space-y-6 border-none shadow-2xl relative overflow-hidden group">
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 opacity-5 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-150 duration-700",
                    guide.color === 'blue' ? "bg-blue-600" : guide.color === 'green' ? "bg-green-600" : "bg-orange-600"
                  )} />
                  
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500",
                    guide.color === 'blue' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : 
                    guide.color === 'green' ? "bg-green-100 text-green-600 dark:bg-green-900/30" : 
                    "bg-orange-100 text-orange-600 dark:bg-orange-900/30"
                  )}>
                    <guide.icon size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">{guide.title}</h3>
                  
                  <ul className="space-y-4 flex-1">
                    {guide.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-[var(--muted)] leading-relaxed group/item">
                        <CheckCircle2 size={18} className={cn(
                          "mt-1 shrink-0 transition-transform group-hover/item:scale-110",
                          guide.color === 'blue' ? "text-blue-500" : guide.color === 'green' ? "text-green-500" : "text-orange-500"
                        )} />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-[var(--border)]">
                     <button onClick={() => window.print()} className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                        {t('downloadPdf')}
                     </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Emergency Section */}
        <Section className="py-20">
           <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 border-2 border-dashed ltr:md:flex-row-reverse">
              <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 shrink-0 animate-pulse">
                <ShieldAlert size={40} />
              </div>
              <div className="space-y-4 text-center md:text-right ltr:md:text-left flex-1">
                 <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">{t('emergency.title')}</h2>
                 <p className="text-red-600/80 max-w-3xl leading-relaxed">
                   {t('emergency.description')}
                 </p>
                 <div className="pt-2">
                    <a href={`tel:${CLINIC_PHONE}`} className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                       <Phone size={18} />
                       {t('emergency.button')}
                    </a>
                 </div>
              </div>
           </Card>
        </Section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}


