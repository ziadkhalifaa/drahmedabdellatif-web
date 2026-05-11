import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WhyUsSection } from '@/components/sections/why-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { BlogPreviewSection } from '@/components/sections/blog-preview-section';
import { BookingCTASection } from '@/components/sections/booking-cta-section';
import { BookingForm } from '@/components/sections/booking-form';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <BookingCTASection />
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BookingForm />
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
