import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import ClientProviders from "@/components/ClientProviders";
import { GoogleAnalytics } from "@next/third-parties/google";
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});
// import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://finoblitz.com"
  ),
  title: "FinoBlitz",
  applicationName: "FinoBlitz",
  keywords: [
    "Finance",
    "Business",
    "AI tools",
    "Automation",
    "Startups",
    "Tech trends",
    "Productivity",
    "Investment",
    "Data science",
    "Inovation",
    "Quant finance",
    "Loan & Credit",
  ],

  authors: [{ name: "FinoBlitz Team", url: "https://finoblitz.com" }],
  description:
    "FinoBlitz shares sharp insights on finance, tech, AI, and business to help startups and pros grow smarter using modern tools and strategies.",
  creator: "FinoBiltz team",

  twitter: {
    card: "summary_large_image",
    title: "FinoBlitz",
    description:
      "Insights on finance, tech, and automation to help startups grow smarter.",
    creator: "@FinoBiltz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EYB0HE5G5T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EYB0HE5G5T');
        `}</Script>
      </head> */}
      <body className={lora.className}>
        <GoogleAnalytics gaId="G-EYB0HE5G5T" />

        <SpeedInsights />
        <Analytics />
        <NuqsAdapter>
          <TRPCReactProvider>
            <ClientProviders>{children}</ClientProviders>
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
