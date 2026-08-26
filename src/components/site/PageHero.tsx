import { Container } from '@/components/ui/Container';

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-black/10 bg-white">
      <Container className="py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-base text-black/70 md:text-lg">{subtitle}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

