'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { Section, Button, Card } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CheckCircle2, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params?.locale as string || 'ar';
  const isRTL = locale === 'ar';
  
  const id = searchParams.get('id');

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[#070b19] text-white flex items-center relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <Section className="w-full">
          <div className="max-w-xl mx-auto text-center space-y-8">
            {/* Success Icon Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-125 animate-pulse" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/30">
                  <CheckCircle2 size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                {isRTL ? 'تم استلام طلب الحجز بنجاح!' : 'Booking Request Received!'}
              </h1>
              <p className="text-white/60 text-base max-w-md mx-auto leading-relaxed">
                {isRTL 
                  ? 'نشكرك على ثقتك بنا. تم استلام طلب الحجز الخاص بك بنجاح ووصل لعيادتنا لتأكيده.' 
                  : 'Thank you for your trust. Your booking request has been received and is being verified by our clinic.'}
              </p>
            </div>

            {/* Booking Details Card */}
            <Card className="bg-white/5 border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-4 text-start">
              {id && (
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm text-white/40">{isRTL ? 'رقم الطلب (ID):' : 'Order ID:'}</span>
                  <span className="font-mono text-sm font-bold text-primary select-all">{id}</span>
                </div>
              )}
              
              <div className="space-y-3 text-sm text-white/80">
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  {isRTL 
                    ? 'سيتم مراجعة إثبات الدفع والبيانات في غضون دقائق قليلة.' 
                    : 'We will review the payment proof and details within a few minutes.'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  {isRTL 
                    ? 'ستصلك رسالة تأكيد رسمية وموعد اللقاء على رقم الواتساب الخاص بك.' 
                    : 'A formal WhatsApp confirmation with all details will be sent to your phone.'}
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-xl font-bold bg-white/10 hover:bg-white/15 border-white/10 gap-2 px-6 h-12">
                  {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                  {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>
              </Link>
              <a 
                href="https://wa.me/201032238095" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto rounded-xl font-bold bg-emerald-600 hover:bg-emerald-750 gap-2 shadow-lg shadow-emerald-600/20 px-6 h-12">
                  <MessageCircle size={18} />
                  {isRTL ? 'تواصل معنا واتساب' : 'Contact WhatsApp'}
                </Button>
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
