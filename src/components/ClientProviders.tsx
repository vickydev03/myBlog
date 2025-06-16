// components/ClientProviders.tsx
"use client";

import { Toaster } from "@/components/ui/sonner";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";
// import PageTransition from "@/components/Pagetransition";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <PageTransition>
    <>
      {children}
      <Toaster />
    </>
    // </PageTransition>
  );
}
