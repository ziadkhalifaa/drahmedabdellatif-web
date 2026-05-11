'use client';

import { useAuth } from '@/components/layout/admin-layout';
import AdminDashboardPage from './dashboard/page';

export default function AdminPage() {
  const { token } = useAuth();
  if (!token) return null;
  return <AdminDashboardPage />;
}
