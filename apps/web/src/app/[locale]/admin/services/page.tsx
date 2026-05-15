'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Input, Textarea } from '@/components/ui';
import { useAuth } from '@/components/layout/admin-layout';
import { api, getMediaUrl } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';

import { Plus, Edit2, Trash2, Package, Globe, Layout, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminServicesPage() {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ 
    titleAr: '', titleEn: '', 
    descriptionAr: '', descriptionEn: '', 
    icon: 'Stethoscope', image: '', order: 0, isActive: true,
    metaTitleAr: '', metaTitleEn: '',
    metaDescriptionAr: '', metaDescriptionEn: ''
  });


  const fetchServices = () => {
    if (token) api.get<Service[]>('/services/all', token).then(setServices).catch(() => {});
  };

  useEffect(() => { fetchServices(); }, [token]);

  const handleSave = async () => {
    if (!token) return;
    if (editing) {
      await api.patch(`/services/${editing.id}`, form, token);
    } else {
      await api.post('/services', form, token);
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    fetchServices();
  };

  const resetForm = () => {
    setForm({ 
      titleAr: '', titleEn: '', 
      descriptionAr: '', descriptionEn: '', 
      icon: 'Stethoscope', image: '', order: 0, isActive: true,
      metaTitleAr: '', metaTitleEn: '',
      metaDescriptionAr: '', metaDescriptionEn: ''
    });
  };


  const handleDelete = async (id: string) => {
    if (!token) return;
    if (confirm('Delete this service?')) {
      await api.delete(`/services/${id}`, token);
      fetchServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setForm({
      titleAr: service.titleAr,
      titleEn: service.titleEn,
      descriptionAr: service.descriptionAr,
      descriptionEn: service.descriptionEn,
      icon: service.icon,
      image: service.image || '',
      order: service.order,
      isActive: service.isActive,
      metaTitleAr: service.metaTitleAr || '',
      metaTitleEn: service.metaTitleEn || '',
      metaDescriptionAr: service.metaDescriptionAr || '',
      metaDescriptionEn: service.metaDescriptionEn || ''
    });
    setShowForm(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Medical Services</h1>
          <p className="text-sm text-[var(--muted)]">Manage clinical departments and services offered.</p>
        </div>
        <Button onClick={() => { setEditing(null); resetForm(); setShowForm(true); }} className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
          <Plus size={16} /> New Service
        </Button>
      </div>

      {showForm && (
        <Card className="p-8 border-2 border-[var(--primary)]/20 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                <Layout size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{editing ? 'Edit Service' : 'Add New Service'}</h3>
                <p className="text-xs text-[var(--muted)]">Fill in the details for the medical service.</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    <Globe size={14} /> Arabic Content
                  </div>
                  <Input label="Service Title (Arabic)" placeholder="اسم الخدمة باللغة العربية" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} />
                  <Textarea label="Service Description (Arabic)" placeholder="وصف الخدمة باللغة العربية..." rows={3} value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} />
                  
                  <div className="pt-2 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-tighter text-primary/60">Search Engine Optimization (AR)</p>
                    <Input label="Meta Title (Arabic)" placeholder="عنوان البحث" value={form.metaTitleAr} onChange={(e) => setForm({ ...form, metaTitleAr: e.target.value })} />
                    <Textarea label="Meta Description (Arabic)" placeholder="وصف البحث المختصر" rows={2} value={form.metaDescriptionAr} onChange={(e) => setForm({ ...form, metaDescriptionAr: e.target.value })} />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    <Globe size={14} /> English Content
                  </div>
                  <Input label="Service Title (English)" placeholder="Service name in English" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
                  <Textarea label="Service Description (English)" placeholder="Service description in English..." rows={3} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
                  
                  <div className="pt-2 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-tighter text-primary/60">Search Engine Optimization (EN)</p>
                    <Input label="Meta Title (English)" placeholder="Search Title" value={form.metaTitleEn} onChange={(e) => setForm({ ...form, metaTitleEn: e.target.value })} />
                    <Textarea label="Meta Description (English)" placeholder="Short search description" rows={2} value={form.metaDescriptionEn} onChange={(e) => setForm({ ...form, metaDescriptionEn: e.target.value })} />
                  </div>
               </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-4 border-t pt-6">
              <Input label="Lucide Icon Name" placeholder="e.g., Stethoscope, Heart" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              <Input label="Service Image URL" placeholder="e.g., doctor.webp" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <Input label="Display Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />

              <div className="flex items-end pb-2">
                <Button 
                  variant="outline" 
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  className={cn(
                    "w-full gap-2",
                    form.isActive ? "border-emerald-500 text-emerald-600" : "border-red-500 text-red-600"
                  )}
                >
                  {form.isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {form.isActive ? 'Active Status' : 'Inactive Status'}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
              <Button onClick={handleSave} className="px-8">{editing ? 'Save Changes' : 'Create Service'}</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="p-0 overflow-hidden group hover:border-[var(--primary)] transition-all">
            {service.image && (
              <div className="aspect-video w-full overflow-hidden border-b">
                <img src={getMediaUrl(service.image)} alt={service.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/5 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                  <Package size={24} />
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(service)} className="h-8 w-8 p-0"><Edit2 size={14} /></Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-50" onClick={() => handleDelete(service.id)}><Trash2 size={14} /></Button>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-[var(--foreground)]">{service.titleAr}</h3>
                <h3 className="text-xs font-medium text-[var(--muted)]">{service.titleEn}</h3>
              </div>
              <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed mb-6 italic">
                {service.descriptionEn}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                   <span className={cn(
                     "w-2 h-2 rounded-full",
                     service.isActive ? "bg-emerald-500" : "bg-red-500"
                   )} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                     {service.isActive ? 'Active' : 'Inactive'}
                   </span>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">ORDER: {service.order}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

