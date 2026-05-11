'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/components/layout/admin-layout';
import { api } from '@/lib/api';
import type { Testimonial } from '@dr-ahmed/shared';
import { Check, X, Trash2 } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = () => {
    if (token) api.get<Testimonial[]>('/testimonials/all', token).then(setTestimonials).catch(() => {});
  };

  useEffect(() => { fetchTestimonials(); }, [token]);

  const approve = async (id: string) => {
    if (!token) return;
    await api.patch(`/testimonials/${id}/approve`, {}, token);
    fetchTestimonials();
  };

  const toggleVisibility = async (item: Testimonial) => {
    if (!token) return;
    await api.patch(`/testimonials/${item.id}`, { isVisible: !item.isVisible }, token);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (confirm('Delete this testimonial?')) {
      await api.delete(`/testimonials/${id}`, token);
      fetchTestimonials();
    }
  };

  return (
    <>
      <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">Testimonials</h2>
      <Card>
        <div className="space-y-4">
          {testimonials.map((item) => (
            <div key={item.id} className="flex items-start justify-between border-b border-[var(--border)] pb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--foreground)]">{item.patientName}</span>
                  <span className="text-xs text-[var(--muted)]">{'★'.repeat(item.rating)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    item.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{item.isApproved ? 'Approved' : 'Pending'}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    item.isVisible ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>{item.isVisible ? 'Visible' : 'Hidden'}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.content}</p>
              </div>
              <div className="flex gap-2 ml-4">
                {!item.isApproved && (
                  <Button size="sm" variant="ghost" onClick={() => approve(item.id)} className="text-green-600"><Check size={16} /></Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => toggleVisibility(item)}>
                  {item.isVisible ? <X size={16} /> : <Check size={16} />}
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && <p className="text-center text-[var(--muted)] py-8">No testimonials</p>}
        </div>
      </Card>
    </>
  );
}
