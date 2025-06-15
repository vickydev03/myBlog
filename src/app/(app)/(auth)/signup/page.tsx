import SignupView from "@/modules/auth/ui/view/SignupView";
import { caller } from "@/trpc/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Your Finoblitz Account – Start Your Financial Journey",
  description:
    "Sign up on Finoblitz to access financial insights, smart money strategies, and your personalized dashboard.",
  robots: {
    index: true, // Allow indexing
    follow: true,
  },
  openGraph: {
    title: "Sign Up for Finoblitz – Smarter Financial Growth Starts Here",
    description:
      "Join Finoblitz to gain access to expert financial tools, personalized dashboards, and strategies to grow your wealth smarter.",
    url: "https://www.finoblitz.com/signup",
    type: "website",
    // images: [
    //   {
    //     url: "https://www.finoblitz.com/assets/images/signup-preview.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Finoblitz Signup Page Preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Finoblitz – Your Personalized Financial Dashboard Awaits",
    description:
      "Create a Finoblitz account to manage insights, track goals, and make smarter money decisions with ease.",
    // images: ["https://www.finoblitz.com/assets/images/signup-preview.jpg"],
  },
};

async function page() {
  const session = await caller.auth.session();
  if (session?.user) {
    redirect("/");
  }
  return <SignupView />;
}

export default page;
