'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Card, Button, Input } from '@/components/ui';
import { toast } from 'sonner';
import { Clock, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkingHoursPage() {
  const t = useTranslations('admin.workingHours');
  const tCommon = useTranslations('common');
  const { token } = useAuth();
  const [hours, setHours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    if (!token) return;
    
    api.get<any[]>('/working-hours', token)
      .then(res => {
        // Sort by dayOfWeek (0 = Sunday, 6 = Saturday)
        const sorted = [...res].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
        setHours(sorted);
      })
      .catch(err => {
        toast.error('Failed to load working hours');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleUpdate = async (id: string, updates: any) => {
    if (!token) return;
    setSavingId(id);
    
    try {
      const res = await api.patch(`/working-hours/${id}`, updates, token);
      setHours(prev => prev.map(h => h.id === id ? { ...h, ...res } : h));
      toast.success(tCommon('success') || 'Updated successfully');
    } catch (err: any) {
      toast.error(err.message || tCommon('error'));
    } finally {
      setSavingId(null);
    }
  };

  const handleToggle = (id: string, isActive: boolean) => {
    handleUpdate(id, { isActive });
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-black">{t('title')}</h1>
        <div className="space-y-4">
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="p-6 h-24 animate-pulse bg-[var(--card)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Clock size={28} />
          </div>
          {t('title', { fallback: 'Working Hours Management' })}
        </h1>
        <p className="text-[var(--muted)]">{t('subtitle', { fallback: 'Configure clinic working days, times, and consultation durations.' })}</p>
      </div>

      <div className="space-y-4">
        {hours.map((hour) => (
          <Card key={hour.id} className={cn("p-6 border-[var(--border)] transition-all", !hour.isActive && "opacity-70 grayscale-[0.5]")}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left side: Day and Toggle */}
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="flex items-center gap-3 w-40">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={hour.isActive}
                      onChange={(e) => handleToggle(hour.id, e.target.checked)}
                      disabled={savingId === hour.id}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
                  </label>
                  <span className="font-bold text-lg">{daysOfWeek[hour.dayOfWeek]}</span>
                </div>
              </div>

              {/* Right side: Times and Duration */}
              <div className={cn("flex flex-wrap md:flex-nowrap items-end gap-4 w-full md:w-auto", !hour.isActive && "pointer-events-none opacity-50")}>
                <div className="flex-1 md:w-32">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">{t('startTime', { fallback: 'Start Time' })}</label>
                  <Input 
                    type="time" 
                    value={hour.startTime} 
                    onChange={(e) => setHours(prev => prev.map(h => h.id === hour.id ? { ...h, startTime: e.target.value } : h))}
                    className="font-bold text-lg"
                  />
                </div>
                <div className="flex-1 md:w-32">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">{t('endTime', { fallback: 'End Time' })}</label>
                  <Input 
                    type="time" 
                    value={hour.endTime} 
                    onChange={(e) => setHours(prev => prev.map(h => h.id === hour.id ? { ...h, endTime: e.target.value } : h))}
                    className="font-bold text-lg"
                  />
                </div>
                <div className="flex-1 md:w-32">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">{t('slotDuration', { fallback: 'Duration (min)' })}</label>
                  <Input 
                    type="number" 
                    min="10"
                    step="5"
                    value={hour.slotDuration} 
                    onChange={(e) => setHours(prev => prev.map(h => h.id === hour.id ? { ...h, slotDuration: parseInt(e.target.value) } : h))}
                    className="font-bold text-lg text-center"
                  />
                </div>
                
                <Button 
                  onClick={() => handleUpdate(hour.id, { startTime: hour.startTime, endTime: hour.endTime, slotDuration: hour.slotDuration })}
                  disabled={savingId === hour.id || !hour.isActive}
                  variant="outline"
                  className="w-full md:w-auto border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white h-12 px-6"
                >
                  <Save size={18} className="mr-2" />
                  {savingId === hour.id ? tCommon('loading', { fallback: 'Saving...' }) : tCommon('save', { fallback: 'Save' })}
                </Button>
              </div>

            </div>
            
            {!hour.isActive && (
               <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm flex items-center gap-2 font-medium">
                  <AlertCircle size={16} />
                  Clinic is closed on this day.
               </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
