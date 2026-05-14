'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/context/auth-context';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ChevronRight,
  PhoneCall,
  Activity,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getMediaUrl } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';

export function Navbar() {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const tMedia = useTranslations('media');
  const tPreNav = useTranslations('preNav');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [mounted, setMounted] = useState(false);
  const { token, logout } = useAuth();
  const isLoggedIn = !!token;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch real services with images
    api.get<Service[]>('/services')
      .then(setServices)
      .catch(err => console.error("Failed to fetch services:", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const resourceItems = [
    { 
      title: t('patientGuide'), 
      desc: isRTL ? "تعليمات هامة وأسئلة شائعة قبل زيارتك." : "Essential instructions and FAQs for your visit.", 
      icon: <Activity className="text-[var(--primary)]" />, 
      href: "/patient-guide" 
    },
    { 
      title: t('successStories'), 
      desc: isRTL ? "قصص نجاح واقعية لمرضانا." : "Real success stories from our patients.", 
      icon: <Activity className="text-[var(--accent)]" />, 
      href: "/testimonials" 
    },
    { 
      title: t('blog'), 
      desc: isRTL ? "أحدث المقالات الطبية في المسالك البولية." : "Latest medical articles and news.", 
      icon: <Activity className="text-[var(--primary-light)]" />, 
      href: "/blog" 
    }
  ];

  const mediaItems = [
    { 
      title: tMedia('gallery'), 
      desc: isRTL ? "صور من العيادة والعمليات الجراحية." : "Clinic and surgery gallery.", 
      icon: <Activity className="text-[var(--primary)]" />, 
      href: "/gallery" 
    },
    { 
      title: tMedia('videos'), 
      desc: isRTL ? "فيديوهات تعليمية ولقاءات للدكتور." : "Educational videos and interviews.", 
      icon: <Activity className="text-[var(--accent)]" />, 
      href: "/videos" 
    }
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname as any, { locale: newLocale });
  };

  const isHomePage = pathname === '/' || pathname === `/${locale}`;
  const isSolid = scrolled || !isHomePage;

  if (!mounted) return null;

  return (
    <>
      {/* Pre-Nav Bar */}
      <div className="hidden lg:flex w-full h-[40px] bg-[var(--primary)] text-white/90 text-xs items-center justify-between px-8 absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <a href="tel:01002621743" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} className="text-[var(--accent)]" />
            <span className="font-mono tracking-wider font-medium">01002621743</span>
          </a>
        </div>
        
        <div className="flex-1 overflow-hidden mx-8 max-w-xl relative h-full flex items-center">
          <div className="whitespace-nowrap animate-marquee flex items-center h-full text-[13px] font-bold tracking-wide">
             {tPreNav('credentials') || 'أكاديمي وزارة الصحة | FACS | أستاذ جامعي'}
             <span className="inline-block w-40"></span>
             {tPreNav('credentials') || 'أكاديمي وزارة الصحة | FACS | أستاذ جامعي'}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110"><MessageCircle size={14} /></a>
          </div>
          <button 
            onClick={toggleLanguage} 
            className="flex items-center bg-white/10 hover:bg-white/20 transition-colors rounded-full px-3 py-1 font-bold tracking-widest text-[10px]"
          >
            {locale === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>
      </div>

      <header 
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-500",
          scrolled ? "top-2" : "top-[48px] lg:top-[56px]"
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav 
            className={cn(
              "relative flex items-center justify-between px-6 py-2 transition-all duration-500 rounded-full",
              scrolled 
                ? "glass shadow-lg" 
                : isHomePage ? "bg-transparent" : "glass"
            )}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Logo className={cn("transition-transform duration-500 origin-left", scrolled ? "scale-85" : "scale-100")} />
            </Link>

            {/* Nav Items */}
            <div className="hidden lg:flex items-center gap-2">
              <NavLink href="/" label={t('home')} isSolid={isSolid} />
              
              <MegaMenuTrigger 
                label={t('services')} 
                isActive={activeMenu === 'services'} 
                onMouseEnter={() => setActiveMenu('services')}
                isSolid={isSolid}
              />
              
              <MegaMenuTrigger 
                label={t('patientGuide')} 
                isActive={activeMenu === 'resources'} 
                onMouseEnter={() => setActiveMenu('resources')}
                isSolid={isSolid}
              />

              <MegaMenuTrigger 
                label={t('media')} 
                isActive={activeMenu === 'media'} 
                onMouseEnter={() => setActiveMenu('media')}
                isSolid={isSolid}
              />

              <NavLink href="/contact" label={t('contact')} isSolid={isSolid} />
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
               {isLoggedIn ? (
                 <div className="flex items-center gap-3">
                   <Link href="/dashboard">
                     <Button variant="ghost" className="rounded-full font-bold text-sm px-5 hover:bg-[var(--primary)]/10 text-[var(--text-primary)]">
                        {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                     </Button>
                   </Link>
                   <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full border-[var(--error)]/30 text-[var(--error)] hover:bg-[var(--error)]/10">
                      {isRTL ? 'خروج' : 'Logout'}
                   </Button>
                 </div>
               ) : (
                 <Link href="/auth/login">
                   <Button variant="ghost" className={cn("rounded-full font-bold text-sm px-5", !isSolid ? "text-white hover:bg-white/10" : "text-[var(--text-primary)] hover:bg-[var(--primary)]/10")}>{tAuth('login.submit')}</Button>
                 </Link>
               )}

              <Link href="/booking">
                <Button className="rounded-full px-8 py-2.5 font-bold shadow-lg shadow-[var(--primary)]/20 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none transition-transform hover:scale-105 active:scale-95">
                  {t('bookNow')}
                </Button>
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-3">
               <button onClick={toggleLanguage} className={cn("text-xs font-bold rounded-full px-3 py-1", !isSolid ? "bg-white/20 text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]")}>
                 {isRTL ? 'EN' : 'AR'}
               </button>
               <button className={cn("p-2 rounded-full", !isSolid ? "text-white" : "text-[var(--text-primary)]")} onClick={() => setMobileOpen(!mobileOpen)}>
                 {mobileOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </nav>

          {/* Mega Menu Content */}
          <AnimatePresence mode="wait">
            {activeMenu && (
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="absolute left-0 right-0 px-4 pt-4 hidden lg:block"
                onMouseEnter={() => setActiveMenu(activeMenu)}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="mx-auto max-w-6xl glass rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-[1fr_320px]">
                    <div className="p-8 grid grid-cols-2 gap-x-8 gap-y-4">
                      {activeMenu === 'services' ? (
                        services.map((service) => (
                          <Link 
                            key={service.id} 
                            href={`/services/${service.id}`}
                            className="flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-[var(--primary)]/5 group/item border border-transparent hover:border-[var(--primary)]/20"
                          >
                            <div className="h-16 w-16 rounded-[1rem] overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner border border-[var(--border)]">
                               <img 
                                 src={getMediaUrl(service.image || '/images/placeholder.png')} 
                                 alt={isRTL ? service.titleAr : service.titleEn}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                               />
                            </div>
                            <div>
                              <h4 className="font-bold text-base text-[var(--text-primary)] group-hover/item:text-[var(--primary)] transition-colors line-clamp-1">
                                 {isRTL ? service.titleAr : service.titleEn}
                              </h4>
                              <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">
                                 {isRTL ? service.descriptionAr : service.descriptionEn}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        (activeMenu === 'resources' ? resourceItems : mediaItems).map((item: any) => (
                          <Link 
                            key={item.href} 
                            href={item.href as any}
                            className="flex items-start gap-5 p-4 rounded-2xl transition-all hover:bg-[var(--primary)]/5 group/item border border-transparent hover:border-[var(--primary)]/20"
                          >
                            <div className="h-12 w-12 rounded-[1rem] bg-[var(--surface-1)] border border-[var(--border)] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover/item:scale-110">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-base text-[var(--text-primary)] group-hover/item:text-[var(--primary)]">{item.title}</h4>
                              <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">{item.desc}</p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                    
                    {/* Right Spotlight Panel */}
                    <div className="bg-[var(--primary)]/5 p-8 flex flex-col justify-between border-l border-[var(--border)] rtl:border-l-0 rtl:border-r">
                      <div className="space-y-6">
                        <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                           {isRTL ? 'أحدث مقالة' : 'Latest Article'}
                        </h5>
                        <div className="p-6 rounded-[1.25rem] bg-[var(--surface-0)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                          <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                             {isRTL ? 'اكتشف أحدث التقنيات في جراحة الكلى والبروستاتا بالليزر.' : 'Discover the latest techniques in laser Kidney and Prostate surgery.'}
                          </p>
                          <Link href="/blog" className="text-[var(--primary)] text-xs font-bold mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all">
                            {isRTL ? 'اقرأ المزيد' : 'Read More'} {isRTL ? <ArrowRight size={14} className="rotate-180" /> : <ArrowRight size={14} />}
                          </Link>
                        </div>

                        <div className="space-y-3 pt-2">
                           <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{isRTL ? 'الطوارئ' : 'Emergency'}</h5>
                           <a href="tel:01002621743" className="flex items-center gap-3 text-sm font-bold text-[var(--error)] hover:opacity-80 transition-opacity">
                              <PhoneCall size={18} />
                              <span dir="ltr">0100 262 1743</span>
                           </a>
                        </div>
                      </div>
                      
                      <Link href="/booking">
                         <Button className="w-full rounded-xl py-6 font-bold bg-[var(--surface-0)] border-2 border-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all gap-2 group/btn shadow-sm mt-6">
                           {t('bookNow')} {isRTL ? <ChevronRight size={18} className="rotate-180 group-hover/btn:-translate-x-1 transition-transform" /> : <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
                         </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden fixed top-[72px] left-4 right-4 z-40">
              <div className="glass rounded-[2rem] p-6 space-y-6 max-h-[85vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
                 <div className="space-y-4">
                    <h4 className="px-2 text-[11px] font-black uppercase tracking-widest text-[var(--primary)] opacity-70">{t('services')}</h4>
                    <div className="grid gap-2">
                      {services.map((service) => (
                        <Link key={service.id} href={`/services/${service.id}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[var(--primary)]/5 border border-transparent hover:border-[var(--primary)]/10 transition-colors">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                             <img src={getMediaUrl(service.image || '/images/placeholder.png')} alt={isRTL ? service.titleAr : service.titleEn} className="w-full h-full object-cover" />
                          </div>
                          <div className="font-bold text-sm text-[var(--text-primary)]">{isRTL ? service.titleAr : service.titleEn}</div>
                        </Link>
                      ))}
                    </div>
                 </div>
                 <Link href="/booking" className="block pt-2" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-2xl py-7 font-bold bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 border-none">
                      {t('bookNow')}
                    </Button>
                 </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function NavLink({ href, label, isSolid }: { href: string, label: string, isSolid: boolean }) {
  return (
    <Link href={href as any} className={cn("px-5 py-2 text-sm font-bold transition-all rounded-full", !isSolid ? "text-white hover:bg-white/20" : "text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10")}>
      {label}
    </Link>
  );
}

function MegaMenuTrigger({ label, isActive, onMouseEnter, isSolid }: any) {
  return (
    <button onMouseEnter={onMouseEnter} className={cn("flex items-center gap-1.5 px-5 py-2 text-sm font-bold transition-all rounded-full outline-none", isActive ? (isSolid ? "text-[var(--primary)] bg-[var(--primary)]/10" : "text-white bg-white/20") : (!isSolid ? "text-white hover:bg-white/20" : "text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"))}>
      {label} <ChevronDown size={14} className={cn("transition-transform duration-300", isActive && "rotate-180")} />
    </button>
  );
}
