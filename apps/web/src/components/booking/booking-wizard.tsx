'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Video,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';

type BookingStep = 'type' | 'date' | 'info' | 'success';

export function BookingWizard() {
  const t = useTranslations('booking');
  const [step, setStep] = useState<BookingStep>('type');
  const [bookingType, setBookingType] = useState<'IN_CLINIC' | 'ONLINE' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState({ name: '', phone: '', email: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
      await api.post('/appointments', {
        type: bookingType,
        date: selectedDate,
        timeSlot: selectedTime,
        guestName: patientInfo.name || undefined,
        guestPhone: patientInfo.phone || undefined,
        guestEmail: patientInfo.email || undefined,
        notes: patientInfo.notes || undefined,
        patientId: user?.id || undefined,
      }, token || undefined);
      toast.success('Appointment booked successfully!');
      setStep('success');
    } catch (err: any) {
      toast.error(err.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 'type') setStep('date');
    else if (step === 'date') setStep('info');
  };

  const prevStep = () => {
    if (step === 'date') setStep('type');
    else if (step === 'info') setStep('date');
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Stepper Progress */}
      <div className="mb-12 flex items-center justify-between px-10">
        {(['type', 'date', 'info', 'success'] as BookingStep[]).map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className={cn(
              "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border-2 font-bold transition-all duration-500",
              step === s ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-xl shadow-[var(--primary)]/30 scale-110" :
                i < ['type', 'date', 'info', 'success'].indexOf(step) ? "bg-green-500 text-white border-green-500" :
                  "bg-[var(--card)] border-[var(--border)] text-[var(--muted)]"
            )}>
              {i < ['type', 'date', 'info', 'success'].indexOf(step) ? <CheckCircle size={24} /> : i + 1}
            </div>
            {i < 3 && (
              <div className={cn(
                "h-1 flex-1 transition-all duration-700 mx-2 rounded-full",
                i < ['type', 'date', 'info', 'success'].indexOf(step) ? "bg-green-500" : "bg-[var(--border)]"
              )} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'type' && (
            <div className="grid gap-6 md:grid-cols-2">
              <TypeCard
                active={bookingType === 'IN_CLINIC'}
                onClick={() => { setBookingType('IN_CLINIC'); nextStep(); }}
                icon={<MapPin size={40} />}
                title={t('wizard.clinicVisit')}
                subtitle={t('wizard.clinicVisitDesc')}
                selectText={t('wizard.selectOption')}
              />
              <TypeCard
                active={bookingType === 'ONLINE'}
                onClick={() => { setBookingType('ONLINE'); nextStep(); }}
                icon={<Video size={40} />}
                title={t('wizard.onlineConsultation')}
                subtitle={t('wizard.onlineConsultationDesc')}
                selectText={t('wizard.selectOption')}
              />
            </div>
          )}

          {step === 'date' && (
            <Card className="p-8 border-[var(--border)] shadow-2xl">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="text-[var(--primary)]" />
                    {t('wizard.selectDate')}
                  </h3>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="py-8 text-lg font-bold rounded-2xl focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-sm text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20">
                    <CalendarCheck size={16} className="inline mr-2" />
                    {t('wizard.doctorAvailable')}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="text-[var(--primary)]" />
                    {t('wizard.selectSlot')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={cn(
                          "py-4 rounded-xl border-2 font-bold transition-all",
                          selectedTime === slot
                            ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg"
                            : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4 border-t border-[var(--border)] pt-8">
                <Button variant="outline" onClick={prevStep} className="py-7 px-8 rounded-2xl font-bold">
                  <ChevronLeft className="mr-2" /> {t('wizard.back')}
                </Button>
                <Button
                  disabled={!selectedDate || !selectedTime}
                  onClick={nextStep}
                  className="flex-1 py-7 text-xl font-bold rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
                >
                  {t('wizard.continueToDetails')} <ChevronRight className="ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {step === 'info' && (
            <Card className="p-8 border-[var(--border)] shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <User className="text-[var(--primary)]" />
                {t('wizard.patientInfo')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder={t('wizard.fullName')} value={patientInfo.name} onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })} className="py-6 rounded-xl" />
                <Input placeholder={t('wizard.phoneNumber')} value={patientInfo.phone} onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })} className="py-6 rounded-xl" />
                <Input placeholder={t('wizard.emailAddress')} type="email" value={patientInfo.email} onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })} className="py-6 rounded-xl md:col-span-2" />
                <textarea
                  placeholder={t('wizard.notesPlaceholder')}
                  value={patientInfo.notes}
                  onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })}
                  className="w-full h-32 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 outline-none focus:border-[var(--primary)] md:col-span-2"
                />
              </div>

              <div className="mt-10 flex gap-4 border-t border-[var(--border)] pt-8">
                <Button variant="outline" onClick={prevStep} className="py-7 px-8 rounded-2xl font-bold">
                  {t('wizard.back')}
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={submitting || !patientInfo.name || !patientInfo.phone}
                  className="flex-1 py-7 text-xl font-bold rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
                >
                  {submitting ? t('wizard.booking') : t('wizard.confirmAppointment')}
                </Button>
              </div>
            </Card>
          )}

          {step === 'success' && (
            <Card className="p-12 text-center border-[var(--border)] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="mx-auto h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-4xl font-black text-green-600 mb-4">{t('wizard.successTitle')}</h3>
                <p className="text-xl text-[var(--muted)] mb-8">
                  {bookingType === 'ONLINE' ? t('wizard.successOnline') : t('wizard.successClinic')}
                </p>
                <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] inline-block text-left mb-8 shadow-inner">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="text-[var(--primary)]" size={18} />
                    <span className="font-bold">{selectedDate} at {selectedTime}</span>
                  </div>
                  {bookingType === 'ONLINE' && (
                    <div className="flex items-center gap-3 text-sm text-[var(--primary)] font-bold">
                      <Video size={18} />
                      <span>{t('wizard.meetingLinkSent')}</span>
                    </div>
                  )}
                </div>
                <div className="block">
                  <Button className="py-7 px-12 rounded-2xl font-bold text-lg" variant="outline" onClick={() => window.location.href = '/'}>
                    {t('wizard.returnHome')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TypeCard({ active, onClick, icon, title, subtitle }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 text-left overflow-hidden",
        active
          ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/30"
          : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]"
      )}
    >
      <div className={cn(
        "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500",
        active ? "bg-white/20 text-white rotate-6" : "bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white"
      )}>
        {icon}
      </div>
      <h4 className="text-2xl font-black mb-3">{title}</h4>
      <p className={cn("text-sm leading-relaxed font-medium", active ? "text-white/80" : "text-[var(--muted)]")}>
        {subtitle}
      </p>

      {!active && (
        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
          Select this option <ChevronRight size={14} />
        </div>
      )}
    </button>
  );
}
