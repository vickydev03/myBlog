import ArticleViewOne, { ArticleSkeleton } from "@/modules/article/ui/component/ArticleViewOne";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Footer from "../../_component/Footer";
export const dynamic='force-dynamic'


async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.articles.getOne.queryOptions({
      slug,
    })
  );
  void queryClient.prefetchQuery(
    trpc.articles.trending.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ArticleSkeleton/>}>
        <ArticleViewOne slug={slug} />
        <Footer/>
      </Suspense>
    </HydrationBoundary>
  );
}

export default page;
