import type { Metadata } from "next";
import { Cinzel, Merriweather, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { getSiteSettings } from "@/data/site";

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

export const metadata: Metadata = {
  title: "The Nature Club",
  description: "Landscape & travel photography tours through India's wild places.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${merriweather.variable} ${nunitoSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex-1 pt-14">{children}</div>
        <SiteFooter socialLinks={settings?.socialLinks} />
      </body>
    </html>
  );
}
