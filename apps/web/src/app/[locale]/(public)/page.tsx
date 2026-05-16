import { Metadata } from 'next';
import { getMessages, getLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppWidget } from '@/components/ui/whatsapp-widget';
import { HeroSection } from '@/components/sections/hero-section';
import { CoreTechniquesSection } from '@/components/sections/core-techniques-section';
import { AboutSection } from '@/components/sections/about-section';
import { StatisticsSection } from '@/components/sections/statistics-section';
import { ServicesCarouselSection } from '@/components/sections/services-carousel-section';
import { SurgicalTipsSection } from '@/components/sections/surgical-tips-section';
import { WhyUsSection } from '@/components/sections/why-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { BookingCTASection } from '@/components/sections/booking-cta-section';
import { BookingForm } from '@/components/sections/booking-form';

import { Stethoscope, Zap, ShieldCheck, Headphones } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages: any = await getMessages({ locale });
  const t = messages.hero;

  return {
    title: `${t.title} | ${t.subtitle}`,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
    },
  };
}


export default async function HomePage() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  const bookingFeatures = isAr ? [
    { icon: Stethoscope, text: 'كشف وتشخيص دقيق بأحدث الأجهزة' },
    { icon: Zap, text: 'تقنيات ليزر متقدمة بدون جراحة تقليدية' },
    { icon: ShieldCheck, text: 'خبرة +15 سنة في جراحة المسالك البولية' },
    { icon: Headphones, text: 'متابعة ما بعد العلاج حتى الشفاء الكامل' },
  ] : [
    { icon: Stethoscope, text: 'Accurate examination and diagnosis with modern equipment' },
    { icon: Zap, text: 'Advanced laser techniques without traditional surgery' },
    { icon: ShieldCheck, text: '+15 years experience in urological surgeries' },
    { icon: Headphones, text: 'Post-treatment follow-up until complete recovery' },
  ];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* 1 - Hero */}
        <HeroSection />
        {/* 2 - Services */}
        <ServicesCarouselSection />
        {/* 3 - About */}
        <AboutSection />
        {/* 4 - Statistics */}
        <StatisticsSection />
        {/* 5 - Core Techniques */}
        <CoreTechniquesSection />
        {/* 6 - Why Us */}
        <WhyUsSection />
        {/* 7 - Testimonials */}
        <TestimonialsSection />
        {/* 8 - Booking CTA (choice section) */}
        <BookingCTASection />
        {/* 9 - Surgical Tips */}
        <SurgicalTipsSection />
        {/* 10 - Booking Form */}
        <section id="booking-section" className="relative py-28 overflow-hidden bg-[#050e1a]">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Left: Info Column */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[var(--accent)] text-xs font-black uppercase tracking-widest mb-8">
                  {isAr ? 'احجز الآن' : 'Book Now'}
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                  {isAr ? <>ابدأ رحلتك نحو <span className="text-[var(--accent)]">الصحة</span> اليوم</> : <>Start Your Journey to <span className="text-[var(--accent)]">Health</span> Today</>}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-10">
                  {isAr ? 'فريقنا الطبي المتخصص جاهز للإجابة على استفساراتك وحجز موعدك في أقرب وقت ممكن.' : 'Our specialized medical team is ready to answer your inquiries and schedule your appointment as soon as possible.'}
                </p>

                <div className="space-y-6">
                  {bookingFeatures.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] flex-shrink-0 group-hover:bg-[var(--primary)]/20 group-hover:border-[var(--primary)]/30 transition-all duration-300">
                        <item.icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="text-white/80 text-base font-bold group-hover:text-white transition-colors duration-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-8">
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
