import SignupView from "@/modules/auth/ui/view/SignupView";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic='force-dynamic'
async function page() {
  const session = await caller.auth.session();
  // console.log(session, "babu");
    if(session.user){
        redirect("/")
    }
  return <SignupView />;
}

export default page;
