import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { ServicesGrid } from '@/components/site/ServicesGrid';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Rollstuhltransport',
  description:
    'Rollstuhltransport in Münster: barrierearme, zuverlässige Fahrten – Taxi 70 hilft Ihnen sicher ans Ziel.',
};

export default function WheelchairTransportPage() {
  return (
    <>
      <AttentionBanner />
      <PageHero
        title="Rollstuhltransport"
        subtitle="Barrierearm unterwegs – wir unterstützen Sie bei der Fahrt in Münster und Umgebung."
      />

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-xl font-black tracking-tight">
              Rollstuhltransport in Münster
            </h2>
            <p className="mt-3 text-black/70">
              Wenn Sie Unterstützung benötigen, planen wir die Fahrt mit Ihnen
              gemeinsam: Abholort, Ziel, Begleitperson und besondere Hinweise.
              Bitte geben Sie im Formular an, dass ein Rollstuhltransport nötig ist.
            </p>
            <ul className="mt-6 grid list-disc gap-2 pl-5 text-sm text-black/80">
              <li>Terminfahrten (Arzt, Therapie, Klinik)</li>
              <li>Abholung zuhause oder an Einrichtungen</li>
              <li>Hinweisfeld für Details (z.B. Stockwerk, Eingang, Rampe)</li>
            </ul>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-black">Jetzt anfragen</div>
              <p className="mt-2 text-sm text-black/70">
                Nutzen Sie die Online-Anfrage oder rufen Sie uns an.
              </p>
              <div className="mt-5">
                <ButtonLink href="/#bestellen">Zum Formular</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServicesGrid className="border-t border-black/10" />
    </>
  );
}

