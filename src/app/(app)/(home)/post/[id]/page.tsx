import ArticleViewOne, { ArticleSkeleton } from "@/modules/article/ui/component/ArticleViewOne";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Footer from "../../_component/Footer";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.articles.getOne.queryOptions({
      id,
    })
  );
  void queryClient.prefetchQuery(
    trpc.articles.trending.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ArticleSkeleton/>}>
        <ArticleViewOne id={id} />
        <Footer/>
      </Suspense>
    </HydrationBoundary>
  );
}

export default page;
