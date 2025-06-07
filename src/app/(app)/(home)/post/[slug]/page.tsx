import ArticleViewOne, {
  ArticleSkeleton,
} from "@/modules/article/ui/component/ArticleViewOne";
import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Footer from "../../_component/Footer";
import { Metadata } from "next";
import { fetchArticleBySlug } from "@/lib/fetchArticleBySlug";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchArticleBySlug(slug);

    return {
      title: data.title,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        images: data.poster?.url
          ? [
              {
                url: data.poster.url,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.log(error);
    
    return {
      title: "Article Not Found",
      description: "The requested post could not be found.",
    };
  }
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleViewOne slug={slug} />
        <Footer />
      </Suspense>
    </HydrationBoundary>
  );
}

export default page;
