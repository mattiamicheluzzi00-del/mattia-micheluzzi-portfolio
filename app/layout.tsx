import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mattiamicheluzzi.com"),
  title: {
    default: "Mattia Micheluzzi | Tecnologia, Droni & Creativita",
    template: "%s | Mattia Micheluzzi"
  },
  description:
    "Portfolio personale premium di Mattia Micheluzzi, studente e creator in Alto Adige appassionato di tecnologia, droni, videografia e biking.",
  keywords: [
    "Mattia Micheluzzi",
    "pilota drone",
    "Alto Adige",
    "DJI Mini 4 Pro",
    "tecnologia",
    "content creator",
    "videografia",
    "biking"
  ],
  authors: [{ name: "Mattia Micheluzzi" }],
  openGraph: {
    title: "Mattia Micheluzzi",
    description:
      "Appassionato di tecnologia, pilota drone, creator e studente in Alto Adige.",
    url: "https://mattiamicheluzzi.com",
    siteName: "Mattia Micheluzzi",
    images: [
      {
        url: "/images/south-tyrol-hero.png",
        width: 1672,
        height: 941,
        alt: "South Tyrol mountain landscape photographed at sunset"
      }
    ],
    locale: "it_IT",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattia Micheluzzi",
    description:
      "Appassionato di tecnologia, pilota drone, creator e studente in Alto Adige.",
    images: ["/images/south-tyrol-hero.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} bg-white font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
