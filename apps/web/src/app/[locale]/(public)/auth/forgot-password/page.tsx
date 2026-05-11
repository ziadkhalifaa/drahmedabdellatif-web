'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, Button, Input } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success(locale === 'ar' ? 'تم إرسال كود التحقق' : 'Reset code sent to your email');
      setStep('code');
    } catch (err: any) {
      toast.error(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'code') {
      setStep('reset');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code, newPassword });
      toast.success(locale === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password reset successfully!');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4">
          <Card className="p-8 shadow-2xl border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]" />
            
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
                <KeyRound size={32} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {locale === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password'}
              </h1>
              <p className="text-[var(--muted)] mt-2 text-sm">
                {step === 'email' && (locale === 'ar' ? 'أدخل بريدك الإلكتروني لإرسال كود التحقق' : 'Enter your email to receive a reset code')}
                {step === 'code' && (locale === 'ar' ? 'أدخل الكود المرسل لبريدك الإلكتروني' : 'Enter the code sent to your email')}
                {step === 'reset' && (locale === 'ar' ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password')}
              </p>
            </div>

            {step === 'email' && (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] ml-1">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                    <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" className="pl-12 py-6 rounded-xl" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] gap-2">
                  {loading ? '...' : (locale === 'ar' ? 'إرسال الكود' : 'Send Reset Code')} <ArrowRight size={20} />
                </Button>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={handleVerifyAndReset} className="space-y-5">
                <div className="flex justify-center">
                  <Input maxLength={6} required value={code} onChange={(e) => setCode(e.target.value)} className="text-center text-3xl font-black py-8 tracking-[0.5em] rounded-2xl max-w-[240px]" placeholder="000000" />
                </div>
                <Button type="submit" className="w-full py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]">
                  {locale === 'ar' ? 'تأكيد الكود' : 'Verify Code'}
                </Button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleVerifyAndReset} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] ml-1">
                    {locale === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                    <Input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="pl-12 py-6 rounded-xl" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] gap-2">
                  {loading ? '...' : (locale === 'ar' ? 'تغيير كلمة المرور' : 'Reset Password')} <ArrowRight size={20} />
                </Button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <Link href="/auth/login" className="text-[var(--primary)] font-bold hover:underline inline-flex items-center gap-1 text-sm">
                <ArrowLeft size={14} /> {locale === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
              </Link>
            </div>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
