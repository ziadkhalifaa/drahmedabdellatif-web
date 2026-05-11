'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section, SectionHeader, Input, Textarea, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" className="bg-[var(--card)]/50">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Address</p>
              <p className="text-sm text-[var(--muted)]">{t('address')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Phone size={24} />
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Phone</p>
              <p className="text-sm text-[var(--muted)]">{t('phone')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Mail size={24} />
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Email</p>
              <p className="text-sm text-[var(--muted)]">{t('email')}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <Input
            id="contact-name"
            label={t('form.name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            id="contact-email"
            label={t('form.email')}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            id="contact-phone"
            label={t('form.phone')}
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <Textarea
            id="contact-message"
            label={t('form.message')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <Button type="submit" disabled={status === 'loading'} className="gap-2 w-full">
            <Send size={16} />
            {status === 'loading' ? '...' : t('form.submit')}
          </Button>
          {status === 'success' && <p className="text-sm text-green-600">{t('form.success')}</p>}
          {status === 'error' && <p className="text-sm text-red-500">Something went wrong.</p>}
        </motion.form>
      </div>
    </Section>
  );
}
