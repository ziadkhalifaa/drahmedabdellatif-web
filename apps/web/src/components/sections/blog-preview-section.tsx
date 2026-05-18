'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section, SectionHeader, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { api, getMediaUrl } from '@/lib/api';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import type { BlogPost } from '@dr-ahmed/shared';
import useSWR from 'swr';

export function BlogPreviewSection() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const { data: postsData } = useSWR<BlogPost[]>('/blog/published', api.get);
  const posts = postsData || [];

  return (
    <Section id="blog">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      {posts.length === 0 ? (
        <p className="text-center text-[var(--muted)]">{t('noPosts')}</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, i) => {
              const title = locale === 'ar' ? post.titleAr : post.titleEn;
              const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;
              const slug = locale === 'ar' ? post.slugAr : post.slugEn;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card hover className="h-full flex flex-col group overflow-hidden">
                    <div className="aspect-video bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                      {post.featuredImage ? (
                        <img 
                          src={getMediaUrl(post.featuredImage)} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt={title} 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-500">
                          <FileText size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Calendar size={14} />
                        {new Date(post.createdAt).toLocaleDateString(locale)}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors">{title}</h3>
                      {excerpt && (
                        <p className="mt-2 flex-1 text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">{excerpt}</p>
                      )}
                      <Link href={`/blog/${slug}`} className="mt-4">
                        <Button variant="ghost" size="sm" className="gap-1 p-0 font-bold text-[var(--primary)] hover:bg-transparent">
                          {t('readMore')} <ArrowRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <Link href="/blog">
              <Button size="lg" className="rounded-full px-12 py-6 text-lg font-bold shadow-lg shadow-[var(--primary)]/20 transition-all hover:-translate-y-1">
                {t('viewAll') || 'View All Articles'}
              </Button>
            </Link>
          </div>
        </>
      )}
    </Section>
  );
}
