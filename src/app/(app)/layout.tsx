import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/Pagetransition";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display:"swap"
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  title: {
    default:"FinoBlitz",
    template:"%s -FinoBlitz"
  },
  description: "Where tech meet finance:",
  twitter:{
    card:"summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> */}
      </head>
      <body className={`${lora.variable} font-serif antialiased `}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <PageTransition>{children}</PageTransition>
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
