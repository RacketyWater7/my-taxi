import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <div className="text-xs font-black uppercase tracking-widest text-black/50">
            404
          </div>
          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Seite nicht gefunden
          </h1>
          <p className="mt-3 text-sm text-black/70">
            Die Seite existiert nicht (oder wurde verschoben). Nutzen Sie die
            Navigation oder gehen Sie zurück zur Startseite.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Zur Startseite</ButtonLink>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

