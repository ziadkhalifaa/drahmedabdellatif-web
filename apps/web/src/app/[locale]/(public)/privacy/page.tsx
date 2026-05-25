'use client';

import { useLocale } from 'next-intl';
import { motion as m } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { Section, SectionHeader, Card } from '@/components/ui';
import { Shield, Eye, Lock, FileText, UserCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PrivacyPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sections = [
    {
      icon: Shield,
      titleAr: '1. حماية بياناتك الشخصية',
      titleEn: '1. Protection of Personal Data',
      contentAr: 'نحن نلتزم بحماية بياناتك الشخصية والطبية بأعلى معايير الأمان الرقمي والتشفير. نضمن لك بيئة آمنة تمنع أي وصول غير مصرح به أو تسريب للبيانات.',
      contentEn: 'We are committed to protecting your personal and medical data using the highest standards of digital security and encryption. We guarantee a secure environment to prevent unauthorized access or leaks.'
    },
    {
      icon: Eye,
      titleAr: '2. البيانات التي نجمعها',
      titleEn: '2. Data We Collect',
      contentAr: 'نقوم بجمع البيانات اللازمة لتنظيم الحجز الطبي: الاسم بالكامل، رقم الهاتف (واتساب)، البريد الإلكتروني، تاريخ الميلاد، والنوع. كما نجمع إيصالات التحويل لتأكيد المدفوعات.',
      contentEn: 'We collect data necessary for medical bookings: full name, phone number (WhatsApp), email address, birth date, and gender. We also collect transfer receipts to confirm payments.'
    },
    {
      icon: Lock,
      titleAr: '3. استخدام بياناتك الطبية',
      titleEn: '3. Use of Medical Data',
      contentAr: 'بياناتك الطبية وملفك الشخصي تُستخدم فقط لتنظيم مواعيدك الطبية وسجل العلاجات الخاص بك بالعيادة. لا يتم مشاركة هذه البيانات نهائياً مع أي جهة خارجية أو أطراف ثالثة.',
      contentEn: 'Your medical data and personal profile are used solely to schedule your appointments and maintain your treatment history at the clinic. This data is never shared with any external parties or third parties.'
    },
    {
      icon: FileText,
      titleAr: '4. سرية الروشتات والتقارير',
      titleEn: '4. Confidentiality of Prescriptions',
      contentAr: 'جميع الروشتات والتقارير والملفات الطبية المرفقة تُعامل بسرية تامة. الاطلاع عليها قاصر على الطبيب المعالج والجهات الطبية المصرح لها داخل العيادة فقط.',
      contentEn: 'All prescriptions, reports, and attached medical files are treated with absolute confidentiality. Access is strictly limited to your treating physician and authorized clinical staff.'
    },
    {
      icon: UserCheck,
      titleAr: '5. حقوقك على بياناتك',
      titleEn: '5. Your Rights Over Your Data',
      contentAr: 'لديك الحق الكامل في مراجعة بياناتك المخزنة لدينا، أو تحديثها، أو تعديلها من خلال حسابك الشخصي. كما يمكنك التواصل معنا لطلب حذف حسابك وسجلك الرقمي.',
      contentEn: 'You have full rights to review, update, or edit your personal data stored with us through your profile. You may also contact us to request the deletion of your account and digital records.'
    },
    {
      icon: AlertTriangle,
      titleAr: '6. التحديثات والتغييرات',
      titleEn: '6. Policy Updates & Changes',
      contentAr: 'قد نقوم بتحديث سياسة الخصوصية هذه من حين لآخر لمواكبة التغييرات التنظيمية أو التقنية. سيتم نشر أي تحديثات على هذه الصفحة مباشرة.',
      contentEn: 'We may update this privacy policy from time to time to keep pace with regulatory or technical changes. Any updates will be published directly on this page.'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050e1a] pt-24 text-white">
        
        {/* Glow background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[130px]" />
        </div>

        <Section className="relative z-10">
          <SectionHeader 
            title={isAr ? 'سياسة الخصوصية' : 'Privacy Policy'} 
            subtitle={isAr ? 'التزامنا بحماية بياناتك الشخصية وسريتها الطبية' : 'Our commitment to protecting your personal data and medical confidentiality'} 
          />

          <div className="mx-auto max-w-4xl mt-12 space-y-6">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn("bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-md", isAr ? "text-right" : "text-left")}
            >
              <h2 className="text-xl sm:text-2xl font-black mb-4">
                {isAr ? 'تمهيد سياسة الخصوصية' : 'Privacy Policy Introduction'}
              </h2>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                {isAr 
                  ? 'أهلاً بك في منصة العيادة الإلكترونية للأستاذ الدكتور أحمد عبد اللطيف. نحن نقدر ثقتك الكبيرة بنا ونأخذ حماية خصوصيتك وسرية بياناتك بمحمل الجد التام. تحدد هذه السياسة كيفية جمع البيانات التي تقدمها وتخزينها واستخدامها وحمايتها لتجربة حجز وعلاج آمنة وسهلة.' 
                  : 'Welcome to the electronic clinic platform of Prof. Dr. Ahmed Abdellatif. We value your trust and take the security of your privacy and personal data extremely seriously. This policy sets out how we collect, store, use, and protect the data you provide to ensure a safe and seamless booking and treatment experience.'}
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
                  ? 'آخر تحديث لسياسة الخصوصية: مايو ٢٠٢٦' 
                  : 'Last updated: May 2026'}
              </p>
              <p className="mt-1">
                {isAr 
                  ? 'إذا كان لديك أي استفسار حول الخصوصية، يرجى مراسلتنا على: privacy@drahmedabdellatif.com' 
                  : 'If you have any questions regarding privacy, please email us at: privacy@drahmedabdellatif.com'}
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
