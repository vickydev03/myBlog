import { unstable_cache } from "next/cache";
import { Where } from "payload";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const payload = await getPayload({
  config: configPromise,
});

export const getCachedArticles = (where: Where, page: number, limit: number) =>
  unstable_cache(
    async () => {
      return await payload.find({
        collection: "articles",
        sort: "-createdAt",
        depth: 3,
        where,
        select: {
          author: true,
          description: true,
          slug: true,
          poster: true,
          title: true,
          createdAt: true,
          tags: true,
        },
        page,
        limit,
      });
    },
    [`articles-${JSON.stringify(where)}-page:${page}-limit:${limit}`],
    {
      revalidate: 60,
    }
  )();

export const getCachedArticleBySlug = (slug: string, where: Where) =>
  unstable_cache(
    async () => {
      const article = await payload.find({
        collection: "articles",
        where,
        limit: 1,
        select: {
          meta: true,
          content: true,
          poster: true,
          title: true,
          author: true,
          category: true,
          slug: true,
          createdAt: true,
          updatedAt: true,
          "read-time": true,
          tags: true,
          description: true,
        },
      });

      return article;
    },
    [`article-${slug}-${where}`], // Cache key
    { revalidate: 60 } // 1-minute revalidation
  )();
