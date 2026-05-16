'use client';

import { CustomThemeProvider } from './theme-provider';
import { NextIntlClientProvider } from 'next-intl';

import { EditorProvider } from '@/context/editor-context';
import { AuthProvider } from '@/context/auth-context';

import { Toaster } from 'sonner';
import { ErrorBoundary } from './error-boundary';

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
    <ErrorBoundary>
      <CustomThemeProvider>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Africa/Cairo">
          <EditorProvider initialSettings={initialSettings}>
            <AuthProvider>
              {children}
              <Toaster position="top-center" richColors />
            </AuthProvider>
          </EditorProvider>
        </NextIntlClientProvider>
      </CustomThemeProvider>
    </ErrorBoundary>
  );
}


