import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import LoginView from "@/modules/auth/ui/view/LoginView";
import { Metadata } from "next";
// import { useRouter } from "next/router";
// import {useRouter} from "next/";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description:
    "Login to Finoblitz to manage insights, explore smart strategies, and access your personalized dashboard securely.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login to Your Finoblitz Account",
    description:
      "Access your dashboard, manage your financial goals, and stay ahead with Finoblitz.",
    url: "https://www.finoblitz.com/login",
    type: "website",
    // images: [
    //   {
    //     url: "https://www.finoblitz.com/assets/images/login-preview.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Finoblitz Login Page Preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Your Finoblitz Account",
    description:
      "Secure access to your financial dashboard. Stay updated with Finoblitz insights.",
    // images: ["https://www.finoblitz.com/assets/images/login-preview.jpg"],
  },
};

const Login = async () => {
  const session = await caller.auth.session();
  // console.log(session.user?.roles?.includes("admin"), "babu");

  // If user is logged in, redirect immediately
  if (session?.user) {
    redirect("/");
  }

  // Only render LoginView if user is not logged in
  return <LoginView />;
};

export default Login;
