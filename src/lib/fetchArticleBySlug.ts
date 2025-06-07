// lib/fetch-article.ts
import { caller } from "@/trpc/server";

export const fetchArticleBySlug = async (slug: string) => {
  return await caller.articles.getOne({ slug });
};
