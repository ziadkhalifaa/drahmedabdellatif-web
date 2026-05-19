'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, Button } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { api } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Link, useRouter } from '@/i18n/routing';
import { Video, Shield, PhoneOff, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VideoRoomPage() {
  const { meetingId } = useParams();
  const t = useTranslations('dashboard.video');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, token, isLoading } = useAuth();
  
  const [meetingUrl, setMeetingUrl] = useState<string>(`https://meet.jit.si/${meetingId}`);
  const [appointment, setAppointment] = useState<any>(null);
  const [appointmentLoading, setAppointmentLoading] = useState(true);
  const [endingSession, setEndingSession] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (token) {
      api.get<any>(`/appointments/by-meeting/${meetingId}`, token)
        .then(appt => {
          setAppointment(appt);
          if (appt.meetingUrl) setMeetingUrl(appt.meetingUrl);
          setAppointmentLoading(false);
        })
        .catch(err => {
          console.error(err);
          setAppointmentLoading(false);
        });
    }
  }, [meetingId, token]);

  // Polling effect for patients to check if doctor ended the session
  useEffect(() => {
    if (!token || !meetingId || user?.role === 'admin' || user?.role === 'editor') return;

    const interval = setInterval(() => {
      api.get<any>(`/appointments/by-meeting/${meetingId}`, token)
        .then(appt => {
          if (appt.status === 'completed') {
            clearInterval(interval);
            router.push(`/dashboard?rateAppointmentId=${appt.id}`);
          }
        })
        .catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, [meetingId, token, user, router]);

  if (!mounted) return null;

  if (appointmentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-[var(--primary)]/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (appointment?.status === 'completed' || appointment?.status === 'cancelled') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 flex items-center justify-center bg-black overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[var(--primary)]/10 rounded-full blur-[120px]" />
          </div>
          
          <Card className="max-w-md w-full p-10 bg-zinc-900/60 backdrop-blur-2xl border-white/5 rounded-[2.5rem] text-center relative z-10 shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Shield size={40} className="animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-black text-white mb-3">
              انتهت الجلسة الاستشارية
            </h2>
            
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-bold">
              شكراً لك على ثقتك بنا. لقد تم إنهاء هذه الاستشارة الطبية بنجاح من قبل الطبيب. يمكنك العودة للوحة التحكم الآن.
            </p>
            
            <Link href="/dashboard" className="block w-full">
              <Button className="w-full h-14 bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-2xl text-sm font-black shadow-lg shadow-[var(--primary)]/20 hover:-translate-y-0.5 transition-transform text-white">
                العودة إلى لوحة التحكم
              </Button>
            </Link>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="h-screen pt-20 flex flex-col bg-black overflow-hidden">
        {/* Header Bar */}
        <div className="bg-zinc-900 border-b border-white/5 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white">
                <Video size={20} />
             </div>
             <div>
                <h1 className="text-white font-bold">{t('title')}</h1>
                <p className="text-zinc-400 text-xs flex items-center gap-1">
                   <Shield size={12} className="text-green-500" />
                   {t('encrypted')}
                </p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
            {(user?.role === 'admin' || user?.role === 'editor') && (
              <Button 
                onClick={async () => {
                  if (!appointment?.id) return;
                  setEndingSession(true);
                  try {
                    await api.patch(`/appointments/${appointment.id}/status`, { status: 'completed' }, token);
                    const patientName = appointment?.patient?.name || appointment?.guestName || '';
                    const appointmentId = appointment?.id || '';
                    router.push(`/admin/patients?search=${encodeURIComponent(patientName)}&appointmentId=${appointmentId}`);
                  } catch (err: any) {
                    console.error(err);
                  } finally {
                    setEndingSession(false);
                  }
                }}
                disabled={endingSession}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl gap-2 font-bold h-11 px-4 shadow-lg shadow-red-500/10 active:scale-95 transition-all text-sm border-none"
              >
                <PhoneOff size={18} />
                {endingSession ? 'جاري الإنهاء...' : 'إنهاء الجلسة الاستشارية'}
              </Button>
            )}
            
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl gap-2 bg-transparent h-11 px-4 text-sm">
                 <PhoneOff size={18} className="text-red-500" />
                 {t('leaveRoom')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Video Area + Sidebar Wrapper */}
        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden relative">
          {/* Main Video Room */}
          <div className="flex-1 h-full relative bg-zinc-950">
            <iframe
              src={`${meetingUrl}#config.prejoinPageEnabled=false&config.disableDeepLinking=true`}
              allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; speaker"
              className="absolute inset-0 w-full h-full border-none"
              title="Video Consultation"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-1 px-4">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{t('liveRoom')}</span>
               </div>
            </div>
          </div>

          {/* Instructions Sidebar */}
          <aside className="hidden xl:flex w-80 shrink-0 bg-zinc-900 border-l border-white/5 flex-col p-6 space-y-6 overflow-y-auto h-full">
             <section className="space-y-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50">{t('patientDetails')}</h3>
                <div className="space-y-2">
                   <p className="text-white font-medium">{user?.name || '---'}</p>
                   <p className="text-zinc-500 text-xs">{user?.email || t('registeredAccount')}</p>
                </div>
             </section>

             <section className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50">{t('instructions')}</h3>
                <ul className="text-xs text-zinc-400 space-y-3">
                   <li className="flex gap-2">
                      <span className="text-[var(--primary)] font-bold">•</span>
                      {t('allowCamera')}
                   </li>
                   <li className="flex gap-2">
                      <span className="text-[var(--primary)] font-bold">•</span>
                      {t('useHeadphones')}
                   </li>
                   <li className="flex gap-2">
                      <span className="text-[var(--primary)] font-bold">•</span>
                      {t('privateConsult')}
                   </li>
                </ul>
             </section>
          </aside>
        </div>
      </main>
    </>
  );
}
