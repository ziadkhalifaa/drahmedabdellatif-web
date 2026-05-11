'use client';

import { AdminProvider, useAuth } from '@/components/layout/admin-layout';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';


function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin');
  const { token, user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname.includes('/login');

  useEffect(() => {
    if (!token && !isLoginPage) {
      router.push('/admin/login');
    } else if (token && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [token, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!token) {
    return null;
  }


  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#020617]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Administrator Console</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Future: Notifications, Search, Profile */}
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
