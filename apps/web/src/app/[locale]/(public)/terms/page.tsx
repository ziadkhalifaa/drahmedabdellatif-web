'use client';

import { useLocale } from 'next-intl';
import { motion as m } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { Section, SectionHeader, Card } from '@/components/ui';
import { CheckCircle, ShieldAlert, Calendar, RefreshCw, EyeOff, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TermsPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sections = [
    {
      icon: CheckCircle,
      titleAr: '1. قبول الشروط والأحكام',
      titleEn: '1. Acceptance of Terms',
      contentAr: 'باستخدامك لموقعنا أو قيامك بحجز موعد، فإنك تقر وتوافق على الالتزام بشروط الخدمة هذه وبسياسة الخصوصية بالكامل وبدون أي تحفظات.',
      contentEn: 'By using our website or booking an appointment, you acknowledge and agree to comply with these terms of service and our privacy policy in full and without any reservations.'
    },
    {
      icon: Calendar,
      titleAr: '2. سياسة حجز المواعيد والمدفوعات',
      titleEn: '2. Appointment Booking & Payments',
      contentAr: 'يتطلب حجز موعد عيادة سداد عربون حجز (100 جنيه) كإثبات لجدية الحجز. أما الاستشارات أونلاين فتتطلب سداد كامل القيمة (400 جنيه) مقدماً وتأكيد التحويل برفع الإيصال.',
      contentEn: 'Booking a clinic appointment requires paying a booking deposit (100 EGP) as proof of booking seriousness. Online consultations require full payment (400 EGP) in advance and upload of the receipt.'
    },
    {
      icon: RefreshCw,
      titleAr: '3. سياسة التعديل والإلغاء',
      titleEn: '3. Rescheduling & Cancellation Policy',
      contentAr: 'يمكن للمريض تعديل موعد الكشف أو إلغاؤه واسترداد العربون قبل الموعد بـ 24 ساعة على الأقل. في حال عدم الحضور بدون إلغاء مسبق، يسقط الحق في استرداد العربون.',
      contentEn: 'Patients can reschedule or cancel their appointment and refund the deposit at least 24 hours prior to the slot. In case of no-show without prior notice, the deposit is non-refundable.'
    },
    {
      icon: EyeOff,
      titleAr: '4. شروط الاستشارات أونلاين',
      titleEn: '4. Online Video Consultations',
      contentAr: 'تتم استشارات الفيديو عبر الإنترنت عبر روابط مشفرة وآمنة. يلتزم المريض بالحفاظ على سرية الجلسة ويمنع منعاً باتاً تسجيل اللقاء أو نشره بأي وسيلة.',
      contentEn: 'Online video consultations are held via encrypted and secure links. The patient commits to maintaining session confidentiality; recording or sharing the meeting is strictly prohibited.'
    },
    {
      icon: ShieldAlert,
      titleAr: '5. الاستخدام المقبول للحساب',
      titleEn: '5. Acceptable Use of Your Account',
      contentAr: 'يجب على المستخدم تقديم معلومات دقيقة وصحيحة ومطابقة لبطاقة الهوية والملف الطبي الحقيقي. يمنع انتحال الشخصية أو استخدام بيانات حجز وهمية.',
      contentEn: 'Users must provide accurate, true information matching their actual identity and medical profile. Impersonation or using fake booking details is strictly prohibited.'
    },
    {
      icon: Scale,
      titleAr: '6. إخلاء المسؤولية الطبية للويب',
      titleEn: '6. Medical Web Disclaimer',
      contentAr: 'المقالات والمعلومات التثقيفية المنشورة على هذا الموقع هي للتوعية والإرشاد العام فقط، ولا تعتبر تشخيصاً أو استشارة طبية تغني عن مقابلة الطبيب والتحاليل الطبية.',
      contentEn: 'Articles and medical advice published on this website are for general awareness and educational purposes only, and are not a replacement for a direct medical diagnosis.'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050e1a] pt-24 text-white">
        
        {/* Glow background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[130px]" />
        </div>

        <Section className="relative z-10">
          <SectionHeader 
            title={isAr ? 'شروط الاستخدام' : 'Terms of Use'} 
            subtitle={isAr ? 'القواعد والأحكام التي تنظم حجز المواعيد والاستشارات' : 'The rules and terms governing appointments and consultation bookings'} 
          />

          <div className="mx-auto max-w-4xl mt-12 space-y-6">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn("bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-md", isAr ? "text-right" : "text-left")}
            >
              <h2 className="text-xl sm:text-2xl font-black mb-4">
                {isAr ? 'أحكام عامة' : 'General Provisions'}
              </h2>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                {isAr 
                  ? 'يرجى قراءة شروط الخدمة هذه بعناية قبل البدء في استخدام الخدمة. يهدف الموقع الإلكتروني للأستاذ الدكتور أحمد عبد اللطيف إلى تيسير وصول المرضى للخدمات الطبية وحجز مواعيد العيادات والاستشارات الافتراضية أونلاين بكفاءة وأمان.' 
                  : 'Please read these terms of service carefully before using the service. The website of Prof. Dr. Ahmed Abdellatif aims to facilitate patient access to medical services, clinic bookings, and virtual online consultations efficiently and securely.'}
              </p>
            </m.div>

            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((sec, i) => {
                const Icon = sec.icon;
                return (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className={cn("p-6 sm:p-8 bg-white/5 border-white/10 hover:border-[var(--primary)]/50 transition-all duration-300 h-full flex flex-col justify-start gap-4", isAr ? "text-right" : "text-left")}>
                      <div className={cn("w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--accent)]", isAr ? "ms-auto" : "")}>
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-black text-white">
                        {isAr ? sec.titleAr : sec.titleEn}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {isAr ? sec.contentAr : sec.contentEn}
                      </p>
                    </Card>
                  </m.div>
                );
              })}
            </div>

            {/* Footer Note */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-8 text-white/40 text-xs sm:text-sm"
            >
              <p>
                {isAr 
                  ? 'آخر تحديث لشروط الخدمة: مايو ٢٠٢٦' 
                  : 'Last updated: May 2026'}
              </p>
              <p className="mt-1">
                {isAr 
                  ? 'إذا كان لديك أي استفسار حول شروط الاستخدام، يرجى مراسلتنا على: terms@drahmedabdellatif.com' 
                  : 'If you have any questions regarding these terms, please email us at: terms@drahmedabdellatif.com'}
              </p>
            </m.div>
          </div>
        </Section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
