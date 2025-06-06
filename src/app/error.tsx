"use client";
import NotFound from "./(app)/not-found";
import ErrorPage from "@/components/ErrorPage";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  // console.log(error,"errors");

  // if (error.digest?.includes("NEXT_NOT_FOUND")) {
  //   // Re-throw to trigger not-found.js instead
  //   notFound();
  // }
  if (error.message == "This post is not found") {
    // notFound();
    return <NotFound />;
  }

  return <ErrorPage error={error} />;
}
