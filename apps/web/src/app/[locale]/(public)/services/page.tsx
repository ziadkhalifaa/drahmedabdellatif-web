import { Metadata } from 'next';
import { api } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';
import { ServicesContent } from './services-content';
import { getMessages } from 'next-intl/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/services`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages: any = await getMessages({ locale });
  const t = messages.services;

  return {
    title: `${t.title} | Dr. Ahmed Abdellatif`,
    description: t.subtitle,
    openGraph: {
      title: t.title,
      description: t.subtitle,
      type: 'website',
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const services = await getServices();

  return <ServicesContent services={services} locale={locale} />;
}
