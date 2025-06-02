import { DEFAULT_LIMIT } from "@/constant";
import ArticleSidebar, {
  ArticleSidebarSkeleton,
} from "@/modules/article/ui/component/ArticleSidebar";
import ArticleView from "@/modules/article/ui/view/ArticleView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
interface Props {
  params: Promise<{ category: string }>;
}
async function page({ params }: Props) {
  const { category } = await params;
  console.log("category", category);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  void queryClient.prefetchInfiniteQuery(
    trpc.articles.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      categorySlug: category,
      tags: [],
    })
  );

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-8 min-h-screen  min-w-[350px] ">
      <div className=" col-span-1 sm:col-span-8 md:col-span-5 lg:col-span-6  h-full min-w-[350px] ">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticleView categorySlug={category} />
        </HydrationBoundary>
      </div>
      <aside className="hidden md:block  md:col-span-3 lg:col-span-2 sticky top-0 h-screen">
        <Suspense fallback={<ArticleSidebarSkeleton />}>
          <ArticleSidebar />
        </Suspense>
      </aside>
    </div>
  );
}

export default page;
