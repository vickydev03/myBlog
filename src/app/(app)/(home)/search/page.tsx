import { DEFAULT_LIMIT } from "@/constant";
import { loadArticleFilters } from "@/modules/article/hooks/searchParams";
import ArticleSidebar, {
  ArticleSidebarSkeleton,
} from "@/modules/article/ui/component/ArticleSidebar";
// import ArticleView from "@/modules/article/ui/view/ArticleView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

import React, { Suspense } from "react";
import Searchview from "./Searchview";
interface Props {
  searchParams: Promise<SearchParams>;
}
async function page({ searchParams }: Props) {
  const filters = await loadArticleFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.tags.getMany.queryOptions());
  //   void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  void queryClient.prefetchQuery(trpc.articles.trending.queryOptions());

  void queryClient.prefetchInfiniteQuery(
    trpc.articles.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      tags: [],
      search: filters.search,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid  grid-cols-1 sm:grid-cols-8 min-h-screen  min-w-[350px] ">
        <div className=" article-view col-span-1 sm:col-span-8 md:col-span-5 lg:col-spans-6  border-r border-[#2927274a] h-full min-w-[350px] ">
          <Searchview />
        </div>
        <aside className=" article-sidebar hidden md:block  md:col-span-3 lg:col-spans-2 sticky top-0 h-dvh">
          <Suspense fallback={<ArticleSidebarSkeleton />}>
            <ArticleSidebar />
          </Suspense>
        </aside>
      </div>
    </HydrationBoundary>
  );
}

export default page;
