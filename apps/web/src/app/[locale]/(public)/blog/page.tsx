'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section, SectionHeader, Card, Button, Input } from '@/components/ui';
import { motion } from 'framer-motion';
import { api, getMediaUrl } from '@/lib/api';
import { Link } from '@/i18n/routing';
import { Calendar, Search, ArrowRight, Tag as TagIcon } from 'lucide-react';
import type { BlogPost } from '@dr-ahmed/shared';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get<BlogPost[]>('/blog/published').then(setPosts).catch(() => {});
  }, []);

  const filteredPosts = posts.filter(post => {
    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <Section className="bg-gradient-to-b from-[var(--primary)]/5 to-transparent">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
          
          {/* Search Bar */}
          <div className="mx-auto max-w-2xl mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={search}

                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] focus:border-[var(--primary)] outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--muted)] text-lg">{t('noPosts')}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, i) => {
                const title = locale === 'ar' ? post.titleAr : post.titleEn;
                const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;
                const slug = locale === 'ar' ? post.slugAr : post.slugEn;

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card hover className="h-full flex flex-col group">
                      <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-t-xl overflow-hidden relative border-b border-gray-100 dark:border-white/5">
                         {post.featuredImage ? (
                           <img 
                             src={getMediaUrl(post.featuredImage)} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                             alt={title} 
                           />
                         ) : (
                           <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-500">
                              <TagIcon size={64} />
                           </div>
                         )}
                         <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">
                            {post.category?.nameAr || (locale === 'ar' ? 'مقال طبي' : 'Medical Article')}
                         </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted)]">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString(locale)}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                          {title}
                        </h3>
                        {excerpt && (
                          <p className="mt-3 flex-1 text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                            {excerpt}
                          </p>
                        )}
                        <Link href={`/blog/${slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] group-hover:gap-3 transition-all">
                          {t('readMore')} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
