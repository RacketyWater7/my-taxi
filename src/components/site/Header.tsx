'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import { navLinks, phoneHref, phoneNumber } from '@/lib/navigation';

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = useMemo(() => {
    const found = navLinks.find((l) => 'children' in l);
    return found && 'children' in found ? found.children : [];
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-taxi-200 bg-white/95 shadow-medium backdrop-blur-xl'
          : 'bg-taxi-500/10 backdrop-blur-sm'
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-3 rounded-xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-taxi-500 focus-visible:ring-offset-2"
        >
          <Image
            src="/inc/img/logo_taxi70.webp"
            alt="Taxi 70"
            width={110}
            height={40}
            priority
            className="drop-shadow-md"
            style={{ height: 'auto' }}
          />
          <span className="sr-only">Taxi 70</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            className={cn(
              'rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
              pathname === '/'
                ? 'bg-taxi-500 text-night-900 shadow-button'
                : 'text-night-700 hover:bg-taxi-100 hover:text-night-900'
            )}
            href="/"
          >
            Start
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                pathname?.startsWith('/transport') ||
                  pathname?.startsWith('/flughafentransfer') ||
                  pathname?.startsWith('/krankentransport') ||
                  pathname?.startsWith('/rollstuhltransport')
                  ? 'bg-taxi-500 text-night-900 shadow-button'
                  : 'text-night-700 hover:bg-taxi-100 hover:text-night-900'
              )}
            >
              Service
              <svg
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  servicesOpen && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <m.div
                  className="absolute left-0 top-full pt-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-72 rounded-2xl border border-taxi-200 bg-white p-2 shadow-large">
                    {services.map((s, i) => (
                      <m.div
                        key={s.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={s.href}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200',
                            pathname === s.href
                              ? 'bg-taxi-500 text-night-900'
                              : 'text-night-700 hover:bg-taxi-100 hover:text-night-900'
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-taxi-100 text-lg">
                            {s.href === '/transport' && '📦'}
                            {s.href === '/flughafentransfer' && '✈️'}
                            {s.href === '/krankentransport' && '🏥'}
                            {s.href === '/rollstuhltransport' && '♿'}
                          </span>
                          {s.label}
                        </Link>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            className={cn(
              'rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
              pathname === '/taxi70-in-muenster'
                ? 'bg-taxi-500 text-night-900 shadow-button'
                : 'text-night-700 hover:bg-taxi-100 hover:text-night-900'
            )}
            href="/taxi70-in-muenster"
          >
            Taxi in Münster
          </Link>
          <Link
            className={cn(
              'rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
              pathname === '/kontakt'
                ? 'bg-taxi-500 text-night-900 shadow-button'
                : 'text-night-700 hover:bg-taxi-100 hover:text-night-900'
            )}
            href="/kontakt"
          >
            Kontakt
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm font-bold text-night-800 transition-colors hover:text-taxi-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phoneNumber}
          </a>
          <ButtonLink href="/#bestellen" size="sm">
            Taxi bestellen
          </ButtonLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-taxi-400 bg-taxi-100 text-night-800 shadow-soft transition-all hover:border-taxi-500 hover:bg-taxi-200 md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                open && 'translate-y-2 rotate-45'
              )}
            />
            <span
              className={cn(
                'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                open && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                open && '-translate-y-2 -rotate-45'
              )}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <m.div
            className="border-t border-taxi-200 bg-gradient-to-b from-taxi-50 to-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Container className="py-6">
              <div className="grid gap-2">
                <Link
                  className="rounded-xl px-4 py-3 font-semibold text-night-800 transition-all hover:bg-taxi-100"
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  Start
                </Link>

                <div className="mt-3 mb-2 px-4 text-xs font-bold uppercase tracking-wider text-night-500">
                  Services
                </div>
                {services.map((s) => (
                  <Link
                    key={s.href}
                    className="rounded-xl px-4 py-3 font-semibold text-night-700 transition-all hover:bg-taxi-100"
                    href={s.href}
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}

                <Link
                  className="mt-2 rounded-xl px-4 py-3 font-semibold text-night-800 transition-all hover:bg-taxi-100"
                  href="/taxi70-in-muenster"
                  onClick={() => setOpen(false)}
                >
                  Taxi in Münster
                </Link>
                <Link
                  className="rounded-xl px-4 py-3 font-semibold text-night-800 transition-all hover:bg-taxi-100"
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                >
                  Kontakt
                </Link>

                <div className="mt-4 grid gap-3">
                  <a
                    href={phoneHref}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-taxi-300 bg-taxi-50 px-4 py-3 font-bold text-night-800 transition-all hover:border-taxi-400 hover:bg-taxi-100"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Anrufen: {phoneNumber}
                  </a>
                  <ButtonLink href="/#bestellen" onClick={() => setOpen(false)}>
                    Taxi bestellen
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
