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

                <div className="space-y-5">
                  {(isAr ? [
                    { icon: '🩺', text: 'كشف وتشخيص دقيق بأحدث الأجهزة' },
                    { icon: '⚡', text: 'تقنيات ليزر متقدمة بدون جراحة تقليدية' },
                    { icon: '🌟', text: 'خبرة +15 سنة في جراحة المسالك البولية' },
                    { icon: '📞', text: 'متابعة ما بعد العلاج حتى الشفاء الكامل' },
                  ] : [
                    { icon: '🩺', text: 'Accurate examination and diagnosis with modern equipment' },
                    { icon: '⚡', text: 'Advanced laser techniques without traditional surgery' },
                    { icon: '🌟', text: '+15 years experience in urological surgeries' },
                    { icon: '📞', text: 'Post-treatment follow-up until complete recovery' },
                  ]).map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-white/70 text-sm font-medium">{item.text}</span>
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
