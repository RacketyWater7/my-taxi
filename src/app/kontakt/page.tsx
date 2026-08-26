import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { Container } from '@/components/ui/Container';
import { address, phoneHref, phoneNumber } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Kontaktmöglichkeiten',
  description: 'Kontakt zu Taxi 70: telefonisch 24/7 erreichbar und Standort in Münster.',
};

export default function ContactPage() {
  // Coordinates from the original site's geo meta tags.
  const lat = 51.904241;
  const lon = 7.636477;
  const bbox = [
    lon - 0.02,
    lat - 0.01,
    lon + 0.02,
    lat + 0.01,
  ]
    .map((n) => n.toFixed(6))
    .join('%2C');
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <>
      <AttentionBanner />
      <PageHero title="Kontaktmöglichkeiten" subtitle="Wir sind 24 Stunden erreichbar." />

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-black">Telefon</div>
              <a
                href={phoneHref}
                className="mt-2 inline-flex text-2xl font-black tracking-tight hover:opacity-80"
              >
                {phoneNumber}
              </a>
              <div className="mt-1 text-sm text-black/70">24 Stunden erreichbar</div>

              <div className="mt-6 text-sm font-black">Adresse</div>
              <div className="mt-2 text-sm text-black/70">
                <div>{address.street}</div>
                <div>
                  {address.zip} {address.city}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-taxi-yellow/20 px-4 py-3 text-sm text-black/80">
                Tipp: Für Fahrten bitte die Startseite nutzen und das Formular
                „Taxi bestellen / Preisanfrage“ ausfüllen.
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <iframe
                title="OpenStreetMap"
                src={osmEmbed}
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

