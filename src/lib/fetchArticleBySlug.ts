// lib/fetch-article.ts
import { caller } from "@/trpc/server";
import { cache } from "react";
export const fetchArticleBySlug = cache(async (slug: string) => {
  return await caller.articles.getOne({ slug });
});
