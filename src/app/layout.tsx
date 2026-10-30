import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Script from "next/script";
import { company, contact, hasAddress, site } from "@/content/site";
import { services } from "@/content/content";
import { instagramHref } from "@/lib/links";
import { MotionProvider } from "@/components/ui/motion-provider";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${company.name}` },
  description: site.seo.description,
  applicationName: company.name,
  keywords: site.seo.keywords,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: company.name,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  // Bloqueia a indexação até a publicação oficial (NEXT_PUBLIC_ALLOW_INDEXING=true).
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#15191f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Dados estruturados do auto center (schema.org AutoRepair). Campos vazios são omitidos.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: company.name,
  url: site.url,
  description: site.seo.description,
  ...(hasAddress && {
    address: {
      "@type": "PostalAddress",
      streetAddress: [contact.address.street, contact.address.complement].filter(Boolean).join(", "),
      ...(contact.address.zip && { postalCode: contact.address.zip }),
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      addressCountry: "BR",
    },
  }),
  ...(contact.whatsapp && { telephone: `+${contact.whatsapp.replace(/\D/g, "")}` }),
  ...(contact.address.district && { areaServed: `${contact.address.city} - ${contact.address.state}` }),
  ...(contact.openingHours.length > 0 && {
    openingHoursSpecification: contact.openingHours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    })),
  }),
  makesOffer: services.items.map((item) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: item.title },
  })),
  ...(instagramHref && { sameAs: [instagramHref] }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${manrope.variable}`}>
      <head>
        {/* Sem JavaScript, as animações de entrada não rodam: mostra o conteúdo direto. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-graphite"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
