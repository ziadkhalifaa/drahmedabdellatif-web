'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section, SectionHeader, Card } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const t = useTranslations('faqs');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = t.raw('items') as { q: string; a: string }[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Section className="bg-gradient-to-b from-[var(--primary)]/5 to-transparent">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
          
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card 
                  className={cn(
                    "overflow-hidden transition-all duration-300 border-[var(--border)]",
                    openIndex === i ? "border-[var(--primary)] shadow-lg shadow-[var(--primary)]/5" : "hover:border-[var(--primary)]/50"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-right outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                        openIndex === i ? "bg-[var(--primary)] text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]"
                      )}>
                        <HelpCircle size={18} />
                      </div>
                      <h3 className={cn(
                        "text-lg font-bold transition-colors",
                        openIndex === i ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                      )}>
                        {faq.q}
                      </h3>
                    </div>
                    <div className="text-[var(--muted)]">
                      {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="p-6 pt-0 text-[var(--muted)] leading-relaxed border-t border-[var(--border)] bg-[var(--primary)]/5">
                      {faq.a}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Still have questions? */}
        <Section className="text-center py-20">
           <Card className="max-w-2xl mx-auto p-12 space-y-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white border-none shadow-2xl">
              <h2 className="text-3xl font-bold">{t('moreQuestions')}</h2>
              <p className="text-white/80">{t('moreQuestionsDesc')}</p>
              <div className="pt-4">
                 <Link href="/contact">
                   <button className="bg-white text-[var(--primary)] px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all">
                      {t('contactUsNow')}
                   </button>
                 </Link>
              </div>
           </Card>
        </Section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
