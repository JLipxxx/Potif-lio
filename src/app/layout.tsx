import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const staticAssetBase = process.env.NODE_ENV === "production" ? "/Potif-lio" : "";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "João Felipe | Secure Portfolio Dashboard",
  description: "Analista de Cibersegurança focado em operações Blue Team. Visualize meu arsenal, conquistas e experiência através de uma interface híbrida interativa (CLI + GUI).",
  keywords: ["Cibersegurança", "Desenvolvedor", "Blue Team", "Next.js", "React", "CrowdStrike", "Defesa", "SOC", "João Felipe Silva Freitas"],
  authors: [{ name: "João Felipe Silva Freitas" }],
  openGraph: {
    title: "João Felipe | Secure Portfolio Dashboard",
    description: "Analista de Cibersegurança focado em operações Blue Team.",
    url: "https://joaofelipe-freitas.github.io/Potif-lio", 
    siteName: "João Felipe Portfolio",
    images: [
      {
        url: "https://joaofelipe-freitas.github.io/Potif-lio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Secure Portfolio Dashboard Preview"
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Felipe | Secure Portfolio Dashboard",
    description: "Analista de Cibersegurança focado em operações Blue Team.",
    images: ["https://joaofelipe-freitas.github.io/Potif-lio/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href={process.env.NODE_ENV === 'production' ? '/Potif-lio/manifest.json' : '/manifest.json'} />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased font-sans flex flex-col min-h-screen lg:h-screen lg:overflow-hidden selection:bg-brand-neon selection:text-brand-bg bg-brand-bg`}
      >
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        {/* CTF breadcrumbs: external asset (avoid inline script in <head>). */}
        <Script
          id="ctf-console-intel"
          src={`${staticAssetBase}/ctf-console-intel.js`}
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
