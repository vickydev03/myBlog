import ArticleViewOne, {
  ArticleSkeleton,
} from "@/modules/article/ui/component/ArticleViewOne";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Footer from "../../_component/Footer";

import { Metadata } from "next";
import { fetchArticleBySlug } from "@/lib/fetchArticleBySlug";
import configPromise from "@payload-config";

import { getPayload } from "payload";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchArticleBySlug(slug);

    // console.log(data, "meta");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://finoblitz.com";
    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_APP_URL environment variable is not set");
    }
    return {
      title: data.meta?.title,
      description: data.meta?.description,
      openGraph: {
        title: data.meta?.title as string,
        description: data.description,
        images: data.meta?.image
          ? [
              {
                url: `${baseUrl}${data.meta.image.url}`,
                width: 1200,
                height: 630,
                alt: data.meta.image.alt,
              },
            ]
          : [],
      },
      alternates: {
        canonical: `${baseUrl}/post/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: data.meta?.title || data.title,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      title: "Article Not Found",
      description: "The requested post could not be found.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
      },
    };
  }
}

export async function generateStaticParams() {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_APP_URL}/api/articles?depth=2&select[slug]=true&limit=30`
  // );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch article slugs");
  // }

  // const json = await res.json();
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "articles",
    pagination: false,
    limit: 30,
  });

  return data.docs.map((e: { slug: string }) => ({
    slug: e.slug,
  }));
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getQueryClient();
  const article = await fetchArticleBySlug(slug);
  queryClient.setQueryData(trpc.articles.getOne.queryKey({ slug }), article);
  // void queryClient.prefetchQuery(
  //   trpc.articles.getOne.queryOptions({
  //     slug,
  //   })
  // );
  void queryClient.prefetchQuery(trpc.articles.trending.queryOptions());

  if (!article) {
    return notFound();
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ArticleSkeleton />}>
          <ArticleViewOne slug={slug} />
          <Footer />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default page;
