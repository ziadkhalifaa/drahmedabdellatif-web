'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Card, Button, Input, Textarea } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { WHATSAPP_NUMBER, CLINIC_PHONE, CLINIC_EMAIL } from '@dr-ahmed/shared';
import { Phone, Mail, MapPin, Clock, SendHorizontal } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const contactInfo = [
    { icon: Phone, label: t('info.phone'), value: CLINIC_PHONE, href: `tel:${CLINIC_PHONE}` },
    { icon: Mail, label: t('info.email'), value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}` },
    { icon: MapPin, label: t('info.beniSuef'), value: t('info.beniSuefAddress'), href: '#' },
    { icon: MapPin, label: t('info.october'), value: t('info.octoberAddress'), href: '#' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success(t('form.successMessage') || 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Section className="bg-gradient-to-b from-[var(--primary)]/5 to-transparent">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
          
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 space-y-6 shadow-xl border-[var(--border)]">
                <h3 className="text-2xl font-bold text-[var(--foreground)]">{t('form.title')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--muted)]">{t('form.name')}</label>
                      <Input placeholder={t('form.namePlaceholder')} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="bg-[var(--background)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--muted)]">{t('form.phone')}</label>
                      <Input placeholder={t('form.phonePlaceholder')} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required className="bg-[var(--background)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--muted)]">{t('form.email')}</label>
                    <Input type="email" placeholder={t('form.emailPlaceholder')} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="bg-[var(--background)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--muted)]">{t('form.message')}</label>
                    <Textarea placeholder={t('form.messagePlaceholder')} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required className="min-h-[150px] bg-[var(--background)]" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gap-2 py-6 text-lg font-bold rounded-xl shadow-lg shadow-[var(--primary)]/20">
                    <SendHorizontal size={18} />
                    {loading ? '...' : t('form.submit')}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {contactInfo.map((info) => (
                  <Card key={info.label} className="p-6 flex items-start gap-4 hover:border-[var(--primary)] transition-all">
                    <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{info.label}</p>
                      {info.href !== '#' ? (
                        <a href={info.href} className="text-sm font-bold text-[var(--foreground)] hover:text-[var(--primary)]">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-[var(--foreground)]">{info.value}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 space-y-4 bg-gradient-to-br from-[var(--primary)]/5 to-transparent border-dashed">
                <div className="flex items-center gap-3 text-[var(--primary)]">
                  <Clock size={20} />
                  <h4 className="font-bold">{t('hours.title')}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                    <span className="text-[var(--muted)]">{t('hours.beniSuef')}</span>
                    <span className="font-semibold">{t('hours.beniSuefHours')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                    <span className="text-[var(--muted)]">{t('hours.october')}</span>
                    <span className="font-semibold">{t('hours.octoberHours')}</span>
                  </div>
                </div>
              </Card>

              {/* Google Maps */}
              <div className="aspect-video rounded-3xl overflow-hidden border border-[var(--border)] shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.5!2d31.0919!3d29.0744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDA0JzI4LjAiTiAzMcKwMDUnMzAuOCJF!5e0!3m2!1sar!2seg!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location - Beni Suef"
                />
              </div>
            </motion.div>
          </div>
        </Section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
