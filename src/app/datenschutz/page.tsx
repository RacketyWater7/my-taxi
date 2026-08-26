import type { Metadata } from 'next';

import { AttentionBanner } from '@/components/site/AttentionBanner';
import { PageHero } from '@/components/site/PageHero';
import { Container } from '@/components/ui/Container';
import { address, phoneNumber } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung für diese Website (Replica).',
};

export default function PrivacyPage() {
  return (
    <>
      <AttentionBanner />
      <PageHero
        title="Datenschutz­erklärung"
        subtitle="Letzte Änderung: 14.07.2024 (Inhalt angelehnt an die Struktur der Originalseite)"
      />

      <section className="py-12">
        <Container className="space-y-10">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">Vorwort</h2>
            <p className="mt-3 text-sm text-black/70">
              Datenschutz hat einen besonders hohen Stellenwert. Die Nutzung
              dieser Website ist grundsätzlich ohne Angabe personenbezogener
              Daten möglich. Wenn Sie über das Anfrageformular Kontakt aufnehmen,
              werden die von Ihnen übermittelten Daten zur Bearbeitung der Anfrage
              verarbeitet.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">Allgemeine Hinweise</h2>
            <p className="mt-3 text-sm text-black/70">
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können. Diese Erklärung informiert darüber,
              welche Daten wir erheben, wofür wir sie nutzen und wie das geschieht.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">
              Datenerfassung auf unserer Website
            </h2>
            <h3 className="mt-4 text-sm font-black">Wer ist verantwortlich?</h3>
            <p className="mt-2 text-sm text-black/70">
              Verantwortliche Stelle (in Anlehnung an die Originalseite):{' '}
              <br />
              Taxibetrieb Sajid Mehmood, {address.street}, {address.zip}{' '}
              {address.city}, Telefon: {phoneNumber}
            </p>

            <h3 className="mt-5 text-sm font-black">Wie erfassen wir Daten?</h3>
            <p className="mt-2 text-sm text-black/70">
              Daten werden zum einen dadurch erhoben, dass Sie sie uns mitteilen
              (z.B. über das Anfrageformular). Andere Daten können automatisch beim
              Besuch der Website durch IT-Systeme erfasst werden (z.B. Server-Log-Dateien).
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">
              Cookies & Analyse-Tools
            </h2>
            <p className="mt-3 text-sm text-black/70">
              Diese Replica setzt standardmäßig keine Tracking-Tools ein. Je nach
              Hosting/Integration (z.B. Vercel Analytics) können zusätzliche Dienste
              aktiviert werden. Prüfen Sie dies vor Livegang.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black tracking-tight">Kontaktformular</h2>
            <p className="mt-3 text-sm text-black/70">
              Wenn Sie uns per Formular Anfragen zukommen lassen, werden Ihre Angaben
              aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten
              zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei
              uns verarbeitet. Die Übermittlung kann optional an eine von Ihnen
              konfigurierte Webhook-URL weitergeleitet werden (siehe Projekt-README).
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-taxi-yellow/20 p-6">
            <h2 className="text-lg font-black tracking-tight">Ihre Rechte</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-black/80">
              <li>Auskunft über gespeicherte Daten</li>
              <li>Berichtigung oder Löschung</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

