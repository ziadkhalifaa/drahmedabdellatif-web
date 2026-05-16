'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

export function Preloader() {
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for at least 2.5 seconds for cinematic effect and data fetching
    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        setLoading(false);
      } else {
        window.addEventListener('load', () => setLoading(false));
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => setLoading(false));
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020816] overflow-hidden"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,40,100,0.4)_0%,transparent_60%)] animate-pulse duration-[3000ms]" />
          
          <div className="relative flex flex-col items-center">
            {/* SVG Heartbeat/ECG Animation */}
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="text-[#eab531] drop-shadow-[0_0_20px_rgba(234,181,49,0.4)]"
            >
              {/* Outer glow circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="502"
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Heartbeat ECG Line */}
              <motion.path
                d="M 30 100 L 65 100 L 80 60 L 115 150 L 135 100 L 170 100"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
              
              {/* Floating Medical Cross */}
              <motion.path
                d="M 95 30 h 10 v 10 h 10 v 10 h -10 v 10 h -10 v -10 h -10 v -10 h 10 z"
                fill="currentColor"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 0.8, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.svg>

            {/* Doctor Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider font-cairo drop-shadow-lg">
                {locale === 'ar' ? 'أ.د. أحمد عبد اللطيف' : 'Prof. Dr. Ahmed Abdellatif'}
              </h1>
              <h2 className="text-sm md:text-md text-blue-200/80 mt-3 font-medium tracking-widest uppercase">
                {locale === 'ar' ? 'استشاري جراحة المسالك البولية والمناظير والذكورة' : 'Consultant of Urology, Endoscopy & Andrology'}
              </h2>
            </motion.div>

            {/* Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden relative"
            >
              <motion.div
                initial={{ x: locale === 'ar' ? "100%" : "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.2, ease: "circOut" }}
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#003673] via-[#eab531] to-[#003673] rounded-full"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-4 text-[10px] text-white/50 tracking-[0.3em] uppercase font-bold"
            >
              {locale === 'ar' ? 'جاري تجهيز النظام...' : 'Initializing System...'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
