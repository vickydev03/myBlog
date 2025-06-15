import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL environment variable is not set");
  }

  // Static pages
  const staticPages = [
    {
      url: escapeXml(`${baseUrl}/about`),
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: escapeXml(`${baseUrl}/contact-us`),
      lastModified: new Date(),
      priority: 0.5,
    },
  ];

  // Fetch dynamic articles
  const posts = await payload.find({
    collection: "articles",
    limit: 0,
  });

  // Fetch dynamic categories
  const categories = await payload.find({
    collection: "categories",
    limit: 0,
  });

  const postUrls = posts.docs.map(({ slug, updatedAt }) => ({
    url: escapeXml(`${baseUrl}/post/${slug}`),
    lastModified: new Date(updatedAt),
    priority: 0.8,
  }));

  const categoryUrls = categories.docs.map(({ slug, updatedAt }) => ({
    url: escapeXml(`${baseUrl}/category/${slug}`),
    lastModified: new Date(updatedAt),
    priority: 0.6,
  }));

  return [...staticPages, ...postUrls, ...categoryUrls];
}
