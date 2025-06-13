import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import ClientProviders from "@/components/ClientProviders"; 

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://finoblitz.com"),
  title: {
    default: "FinoBlitz",
    template: "%s - FinoBlitz",
  },
  description:
    "FinoBlitz brings you sharp, actionable content on finance, tech, AI, business, and automation. Learn how startups and professionals can leverage modern tools to grow smarter — from finance basics to advanced tech strategies.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lora.className}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <ClientProviders>{children}</ClientProviders>
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
