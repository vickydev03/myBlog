"use client";
import NotFound from "./not-found";
import ErrorPage from "@/components/ErrorPage";
import { notFound } from "next/navigation";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  // Handle Next.js not found errors
  if (error.digest?.includes("NEXT_NOT_FOUND")) {
    notFound();
  }

  // Handle custom not found errors
  if (
    error.message === "This post is not found" ||
    error.cause === "NOT_FOUND" ||
    error.name === "NotFoundError"
  ) {
    return <NotFound />;
  }

  // Handle all other errors
  return <ErrorPage error={error} />;
}
