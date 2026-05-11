'use client';

import React, { useState, useEffect } from 'react';
import { api, getMediaUrl } from '@/lib/api';
import { Button } from '@/components/ui';
import { X, Check } from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      api.get<any[]>('/media/all', token || undefined)
        .then(setItems)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0f172a] w-full max-w-4xl max-h-[80vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/10">
        <div className="p-8 border-b flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
          <div>
            <h3 className="text-2xl font-black text-[#072a44] dark:text-white uppercase tracking-tight">Media Library</h3>
            <p className="text-sm text-gray-500">Select an image for your content.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-12 w-12"><X /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="h-64 flex items-center justify-center font-bold text-blue-500 animate-pulse">Loading library...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { onSelect(item.url); onClose(); }}
                  className="aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 hover:scale-95 transition-all shadow-md group relative"
                >
                  <img src={getMediaUrl(item.url)} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Check className="text-white" size={32} />
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="col-span-full py-20 text-center text-[var(--muted)]">
                  No media files found. Upload some first.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
