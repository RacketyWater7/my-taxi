import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { ServicesGrid } from '@/components/site/ServicesGrid';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Taxi 70 in Münster',
  description:
    'Taxi 70 in Münster/Hiltrup: City Transfer, Krankenfahrten, Flughafentransfer und Transport – 24/7 erreichbar.',
};

export default function MuensterPage() {
  return (
    <>
      <AttentionBanner />
      <PageHero
        title="Ihr Taxi in Münster"
        subtitle="Taxi 70 ist in Münster/Hiltrup und Umgebung für Sie unterwegs – zuverlässig, freundlich und flexibel."
      />

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-xl font-black tracking-tight">City Transfer</h2>
            <p className="mt-3 text-black/70">
              Ob Innenstadt, Hiltrup, Bahnhof oder Umgebung: Wir bringen Sie ohne
              Umwege an Ihren Wunsch-Zielort. Für Termine, Events oder einfach
              bequem von A nach B.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-black">Münster & Umgebung</div>
                <div className="mt-1 text-sm text-black/70">
                  Schnell verfügbar – auch in Randbezirken.
                </div>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-black">24/7 erreichbar</div>
                <div className="mt-1 text-sm text-black/70">
                  Anrufen oder online anfragen.
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-taxi-yellow/20 p-6">
              <div className="text-sm font-black">Online bestellen</div>
              <p className="mt-2 text-sm text-black/80">
                Nutzen Sie das Anfrageformular mit Abholzeit, Route und
                Personenanzahl.
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

