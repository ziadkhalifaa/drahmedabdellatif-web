'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar, MessageCircle, Phone, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { EditableText } from '@/components/editor/editable-components';
import { cn } from '@/lib/utils';

export function BookingCTASection() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-28 overflow-hidden bg-[#0a192f]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-blue-600/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[var(--accent)] text-xs font-black uppercase tracking-widest mb-8">
            <Star size={14} className="fill-[var(--accent)]" />
            {isAr ? 'احجز موعدك الآن' : 'Book Your Appointment'}
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {isAr ? (
              <>
                ابدأ رحلتك نحو
                <span className="text-[var(--accent)]"> الصحة </span>
                اليوم
              </>
            ) : (
              <>
                Start Your
                <span className="text-[var(--accent)]"> Health </span>
                Journey Today
              </>
            )}
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {isAr
              ? 'لا تتردد في التواصل معنا. فريقنا الطبي المتخصص جاهز للإجابة على جميع استفساراتك وتقديم أفضل رعاية طبية.'
              : "Don't hesitate to reach out. Our specialized medical team is ready to answer all your questions and provide the best medical care."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/booking">
              <Button size="lg" className="h-16 px-10 text-lg bg-[var(--accent)] hover:bg-[#eab531]/90 text-black font-black gap-3 rounded-2xl shadow-2xl shadow-[var(--accent)]/20 transition-all hover:-translate-y-1">
                <Calendar size={22} />
                {isAr ? 'احجز موعداً' : 'Book Appointment'}
              </Button>
            </Link>

            <a href="https://wa.me/201002621743" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white/10 font-black gap-3 rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-1">
                <MessageCircle size={22} />
                {isAr ? 'تواصل واتساب' : 'WhatsApp Us'}
              </Button>
            </a>

            <a href="tel:+201101211994">
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white/10 font-black gap-3 rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-1">
                <Phone size={22} />
                {isAr ? 'اتصل بنا' : 'Call Us'}
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10">
            {[
              { val: '5000+', label: isAr ? 'عملية ناجحة' : 'Successful Surgeries' },
              { val: '15+',   label: isAr ? 'سنة خبرة' : 'Years Experience' },
              { val: '3',     label: isAr ? 'عيادات متخصصة' : 'Specialized Clinics' },
              { val: '24/7',  label: isAr ? 'دعم مستمر' : 'Continuous Support' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-[var(--accent)]">{item.val}</div>
                <div className="text-xs text-white/50 font-medium mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
