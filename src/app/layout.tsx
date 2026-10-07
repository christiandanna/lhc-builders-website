import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/company";
import { generalContractorSchema, websiteSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

// Self-hosted by Next at build time: no third-party request, no layout shift.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Custom Home Builder in Old Metairie & New Orleans`,
    template: `%s | ${company.name}`,
  },
  description: company.positioning,
  applicationName: company.name,
  keywords: [
    "LHC Builders",
    "custom home builder Old Metairie",
    "custom homes New Orleans",
    "Metairie home builder",
    "luxury home builder New Orleans",
    "residential contractor Metairie",
    "custom kitchens New Orleans",
    "Louisiana custom homes",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  formatDetection: { telephone: true, address: false, email: true },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  other: {
    "format-detection": "telephone=yes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b1d1e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <JsonLd data={[generalContractorSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
