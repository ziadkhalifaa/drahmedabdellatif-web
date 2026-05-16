'use client';

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import useSWR from 'swr';
import { api, getMediaUrl } from '@/lib/api';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string | null;
  excerptEn: string | null;
  slugAr: string;
  slugEn: string;
  featuredImage: string | null;
  showOnHomepage: boolean;
}

export function SurgicalTipsSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: isAr ? 'rtl' : 'ltr',
    align: 'start',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const { data: postsData } = useSWR<BlogPost[]>('/blog/published', api.get);
  const posts = postsData
    ? (postsData.filter(p => p.showOnHomepage).length > 0
        ? postsData.filter(p => p.showOnHomepage)
        : postsData.slice(0, 4))
    : [];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-28 bg-gray-50 dark:bg-[#0d1117] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14",
          isAr ? "text-right" : "text-left"
        )}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black uppercase tracking-widest mb-5">
              <BookOpen size={14} />
              {isAr ? 'المدونة الطبية' : 'Medical Blog'}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[var(--foreground)] leading-tight"
            >
              {isAr ? 'نصائح جراحية وتثقيف طبي' : 'Surgical Tips & Medical Education'}
            </motion.h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-black text-sm border border-[var(--primary)]/30 px-5 py-3 rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            {isAr ? 'كل المقالات' : 'All Articles'}
            {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className={cn("embla__container flex", isAr ? "-mr-6" : "-ml-6")}>
            {posts.map((post) => {
              const title = isAr ? post.titleAr : post.titleEn;
              const excerpt = isAr ? post.excerptAr : post.excerptEn;
              const slug = isAr ? post.slugAr : post.slugEn;

              return (
                <div
                  key={post.id}
                  className={cn(
                    "embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0",
                    isAr ? "pr-6" : "pl-6"
                  )}
                >
                  <Link
                    href={`/blog/${slug}`}
                    className="group block bg-white dark:bg-[#1a1a1a] rounded-[1.75rem] overflow-hidden shadow-sm border border-[var(--border)] h-full flex flex-col hover:shadow-xl hover:shadow-[var(--primary)]/5 hover:-translate-y-2 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden flex-shrink-0 bg-[var(--card)]">
                      {post.featuredImage ? (
                        <img
                          src={getMediaUrl(post.featuredImage)}
                          alt={title}
                          className="w-full h-full object-cover transform transition-transform duration-600 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 flex items-center justify-center">
                          <BookOpen size={50} className="text-[var(--primary)]/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Badge */}
                      <div className={cn(
                        "absolute top-4 z-10",
                        isAr ? "right-4" : "left-4"
                      )}>
                        <span className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-black text-xs font-black px-3 py-1.5 rounded-full">
                          <Tag size={10} />
                          {isAr ? 'مقال طبي' : 'Medical Article'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={cn(
                      "p-6 flex flex-col flex-grow",
                      isAr ? "text-right" : "text-left"
                    )}>
                      <h3 className="text-lg font-black text-[var(--foreground)] mb-3 line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors duration-200">
                        {title}
                      </h3>

                      {excerpt && (
                        <p className="text-[var(--muted)] text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                          {excerpt}
                        </p>
                      )}

                      <div className={cn(
                        "inline-flex items-center gap-2 text-[var(--primary)] font-black text-sm mt-auto group-hover:gap-3 transition-all duration-200",
                        isAr ? "flex-row-reverse" : ""
                      )}>
                        {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                        {isAr ? 'اقرأ المزيد' : 'Read More'}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots + Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200",
              canScrollPrev
                ? "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white shadow-md"
                : "border-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-40"
            )}
          >
            {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <div className="flex gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === selectedIndex
                    ? "w-8 bg-[var(--primary)]"
                    : "w-2 bg-[var(--border)]"
                )}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cn(
              "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200",
              canScrollNext
                ? "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white shadow-md"
                : "border-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-40"
            )}
          >
            {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

      </div>
    </section>
  );
}
