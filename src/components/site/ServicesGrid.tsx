import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/cn';

const services = [
  {
    title: 'City Transfer',
    description: 'Wir bringen Sie ohne Umwege an Ihren Wunsch-Zielort!',
    href: '/taxi70-in-muenster',
    icon: '/inc/img/services/services-1.png',
  },
  {
    title: 'Krankenfahrten',
    description:
      'Sie müssen zum Arzt oder ins Krankenhaus? Unsere freundlichen Fahrer bringen Sie ans Ziel.',
    href: '/krankentransport',
    icon: '/inc/img/services/services-2.png',
  },
  {
    title: 'Flughafen Transfer',
    description: 'Kein Flughafen ist uns zu weit. Mit uns verpassen Sie nie mehr Ihren Flug.',
    href: '/flughafentransfer',
    icon: '/inc/img/services/services-3.png',
  },
  {
    title: 'Gepäck Transport',
    description:
      'Taxi70 kümmert sich darum, dass Ihr Gepäck dort landet wo es hin gehört.',
    href: '/transport',
    icon: '/inc/img/services/services-4.png',
  },
] as const;

export function ServicesGrid({ className }: { className?: string }) {
  return (
    <section className={cn('py-14', className)} aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-black/50">
              Taxi70
            </div>
            <h2
              id="services-title"
              className="mt-2 text-2xl font-black tracking-tight md:text-3xl"
            >
              Unsere Services
            </h2>
          </div>
          <Link
            href="/kontakt"
            className="hidden text-sm font-semibold text-black/70 underline hover:text-black md:inline"
          >
            Kontakt aufnehmen
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src={s.icon}
                alt=""
                width={72}
                height={72}
                className="h-16 w-16"
              />
              <div className="mt-5 text-lg font-black tracking-tight">
                {s.title}
              </div>
              <p className="mt-2 text-sm text-black/70">{s.description}</p>
              <div className="mt-5 text-sm font-semibold text-black/70 group-hover:text-black">
                Mehr erfahren →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

