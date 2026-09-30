import type { Metadata, Viewport } from "next";
import { Cinzel, Merriweather, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { ContactProvider } from "@/components/contact/contact-dialog";
import { DEFAULT_DESCRIPTION, SITE_NAME, getContact, getSiteSettings } from "@/data/site";
import { SITE_URL, organizationJsonLd, pageAlternates, pageOpenGraph, websiteJsonLd } from "@/lib/seo";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings?.siteTitle || SITE_NAME;
  const description = settings?.description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${name} — Landscape & Travel Photography Tours`,
      template: `%s | ${name}`,
    },
    description,
    applicationName: name,
    // No root canonical: it would be inherited by every page that doesn't set one (404s included).
    alternates: { types: pageAlternates("/")?.types },
    openGraph: pageOpenGraph({
      path: "/",
      siteName: name,
      description,
      image: settings?.heroImageUrl,
      imageAlt: settings?.heroImageAlt,
    }),
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    // favicon.ico is emitted from src/app/favicon.ico.
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fff7f1",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const contact = getContact(settings);

  return (
    <html
      lang="en-IN"
      className={`${cinzel.variable} ${merriweather.variable} ${nunitoSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(settings, contact), websiteJsonLd(settings)]} />
        <ContactProvider>
          <SiteHeader />
          <div className="flex-1 pt-(--header-h)">{children}</div>
          <SiteFooter contact={contact} />
        </ContactProvider>
      </body>
    </html>
  );
}
