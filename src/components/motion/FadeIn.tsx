'use client';

import { m, useInView } from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/cn';

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px', once: true });

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay }}
    >
      {children}
    </m.div>
  );
}

