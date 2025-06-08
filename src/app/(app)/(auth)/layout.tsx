import React from "react";
import { Lora } from "next/font/google";
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display:"swap"
});

function layout({ children }: { children: React.ReactNode }) {
  return <div className={lora.className}>{children}</div>;
}

export default layout;
