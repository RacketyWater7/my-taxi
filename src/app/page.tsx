import Image from 'next/image';

import { FadeIn } from '@/components/motion/FadeIn';
import { BookingForm } from '@/components/site/BookingForm';
import { FloatingCallButton } from '@/components/site/FloatingCallButton';
import { ServicesGrid } from '@/components/site/ServicesGrid';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { phoneHref, phoneNumber } from '@/lib/navigation';

export default function HomePage() {
  return (
    <>
      {/* WORLD CLASS YELLOW TAXI Hero Section with Background Image */}
      <section className="relative min-h-[95vh] overflow-hidden bg-taxi-500">
        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/inc/img/hero/benny-rotlevy-ZAtYVH0tfQY-unsplash.jpg"
            alt="Taxi Service"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          {/* Yellow overlay with gradient for better yellow theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-taxi-500/92 via-taxi-500/88 to-taxi-400/85" />
          {/* Stronger dark overlay for much better text contrast */}
          <div className="absolute inset-0 bg-night-900/45" />
        </div>

        <Container className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
            {/* Left column - Content - Fixed z-index */}
            <FadeIn className="relative z-20 max-w-2xl lg:max-w-xl xl:max-w-2xl">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 rounded-full bg-night-900 px-5 py-2.5 shadow-2xl border-2 border-taxi-500">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-taxi-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-taxi-500" />
                </span>
                <span className="text-sm font-black text-taxi-400 tracking-wide">
                  24/7 ERREICHBAR IN MÜNSTER
                </span>
              </div>

              {/* Bold Headline with better contrast */}
              <h1 className="mt-8 text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
                IHR
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-night-900 px-6 py-2 text-taxi-400 shadow-2xl">TAXI</span>
                  <span className="absolute -inset-1 bg-night-900/60 blur-xl" />
                </span>
                <br />
                <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">IN MÜNSTER</span>
              </h1>

              {/* Subtitle with better readability */}
              <div className="mt-8 relative">
                <p className="text-xl text-white font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:text-2xl leading-relaxed max-w-lg bg-night-900/50 backdrop-blur-sm px-4 py-3 rounded-xl">
                  City Transfer, Krankenfahrten, Flughafentransfer und Transport – 
                  <span className="text-taxi-300"> zuverlässig ans Ziel.</span>
                </p>
                <div className="mt-4 h-1 w-24 bg-taxi-400 rounded-full shadow-lg" />
              </div>

              {/* CTA Buttons with better readability */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/#bestellen"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-lg font-black text-night-900 shadow-2xl border-2 border-white transition-all duration-300 hover:bg-taxi-100 hover:scale-105 hover:shadow-glow-yellow"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Jetzt bestellen
                </a>
                <a
                  href={phoneHref}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border-3 border-white bg-white px-6 py-4 text-base font-black text-night-900 shadow-2xl transition-all duration-300 hover:bg-night-900 hover:text-taxi-400 hover:shadow-glow-yellow hover:scale-105"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-taxi-500 text-night-900 transition-all group-hover:bg-taxi-400 group-hover:scale-110">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="text-left">
                    <span className="block text-sm text-night-600 group-hover:text-taxi-300 font-medium">Direkt anrufen</span>
                    <span className="block text-xl font-black">{phoneNumber}</span>
                  </span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-14 flex flex-wrap gap-6">
                {[
                  { value: '24/7', label: 'Erreichbar' },
                  { value: '15+', label: 'Jahre Erfahrung' },
                  { value: '100%', label: 'Zuverlässig' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 bg-night-900/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-taxi-400/40">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-taxi-500 text-night-900 font-black text-lg shadow-lg">
                      {stat.value}
                    </div>
                    <span className="text-sm font-black text-white uppercase tracking-wide drop-shadow-md">{stat.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right column - Booking Form - Fixed z-index, higher to ensure it's on top */}
            <FadeIn delay={0.1} className="relative z-30 lg:sticky lg:top-24">
              <div className="relative">
                {/* Decorative glow */}
                <div className="absolute -inset-4 rounded-[2rem] bg-night-900/20 blur-2xl" />
                
                {/* Form card */}
                <div className="relative rounded-[2rem] border-4 border-white bg-white/98 backdrop-blur-xl p-6 shadow-2xl sm:p-8">
                  {/* Yellow accent corner */}
                  <div className="absolute -right-2 -top-2 h-20 w-20 bg-taxi-400 rounded-br-[2rem] rounded-tl-3xl shadow-xl" />
                  <div className="absolute -right-2 -top-2 h-16 w-16 bg-night-900 rounded-br-[1.5rem] flex items-center justify-center shadow-lg">
                    <svg className="h-8 w-8 text-taxi-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {/* Card header */}
                  <div className="mb-6 flex items-center justify-between border-b-2 border-night-100 pb-6 pt-2">
                    <div>
                      <h2 className="text-2xl font-black text-night-900">
                        Taxi bestellen
                      </h2>
                      <p className="mt-1 text-sm text-night-600 font-medium">
                        Schnell & einfach anfragen
                      </p>
                    </div>
                    <Image
                      src="/inc/img/logo_taxi70.webp"
                      alt=""
                      width={70}
                      height={26}
                      className="opacity-90"
                      style={{ height: 'auto' }}
                    />
                  </div>
                  <BookingForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <ServicesGrid />

      {/* Premium CTA Section */}
      <section className="relative overflow-hidden bg-night-900 py-24">
        {/* Stunning geometric background */}
        <div className="absolute inset-0">
          {/* Yellow glow */}
          <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-taxi-500/20 blur-[150px]" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-taxi-400/15 blur-[100px]" />
          
          {/* Taxi stripe pattern */}
          <div className="absolute inset-y-0 left-0 w-2 bg-taxi-500" />
          <div className="absolute inset-y-0 right-0 w-2 bg-taxi-500" />
          
          {/* Checkerboard accents */}
          <div className="absolute top-0 left-8 flex gap-0.5">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`h-3 w-6 ${i % 2 === 0 ? 'bg-taxi-500' : 'bg-transparent'}`} />
            ))}
          </div>
          <div className="absolute bottom-0 right-8 flex gap-0.5">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`h-3 w-6 ${i % 2 === 0 ? 'bg-taxi-500' : 'bg-transparent'}`} />
            ))}
          </div>
        </div>
        
        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full bg-taxi-500 px-6 py-2 mb-8 shadow-glow-yellow">
                <svg className="h-5 w-5 text-night-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-black text-night-900 uppercase tracking-wider">Sofort erreichbar</span>
              </div>
              
              <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
                Brauchen Sie ein{' '}
                <span className="text-taxi-400">Taxi</span>?
              </h2>
              <p className="mt-6 text-xl text-night-300 max-w-2xl mx-auto">
                Wir sind rund um die Uhr für Sie da – 24 Stunden, 7 Tage die Woche. 
                Ein Anruf genügt.
              </p>
              
              <div className="mt-10">
                <a
                  href={phoneHref}
                  className="group inline-flex items-center gap-4 rounded-2xl bg-taxi-500 px-10 py-6 text-xl font-black text-night-900 shadow-glow-yellow transition-all duration-300 hover:scale-105 hover:bg-taxi-400 hover:shadow-glow-yellow-strong"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-night-900 text-taxi-400 transition-transform group-hover:rotate-12">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  {phoneNumber}
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <FloatingCallButton />
    </>
  );
}
