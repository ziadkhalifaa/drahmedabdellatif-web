'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar, PlayCircle, Star, CheckCircle, Microscope } from 'lucide-react';
import { CountUp } from '@/components/ui/count-up';
import { FloatingCard } from '@/components/ui/floating-card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

export function HeroSection() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');
  const tTrust = useTranslations('trust');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#041520] pt-20">
      {/* Background Gradient & Effects */}
      <div 
        className="absolute inset-0 z-0 opacity-90"
        style={{ background: 'linear-gradient(135deg, #041520 0%, #0B3D6B 40%, #0F5280 70%, #041520 100%)' }}
      />
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 mix-blend-overlay" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1], x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-600 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 flex flex-col justify-center min-h-[calc(100dvh-5rem)]">
        <div className="grid lg:grid-cols-[60%_40%] items-center gap-12 lg:gap-8">
          
          {/* Text Content (Left on LTR, Right on RTL) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start pt-10 lg:pt-0"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6 relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="relative glass-dark px-4 py-1.5 rounded-full flex items-center gap-2">
                <Star size={14} className="text-[var(--accent)] fill-[var(--accent)]" />
                <span className="text-xs font-bold text-white tracking-wider">
                  {isRTL ? 'أستاذ وزارة الصحة | FACS Member' : 'Ministry of Health Professor | FACS Member'}
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-[var(--text-hero)] font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--accent-light)] font-display"
            >
              {t('title') || (isRTL ? 'أ.د. أحمد عبد اللطيف' : 'Prof. Dr. Ahmed Abdellatif')}
            </motion.h1>

            {/* H2 Subtitle */}
            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-xl sm:text-2xl text-white/80 font-light max-w-2xl leading-relaxed"
            >
              {t('subtitle') || (isRTL ? 'أستاذ جراحة المسالك البولية والكلى' : 'Professor of Urology & Nephrology')}
            </motion.h2>

            {/* Credential Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mt-8">
              <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 font-bold text-xs sm:text-sm">
                🏥 {isRTL ? 'أستاذ جامعي' : 'University Professor'}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 font-bold text-xs sm:text-sm">
                🔬 FACS
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 font-bold text-xs sm:text-sm">
                ⚕️ {isRTL ? '١٥+ سنة خبرة' : '15+ Years Exp'}
              </Badge>
            </motion.div>

            {/* Stats Bar */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-y border-white/10 w-full max-w-2xl">
              {[
                { num: 15, label: tStats('experience') || (isRTL ? 'عام خبرة' : 'Years Exp'), suffix: '+' },
                { num: 5000, label: tStats('patients') || (isRTL ? 'مريض' : 'Patients'), suffix: '+' },
                { num: 2000, label: tStats('surgeries') || (isRTL ? 'عملية' : 'Surgeries'), suffix: '+' },
                { num: 20, label: tStats('awards') || (isRTL ? 'جائزة' : 'Awards'), suffix: '+' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col relative group">
                  <span className="text-3xl font-black text-white font-mono tracking-tight flex items-center">
                    <CountUp to={stat.num} duration={2.5} />
                    <span className="text-[var(--accent)] ml-0.5">{stat.suffix}</span>
                  </span>
                  <span className="text-xs text-white/60 font-bold tracking-wider uppercase mt-1">
                    {stat.label}
                  </span>
                  {/* Vertical Divider for all except last */}
                  {i < 3 && (
                    <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/10 group-last:hidden rtl:-left-4 rtl:right-auto" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-10 text-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-[var(--primary-dark)] font-black gap-3 rounded-[1.25rem] shadow-[var(--shadow-gold)] transition-transform hover:scale-105 active:scale-95">
                  <Calendar size={22} />
                  {isRTL ? 'احجز موعدك الآن' : 'Book Your Appointment'}
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-16 px-10 text-lg border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm rounded-[1.25rem] transition-colors gap-3 font-bold">
                  <PlayCircle size={22} />
                  {isRTL ? 'تعرف على الدكتور' : 'Discover More'}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex justify-center items-center h-full"
          >
            {/* Spinning Gold Circle */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-[var(--accent)]/30"
            />
            
            {/* Organic Blob Image */}
            <div 
              className="relative z-10 w-[400px] h-[550px] overflow-hidden border-[6px] border-white/10 shadow-2xl backdrop-blur-sm"
              style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
            >
              <img 
                src="/images/doctor.png" 
                alt="Prof. Dr. Ahmed Abdellatif"
                className="w-full h-full object-cover object-top scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041520]/80 via-transparent to-transparent mix-blend-multiply" />
            </div>

            {/* Floating Cards */}
            <FloatingCard 
              icon={<CheckCircle size={20} className="text-[var(--success)]" />}
              text={tTrust('available') || (isRTL ? 'متاح اليوم' : 'Available Today')}
              className="absolute -left-10 top-20 bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-xl animate-pulse"
            />
            
            <FloatingCard 
              icon={<Star size={20} className="text-[var(--accent)] fill-[var(--accent)]" />}
              text={<><strong>4.9/5</strong> <span className="text-sm font-normal text-white/80">{isRTL ? 'تقييم المرضى' : 'Patient Rating'}</span></>}
              positionClass="absolute -left-16 bottom-32"
              className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-xl delay-150"
            />

            <FloatingCard 
              icon={<Microscope size={20} className="text-cyan-400" />}
              text={isRTL ? 'أحدث التقنيات' : 'Latest Technologies'}
              positionClass="absolute -right-4 top-1/2"
              className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-xl delay-300"
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-[10px] font-black tracking-widest uppercase">{isRTL ? 'اكتشف المزيد' : 'Scroll Down'}</span>
        <div className="h-10 w-6 rounded-full border-2 border-current flex items-start justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-current" 
          />
        </div>
      </motion.div>
    </section>
  );
}
