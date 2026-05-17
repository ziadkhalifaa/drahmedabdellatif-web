'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, Button } from '@/components/ui';
import { Navbar } from '@/components/layout/navbar';
import { api } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Link } from '@/i18n/routing';
import { Video, Shield, PhoneOff, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VideoRoomPage() {
  const { meetingId } = useParams();
  const t = useTranslations('dashboard.video');
  const [mounted, setMounted] = useState(false);
  const { user, token, isLoading } = useAuth();
  const [meetingUrl, setMeetingUrl] = useState<string>(`https://meet.jit.si/${meetingId}`);

  useEffect(() => {
    setMounted(true);
    
    if (token) {
      api.get<{meetingUrl: string, patient: any}>(`/appointments/by-meeting/${meetingId}`, token)
        .then(appt => {
          if (appt.meetingUrl) setMeetingUrl(appt.meetingUrl);
        })
        .catch(console.error);
    }
  }, [meetingId, token]);

  if (!mounted) return null;

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
          
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl gap-2 bg-transparent">
               <PhoneOff size={18} className="text-red-500" />
               {t('leaveRoom')}
            </Button>
          </Link>
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
