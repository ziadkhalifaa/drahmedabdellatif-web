'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { Card } from '@/components/ui';
import { api, getMediaUrl } from '@/lib/api';
import type { BlogPost } from '@dr-ahmed/shared';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { useLocale, useTranslations } from 'next-intl';

export default function BlogArticlePage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('blog');
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    api.get<BlogPost>(`/blog/${slug}`).then(setPost).catch(() => {});
  }, [slug]);

  if (!post) return <div className="flex min-h-screen items-center justify-center"><p className="text-[var(--muted)]">Loading...</p></div>;

  const title = locale === 'ar' ? post.titleAr : post.titleEn;
  const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;
  const content = locale === 'ar' ? post.contentAr : post.contentEn;
  const categoryName = post.category ? (locale === 'ar' ? post.category.nameAr : post.category.nameEn) : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Link href="/#blog" className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:underline">
            <ArrowLeft size={14} className={locale === 'ar' ? 'rotate-180' : ''} /> {t('backToBlog') || 'Back to Blog'}
          </Link>

          <h1 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">{title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString(locale)}</span>
            {categoryName && <span>{categoryName}</span>}
          </div>

          {post.featuredImage && (
            <div className="mt-8 aspect-video rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-white/10 shadow-2xl">
              <img src={getMediaUrl(post.featuredImage)} className="w-full h-full object-cover" alt={title} />
            </div>
          )}

          {excerpt && (
            <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">{excerpt}</p>
          )}

          <div className="mt-8">
            <Card className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Card>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
