import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Impressum',
};

export default function ImprintPage() {
  return (
    <>
      <AttentionBanner />
      <PageHero title="Impressum" subtitle="Angaben gemäß § 5 TMG" />

      <section className="py-12">
        <Container className="space-y-8">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">Unternehmen</h2>
            <div className="mt-3 space-y-1 text-sm text-black/80">
              <div>Taxibetrieb Sajid Mehmood</div>
              <div>Inhaber: Sajid Mehmood</div>
              <div>Anschrift: Fuggerstraße 15, 48165 Münster, Deutschland</div>
              <div>Telefon: 0172 / 58 02 35 7</div>
              <div className="text-black/60">
                E-Mail: (auf der Originalseite ggf. JavaScript-geschützt)
              </div>
              <div>Steuernummer: 333/5087/2866</div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-taxi-yellow/20 p-6">
            <h2 className="text-lg font-black tracking-tight">Hinweis</h2>
            <p className="mt-2 text-sm text-black/80">
              Dieses Projekt ist eine Next.js-Neuumsetzung der öffentlich
              einsehbaren Inhalte/Struktur von taxi70.de (Design modernisiert).
              Rechtstexte sollten vor produktivem Einsatz juristisch geprüft
              werden.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

