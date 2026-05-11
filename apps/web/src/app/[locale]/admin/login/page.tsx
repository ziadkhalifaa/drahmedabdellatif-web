'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/layout/admin-layout';
import { Input, Button } from '@/components/ui';
import { useRouter } from '@/i18n/routing';

export default function AdminLoginPage() {
  const t = useTranslations('admin');
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/admin');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[var(--foreground)]">{t('login')}</h1>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <Input id="email" label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input id="password" label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">{t('loginBtn')}</Button>
      </form>
    </div>
  );
}
