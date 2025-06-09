import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: "articles",
    limit: 0,
    where: {},
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return [
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/post/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

