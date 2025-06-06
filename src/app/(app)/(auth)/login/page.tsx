import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import LoginView from "@/modules/auth/ui/view/LoginView";
// import { useRouter } from "next/router";
// import {useRouter} from "next/";
export const dynamic = "force-dynamic";

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
