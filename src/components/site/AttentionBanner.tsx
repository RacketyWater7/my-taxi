'use client';

import { Container } from '@/components/ui/Container';
import { phoneHref, phoneNumber } from '@/lib/navigation';

export function AttentionBanner() {
  return (
    <div className="bg-gradient-to-r from-taxi-500 via-taxi-400 to-taxi-500 py-3 text-center text-sm font-bold text-night-900 shadow-sm">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>24/7 erreichbar:</span>
          </span>
          <a
            href={phoneHref}
            className="underline transition-colors hover:text-night-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-900 focus-visible:ring-offset-2 focus-visible:ring-offset-taxi-500 rounded"
          >
            {phoneNumber}
          </a>
        </div>
      </Container>
    </div>
  );
}

