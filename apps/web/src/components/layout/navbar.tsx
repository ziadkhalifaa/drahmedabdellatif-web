'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Calendar, 
  ChevronDown, 
  Languages, 
  ChevronRight,
  PhoneCall,
  Activity,
  User,
  ShieldCheck,
  Newspaper,
  PlayCircle,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { api, getMediaUrl } from '@/lib/api';
import type { Service } from '@dr-ahmed/shared';
import useSWR from 'swr';

export function Navbar() {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const tMedia = useTranslations('media');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const isRTL = locale === 'ar';
  
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: servicesData } = useSWR<Service[]>('/services', api.get);
  const services = servicesData?.slice(0, 6) || [];
  const [mounted, setMounted] = useState(false);
  const { token, isLoading: isAuthLoading } = useAuth();
  const isLoggedIn = !!token;

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname as any, { locale: newLocale });
  };

  if (!mounted) return null;

  const resourceItems = [
    { 
      title: t('patientGuide'), 
      desc: isRTL ? "تعليمات هامة وأسئلة شائعة قبل زيارتك." : "Essential instructions and FAQs for your visit.", 
      icon: <ShieldCheck className="text-orange-500" />, 
      href: "/patient-guide" 
    },
    { 
      title: t('successStories'), 
      desc: isRTL ? "قصص نجاح واقعية لمرضانا." : "Real success stories from our patients.", 
      icon: <Activity className="text-green-500" />, 
      href: "/success-stories" 
    },
    { 
      title: t('blog'), 
      desc: isRTL ? "أحدث المقالات الطبية في المسالك البولية." : "Latest medical articles and news.", 
      icon: <Newspaper className="text-blue-500" />, 
      href: "/blog" 
    }
  ];

  const mediaItems = [
    { 
      title: tMedia('gallery'), 
      desc: isRTL ? "صور من العيادة والعمليات الجراحية." : "Clinic and surgery gallery.", 
      icon: <ImageIcon className="text-pink-500" />, 
      href: "/gallery" 
    },
    { 
      title: tMedia('videos'), 
      desc: isRTL ? "فيديوهات تعليمية ولقاءات للدكتور." : "Educational videos and interviews.", 
      icon: <PlayCircle className="text-red-500" />, 
      href: "/videos" 
    }
  ];

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('aboutUs') },
    { href: '/services', label: t('services'), trigger: 'services' },
    { href: '/patient-guide', label: t('patientGuide'), trigger: 'resources' },
    { href: '/gallery', label: t('media'), trigger: 'media' },
    { href: '/contact', label: t('contact') }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  return (
    <header 
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
        scrolled ? "py-2.5" : "py-6 lg:py-8"
      )}
      onMouseLeave={() => {
        setActiveMenu(null);
        setHoveredItem(null);
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-primary via-primary-light to-blue-500 origin-left"
        style={{ scaleX }}
      />
      
      <motion.nav 
        layout
        className={cn(
          "relative flex items-center justify-between gap-4 px-6 py-2.5 transition-all duration-500",
          scrolled 
            ? "w-[95%] lg:w-[85%] rounded-[2rem] bg-white/70 dark:bg-slate-900/60 border border-white/40 dark:border-white/5 shadow-2xl backdrop-blur-xl" 
            : "w-[98%] lg:w-[92%] rounded-[2.5rem] bg-white/40 dark:bg-slate-950/20 border border-transparent shadow-none backdrop-blur-md"
        )}
      >
        {/* Brand/Logo */}
        <Link href="/" className="relative z-10 shrink-0">
          <Logo className={cn("transition-all duration-500", scrolled ? "scale-90" : "scale-100")} />
        </Link>

        {/* Center Navigation - Desktop with sliding hover pill */}
        <div 
          className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-full p-1 border border-black/[0.02] dark:border-white/[0.02] relative"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => {
            const isTrigger = !!item.trigger;
            const isCurrent = item.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.href);

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  setHoveredItem(item.href);
                  if (item.trigger) {
                    setActiveMenu(item.trigger);
                  } else {
                    setActiveMenu(null);
                  }
                }}
              >
                {hoveredItem === item.href && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-primary/10 dark:bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <Link
                  href={item.href as any}
                  className={cn(
                    "relative z-10 px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all rounded-full outline-none flex items-center gap-1.5 group",
                    (isTrigger ? activeMenu === item.trigger : isCurrent)
                      ? "text-primary dark:text-primary-light"
                      : "text-foreground/75 hover:text-primary dark:hover:text-primary-light"
                  )}
                >
                  <span>{item.label}</span>
                  {isTrigger && (
                    <ChevronDown 
                      size={11} 
                      className={cn(
                        "transition-transform duration-300 opacity-60 group-hover:opacity-100", 
                        activeMenu === item.trigger && "rotate-180"
                      )} 
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme, Language & Auth Toolbar */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.02] dark:border-white/[0.02]">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="h-8 w-8 rounded-full hover:bg-white dark:hover:bg-slate-800 text-foreground transition-all duration-300 shadow-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-blue-600" />}
                </motion.div>
              </AnimatePresence>
            </Button>
            
            {/* Language Dropdown Selector */}
            <div ref={langRef} className="relative flex items-center">
              <button 
                onClick={() => setLangOpen(!langOpen)} 
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white dark:hover:bg-slate-800 text-foreground transition-all duration-300 text-[10px] font-black tracking-wider"
              >
                <Languages size={12} className="text-primary dark:text-primary-light" />
                <span>{locale === 'ar' ? 'العربية' : 'English'}</span>
                <ChevronDown size={10} className={cn("transition-transform duration-300 opacity-60", langOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute top-full mt-2 w-32 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl p-1.5 z-[100] flex flex-col gap-1 backdrop-blur-lg",
                      isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right"
                    )}
                  >
                    <button
                      onClick={() => {
                        if (locale !== 'ar') router.replace(pathname as any, { locale: 'ar' });
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-all hover:bg-primary/10",
                        locale === 'ar' ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      <span>العربية</span>
                      {locale === 'ar' && <Check size={10} className="text-primary" />}
                    </button>

                    <button
                      onClick={() => {
                        if (locale !== 'en') router.replace(pathname as any, { locale: 'en' });
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-all hover:bg-primary/10",
                        locale === 'en' ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      <span>English</span>
                      {locale === 'en' && <Check size={10} className="text-primary" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-[1px] h-4 bg-border mx-1" />

            {!isAuthLoading && (
              isLoggedIn ? (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="h-8 rounded-full font-bold text-[10px] px-3 gap-2">
                    <User size={12} />
                    {isRTL ? 'ملفي' : 'Account'}
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="h-8 rounded-full font-bold text-[10px] px-3">
                      {tAuth('login.submit')}
                    </Button>
                  </Link>
                  <div className="w-[1px] h-3 bg-border mx-0.5" />
                  <Link href="/auth/register">
                    <Button variant="ghost" size="sm" className="h-8 rounded-full font-bold text-[10px] px-3">
                      {tAuth('register.submit')}
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Premium Golden CTA */}
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative group px-6 py-2.5 rounded-full overflow-hidden shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-gold opacity-95 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                <Calendar size={13} />
                {t('bookNow')}
              </span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileOpen ? 'close' : 'menu'}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mega Menu Content */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="absolute top-full left-0 right-0 pt-3 hidden lg:flex justify-center px-4"
          >
            <div className="w-full max-w-6xl bg-white/80 dark:bg-slate-950/70 rounded-[2.5rem] shadow-premium overflow-hidden grid grid-cols-[1fr_320px] border border-white/40 dark:border-white/10 backdrop-blur-2xl">
              <div className="p-8 grid grid-cols-2 gap-4">
                {activeMenu === 'services' ? (
                  services.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link 
                        href={`/services/${service.slug || service.id}`}
                        className="flex items-center gap-4.5 p-4 rounded-3xl transition-all duration-300 hover:bg-primary/5 dark:hover:bg-white/5 group/item border border-transparent hover:border-primary/10 dark:hover:border-white/10 hover:shadow-md hover:scale-[1.02]"
                      >
                        <div className="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-border shadow-inner relative">
                           <img 
                             src={getMediaUrl(service.image || '/images/placeholder.png')} 
                             alt={isRTL ? service.titleAr : service.titleEn}
                             className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-115"
                           />
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-foreground group-hover/item:text-primary dark:group-hover/item:text-primary-light transition-colors line-clamp-1">
                             {isRTL ? service.titleAr : service.titleEn}
                          </h4>
                          <p className="text-[10px] text-muted mt-1 line-clamp-1 opacity-70 leading-relaxed">
                             {isRTL ? service.descriptionAr : service.descriptionEn}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  (activeMenu === 'resources' ? resourceItems : mediaItems).map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link 
                        href={item.href as any}
                        className="flex items-start gap-4.5 p-4 rounded-3xl transition-all duration-300 hover:bg-primary/5 dark:hover:bg-white/5 group/item border border-transparent hover:border-primary/10 dark:hover:border-white/10 hover:shadow-md hover:scale-[1.02]"
                      >
                        <div className="h-11 w-11 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 flex items-center justify-center shrink-0 text-primary transition-all duration-300 group-hover/item:scale-110">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-foreground group-hover/item:text-primary dark:group-hover/item:text-primary-light transition-colors">{item.title}</h4>
                          <p className="text-[10px] text-muted mt-1 line-clamp-2 opacity-70 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* Right Sidebar - Spotlight */}
              <div className="bg-primary/[0.02] dark:bg-white/[0.01] p-8 flex flex-col justify-between border-s border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light animate-pulse" />
                    {isRTL ? 'أبرز التحديثات' : 'Spotlight'}
                  </div>
                  <div className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm">
                    <p className="text-xs font-bold text-foreground leading-relaxed">
                       {isRTL 
                         ? 'اكتشف أحدث تقنيات الهوليب (HoLEP) لعلاج تضخم البروستاتا بالليزر.' 
                         : 'Discover the latest HoLEP techniques for laser prostate treatment.'}
                    </p>
                    <Link href="/blog" className="text-primary dark:text-primary-light text-[10px] font-black mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all group/link">
                      {isRTL ? 'اقرأ المزيد' : 'Read More'} 
                      <ChevronRight size={12} className={cn("transition-transform", isRTL && "rotate-180 group-hover/link:-translate-x-1", !isRTL && "group-hover/link:translate-x-1")} />
                    </Link>
                  </div>

                  <div className="space-y-3">
                     <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{isRTL ? 'الدعم' : 'Support'}</h5>
                     <Link href="/contact" className="flex items-center gap-3 text-[11px] font-bold text-muted hover:text-primary dark:hover:text-primary-light transition-colors">
                        <PhoneCall size={14} className="text-primary dark:text-primary-light" />
                        {isRTL ? 'اتصل بنا للمساعدة' : 'Contact us for help'}
                     </Link>
                  </div>
                </div>
                
                <Link href="/booking">
                   <Button className="w-full rounded-2xl py-5 font-black bg-white dark:bg-slate-900 border border-border text-foreground hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all gap-2 group/btn shadow-sm text-xs">
                     {t('bookNow')} 
                     <ChevronRight size={14} className={cn("transition-transform", isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1")} />
                   </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 dark:bg-slate-950/95 backdrop-blur-xl lg:hidden flex flex-col justify-between"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="h-full flex flex-col p-6 pt-28 pb-10"
            >
              <div className="space-y-6 overflow-y-auto pb-20 flex-1">
                {/* Mobile Links */}
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <motion.div key={item.href} variants={itemVariants}>
                      <MobileNavLink href={item.href} label={item.label} onClick={() => setMobileOpen(false)} />
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants} className="h-[1px] bg-border" />

                {/* Mobile Quick Actions */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                   <button onClick={toggleLanguage} className="flex flex-col items-center justify-center p-5 rounded-3xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 gap-2 hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
                      <Languages size={22} className="text-primary dark:text-primary-light" />
                      <span className="text-[10px] font-black tracking-widest uppercase">{isRTL ? 'English' : 'العربية'}</span>
                   </button>
                   <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex flex-col items-center justify-center p-5 rounded-3xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 gap-2 hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
                      {theme === 'dark' ? <Sun size={22} className="text-yellow-500" /> : <Moon size={22} className="text-blue-500" />}
                      <span className="text-[10px] font-black tracking-widest uppercase">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                   </button>
                </motion.div>

                {!isAuthLoading && (
                  <motion.div variants={itemVariants}>
                    {isLoggedIn ? (
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full rounded-2xl py-6 font-black gap-2">
                          <User size={18} />
                          {isRTL ? 'ملفي الشخصي' : 'My Account'}
                        </Button>
                      </Link>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="w-full">
                          <Button variant="outline" className="w-full rounded-2xl py-6 font-black">
                            {tAuth('login.submit')}
                          </Button>
                        </Link>
                        <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="w-full">
                          <Button className="w-full rounded-2xl py-6 font-black bg-gradient-to-r from-primary to-primary-light text-white border-none shadow-lg shadow-primary/20">
                            {tAuth('register.submit')}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Fixed CTA */}
              <motion.div variants={itemVariants} className="pt-4">
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-2xl py-7 font-black bg-gradient-gold text-white shadow-xl shadow-yellow-500/10 border-none text-base">
                    {t('bookNow')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  const isRTL = useLocale() === 'ar';
  return (
    <Link 
      href={href as any} 
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 dark:hover:bg-white/5 border border-transparent hover:border-primary/10 dark:hover:border-white/10 transition-all group"
    >
      <span className="text-lg font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{label}</span>
      <ChevronRight size={20} className={cn("text-muted opacity-50 group-hover:opacity-100 group-hover:text-primary dark:group-hover:text-primary-light transition-all", isRTL && "rotate-180")} />
    </Link>
  );
}
