import { Metadata } from 'next';
import { api } from '@/lib/api';
import { TechniquesContent } from './techniques-content';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function getTechniques(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/techniques`, { cache: 'no-store' });
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
  const title = locale === 'ar' ? 'أحدث التقنيات الطبية' : 'Latest Medical Techniques';
  const description = locale === 'ar' 
    ? 'تعرف على أحدث التقنيات العالمية في جراحة المسالك البولية والمناظير والليزر (هوليب، ريزوم) مع الدكتور أحمد عبد اللطيف.'
    : 'Learn about the latest global techniques in urology surgery, endoscopy, and laser (HOLEP, Rezum) with Dr. Ahmed Abdellatif.';

  return {
    title: `${title} | Dr. Ahmed Abdellatif`,
    description: description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function TechniquesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const techniques = await getTechniques();

  return <TechniquesContent techniques={techniques} locale={locale} />;
}
