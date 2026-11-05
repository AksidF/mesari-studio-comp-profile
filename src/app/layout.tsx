import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Montserrat({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "id_ID", siteName: site.name, title: site.title, description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0b1b3a" };

const SEEN = `try{if(sessionStorage.getItem("seen"))document.documentElement.classList.add("seen");else sessionStorage.setItem("seen","1")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: SEEN }} /></head>
      <body>{children}</body>
    </html>
  );
}
