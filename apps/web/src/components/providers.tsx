'use client';

import { CustomThemeProvider } from './theme-provider';
import { NextIntlClientProvider } from 'next-intl';

import { EditorProvider } from '@/context/editor-context';

import { Toaster } from 'sonner';

export function Providers({ 
  children, 
  messages, 
  locale,
  initialSettings
}: { 
  children: React.ReactNode;
  messages: any;
  locale: string;
  initialSettings?: any;
}) {
  return (
    <CustomThemeProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <EditorProvider initialSettings={initialSettings}>
          {children}
          <Toaster position="top-center" richColors />
        </EditorProvider>
      </NextIntlClientProvider>
    </CustomThemeProvider>
  );
}


