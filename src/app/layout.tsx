import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import './globals.css';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';

export const metadata: Metadata = {
  title: {
    default: 'Taxi 70 – Ihr Taxi in Münster',
    template: '%s | Taxi 70',
  },
  description:
    'Taxi 70 in Münster / Hiltrup: City Transfer, Krankenfahrten, Flughafentransfer und Transport. 24/7 erreichbar.',
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Taxi 70 – Ihr Taxi in Münster',
    description:
      'Taxi 70 in Münster / Hiltrup: City Transfer, Krankenfahrten, Flughafentransfer und Transport.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F2E12D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-dvh bg-white text-taxi-black antialiased">
        <Script
          id="org-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Taxi 70',
              legalName: 'Taxi Mehmood 24H in Münster',
              url: 'https://taxi70.de/',
              description: 'Taxiunternehmen: Taxi Hiltrup Nr 70 in Münster-Hiltrup',
              foundingDate: '2007',
              founders: [{ '@type': 'Person', name: 'Sajid Mehmood' }],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Fugger Straße 15',
                addressLocality: 'Münster',
                postalCode: '48165',
                addressCountry: 'DE',
                addressRegion: 'Nordrhein-Westfalen',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'reservations',
                telephone: '+49-172-5802357',
              },
              sameAs: [
                'https://de-de.facebook.com/taxihiltrupm/',
                'https://www.youtube.com/channel/UCrf94I3wUZKT5ZWpZ55cVVQ',
              ],
            }),
          }}
        />
        <MotionProvider>
          <Header />
          <main className="min-h-[calc(100dvh-64px)]">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

