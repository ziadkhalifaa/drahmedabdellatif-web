'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Input, Textarea, Button } from '@/components/ui';
import { api } from '@/lib/api';
import { Calendar } from 'lucide-react';
import { TIME_SLOTS } from '@dr-ahmed/shared';

export function BookingForm() {
  const t = useTranslations('booking.form');
  const [form, setForm] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    date: '',
    timeSlot: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'conflict'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/appointments', form);
      setStatus('success');
      setForm({ patientName: '', patientPhone: '', patientEmail: '', date: '', timeSlot: '', notes: '' });
    } catch (err: any) {
      if (err.message?.includes('already booked')) setStatus('conflict');
      else setStatus('error');
    }
  };

  return (
    <motion.div
      id="booking-form"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg"
    >
      <h3 className="mb-6 text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
        <Calendar size={24} className="text-[var(--primary)]" />
        {t('submit')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="patientName" label={t('name')} value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} required />
        <Input id="patientPhone" label={t('phone')} type="tel" value={form.patientPhone} onChange={(e) => setForm({ ...form, patientPhone: e.target.value })} required />
        <Input id="patientEmail" label={t('email')} type="email" value={form.patientEmail} onChange={(e) => setForm({ ...form, patientEmail: e.target.value })} required />
        <Input id="date" label={t('date')} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().split('T')[0]} />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--foreground)]">{t('time')}</label>
          <select
            value={form.timeSlot}
            onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <Textarea id="notes" label={t('notes')} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

        <Button type="submit" disabled={status === 'loading'} size="lg" className="w-full">
          {status === 'loading' ? '...' : t('submit')}
        </Button>

        {status === 'success' && <p className="text-sm text-green-600">{t('success')}</p>}
        {status === 'error' && <p className="text-sm text-red-500">{t('error')}</p>}
        {status === 'conflict' && <p className="text-sm text-amber-600">{t('conflict')}</p>}
      </form>
    </motion.div>
  );
}
