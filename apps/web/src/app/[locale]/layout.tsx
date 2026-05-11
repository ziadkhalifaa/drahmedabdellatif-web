import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/providers';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { EditorToolbar } from '@/components/editor/editable-components';
import { api } from '@/lib/api';


import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Dr. Ahmed Abdellatif - Consultant Urologist',
  description: 'Consultant of Urology, Kidney Surgery, Endoscopy, Andrology, and Sexual Health in Beni Suef, Egypt.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Fetch settings on server to avoid flash of original content
  const settings = await api.get<any[]>('/settings').catch(() => []);
  const initialSettings: Record<string, any> = {};
  if (Array.isArray(settings)) {
    settings.forEach((s: any) => {
      initialSettings[s.key] = s.value;
    });
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] font-sans antialiased">
        <Providers messages={messages} locale={locale} initialSettings={initialSettings}>
          <AnalyticsTracker />
          <EditorToolbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}


