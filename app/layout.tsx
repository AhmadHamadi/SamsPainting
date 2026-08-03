import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { businessSchema, websiteSchema } from '@/lib/schema';

// next/font downloads and SELF-HOSTS these as WOFF2 at build time, so there is
// no render-blocking request to a third-party font CDN and no FOUT.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sam's Painting | Painters in Hamilton, Ontario",
    template: "%s | Sam's Painting",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${site.url}/`,
    siteName: site.name,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#1D3A5F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {/* Site-wide entity graph, present in the initial HTML for crawlers. */}
        <JsonLd data={[businessSchema(), websiteSchema()]} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        {/* Bottom padding clears the mobile sticky call bar. */}
        <main id="main" className="pb-24 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
