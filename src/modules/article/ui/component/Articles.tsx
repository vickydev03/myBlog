"use client";
import React, { Suspense } from "react";
import ArticlesList from "./ArticlesList";
import { ArticleCardSkeleton } from "./ArticleCard";
import { DEFAULT_LIMIT } from "@/constant";

function Articles({ categorySlug }: { categorySlug?: string }) {
  return (
    <Suspense fallback={<Loader />}>
      <ArticlesList categorySlug={categorySlug} />
    </Suspense>
  );
}

export default Articles;

export const Loader = () => {
  return (
    <div className="w-full">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};
