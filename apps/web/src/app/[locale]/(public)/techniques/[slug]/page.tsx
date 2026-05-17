import { Metadata } from 'next';
import { TechniqueDetailContent } from './technique-detail-content';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function getTechnique(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/techniques/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const technique = await getTechnique(slug);

  if (!technique) {
    return {
      title: 'Technique Not Found',
    };
  }

  const title = locale === 'ar' ? (technique.metaTitleAr || technique.titleAr) : (technique.metaTitleEn || technique.titleEn);
  const description = locale === 'ar' ? (technique.metaDescriptionAr || technique.descriptionAr) : (technique.metaDescriptionEn || technique.descriptionEn);
  const image = technique.image ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${technique.image}` : undefined;

  return {
    title: `${title} | Dr. Ahmed Abdellatif`,
    description: description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function TechniqueDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const technique = await getTechnique(slug);

  return <TechniqueDetailContent technique={technique} locale={locale} slug={slug} />;
}
