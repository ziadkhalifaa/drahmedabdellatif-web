'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ to, duration = 2, suffix = '', prefix = '', className = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (value) => {
          setCount(Math.round(value));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString('ar-EG')}{suffix}
    </span>
  );
}
