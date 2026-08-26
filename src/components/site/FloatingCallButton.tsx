'use client';

import { m } from 'framer-motion';

import { phoneHref, phoneNumber } from '@/lib/navigation';

export function FloatingCallButton() {
  return (
    <m.a
      href={phoneHref}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-taxi-black px-4 py-3 text-sm font-black text-white shadow-lg shadow-black/20 ring-1 ring-white/10 md:hidden"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
      Anrufen
      <span className="font-semibold text-white/80">{phoneNumber}</span>
    </m.a>
  );
}

