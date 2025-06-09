import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Fetch articles
  const posts = await payload.find({
    collection: "articles",
    limit: 0,
    where: {},
  });

  // Fetch categories
  const categories = await payload.find({
    collection: "categories",
    limit: 0,
    where: {},
  });

  // Format article URLs
  const postUrls = posts.docs.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/post/${slug}`,
    lastModified: new Date(updatedAt),
    priority: 0.8,
  }));

  // Format category URLs
  const categoryUrls = categories.docs.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(updatedAt),
    priority: 0.6,
  }));

  return [...postUrls, ...categoryUrls];
}
