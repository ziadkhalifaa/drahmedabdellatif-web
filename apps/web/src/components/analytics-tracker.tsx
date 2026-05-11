'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await api.post('/analytics/track', {
          type: 'page_view',
          payload: {
            url: window.location.href,
            pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          },
        });
      } catch (e) {
        // Silently fail to not interrupt user experience
      }
    };

    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
