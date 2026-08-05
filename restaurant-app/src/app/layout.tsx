import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../assets/css/globals.css";
import { InstalledDateProvider } from "@/providers/InstalledDateProvider";




const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donomi Pizza - Notre Carte Signature",
  description: "Découvrez notre menu signature. Le savoir-faire artisanal italien livré chez vous.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Donomi Pizza - Notre Carte Signature",
    description: "Découvrez notre menu signature. Le savoir-faire artisanal italien livré chez vous.",
    url: "https://donomispizza.vercel.app/",
    siteName: "Donomi Pizza",
    images: [
      {
        url: "/images/capricciosa.webp",
        width: 1200,
        height: 630,
        alt: "Donomi Pizza - Notre Carte Signature",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  
};

import { ClientShell } from "../components";
import { ThemeProvider } from "@/context/ThemeContext";

export default function MiseEnPagePrincipale({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InstalledDateProvider>
          <ThemeProvider>
            <ClientShell>{children}</ClientShell>
          </ThemeProvider>
        </InstalledDateProvider>
      </body>
    </html>
  );
}
