// app/layout.tsx (or layout.js)
"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
      layout
        key={pathname}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
