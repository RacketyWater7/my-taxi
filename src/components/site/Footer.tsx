import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { address, legalLinks, phoneHref, phoneNumber } from '@/lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night-900">
      {/* Yellow accent stripe at top */}
      <div className="absolute left-0 right-0 top-0 h-2 bg-taxi-500" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-taxi-500/10 blur-[100px]" />
        <div className="absolute -right-32 top-0 h-[300px] w-[300px] rounded-full bg-taxi-500/5 blur-[80px]" />
        
        {/* Checkerboard accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          {[...Array(100)].map((_, i) => (
            <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-taxi-500' : 'bg-transparent'}`} />
          ))}
        </div>
      </div>

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Image
              src="/inc/img/logo_taxi70.webp"
              alt="Taxi 70"
              width={130}
              height={48}
              className="drop-shadow-lg brightness-110"
              style={{ height: 'auto' }}
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-night-300">
              Zuverlässig. Schnell. Freundlich. Taxi 70 ist Ihr Partner für
              Fahrten in Münster/Hiltrup – 24/7 erreichbar.
            </p>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://de-de.facebook.com/taxihiltrupm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-night-800 text-night-400 transition-all duration-300 hover:bg-taxi-500 hover:text-night-900"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCrf94I3wUZKT5ZWpZ55cVVQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-night-800 text-night-400 transition-all duration-300 hover:bg-taxi-500 hover:text-night-900"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-taxi-500">
              Kontakt
            </h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-taxi-500 text-night-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white">{address.street}</div>
                  <div className="text-night-400">{address.zip} {address.city}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-taxi-500 text-night-900">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <a
                    href={phoneHref}
                    className="text-xl font-black text-taxi-400 transition-colors hover:text-taxi-300"
                  >
                    {phoneNumber}
                  </a>
                  <div className="text-sm text-night-400">24 Stunden erreichbar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-taxi-500">
              Rechtliches
            </h3>
            <nav className="mt-6 grid gap-3">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-night-400 transition-colors hover:text-taxi-400"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-night-700 pt-8 sm:flex-row">
          <div className="text-sm text-night-400">
            © {currentYear} Taxi 70. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-6 text-sm text-night-400">
            <span>Münster / Hiltrup</span>
            <span className="h-2 w-2 rounded-full bg-taxi-500" />
            <span>Seit 2007</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
