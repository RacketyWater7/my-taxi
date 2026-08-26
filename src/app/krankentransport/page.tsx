import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { ServicesGrid } from '@/components/site/ServicesGrid';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Krankentransport',
  description:
    'Krankenfahrten in Münster: zum Arzt, Krankenhaus oder zur Therapie – Taxi 70 bringt Sie zuverlässig ans Ziel.',
};

export default function MedicalTransportPage() {
  return (
    <>
      <AttentionBanner />
      <PageHero
        title="Krankentransport"
        subtitle="Sie müssen zum Arzt oder ins Krankenhaus? Unsere freundlichen Fahrer bringen Sie ans Ziel."
      />

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-xl font-black tracking-tight">Krankenfahrten</h2>
            <p className="mt-3 text-black/70">
              Ob Arzttermin, Klinik, Reha oder Therapie: Wir holen Sie pünktlich ab
              und fahren Sie sicher zu Ihrem Termin. Auf Wunsch können Hin- und
              Rückfahrt direkt mitgeplant werden.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-black">Pünktlich</div>
                <div className="mt-1 text-sm text-black/70">
                  Terminzeiten im Blick – zuverlässige Abholung.
                </div>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-black">Diskret & freundlich</div>
                <div className="mt-1 text-sm text-black/70">
                  Professioneller Service mit Rücksicht auf Ihre Situation.
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-taxi-yellow/20 p-6">
              <div className="text-sm font-black">Tipp</div>
              <p className="mt-2 text-sm text-black/80">
                Falls ein Rollstuhltransport nötig ist, wählen Sie im Formular auf
                der Startseite die Option „Rollstuhltransport“.
              </p>
              <div className="mt-5">
                <ButtonLink href="/#bestellen">Taxi bestellen</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServicesGrid className="border-t border-black/10" />
    </>
  );
}

