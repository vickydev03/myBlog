"use client";
import { DEFAULT_LIMIT } from "@/constant";
import { useTRPC } from "@/trpc/client";
import {
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
// import ArticleCard from "./ArticleCard";
import { InboxIcon } from "lucide-react";
import Link from "next/link";
import { useArticleFilters } from "../../hooks/useArticleFilterHook";
// import Footer from "@/app/(app)/(home)/_component/Footer";
// import dynamic from "next/dynamic";
// const Footer = dynamic(() => import("@/app/(app)/(home)/_component/Footer"));
// const ArticleCard = dynamic(() => import("./ArticleCard"));
import ArticleCard from "./ArticleCard";

function ArticlesList({ categorySlug }: { categorySlug?: string }) {
  const trpc = useTRPC();
  const [filters] = useArticleFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.articles.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
          categorySlug,
          tags: filters.tags,
          search: filters.search,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.nextPage : undefined;
            // return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0] &&
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (data?.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border  border-black border-dased  flex items-center  justify-center  p-8 flex-col   gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon className="" />
        <p className="text-base font-medium "> No Post found</p>
      </div>
    );
  }

  // if(isLoading) return <Loader/>

  return (
    <div className="w-full bg-gray-5000">
      {data?.pages
        .flatMap((e) => e.docs)
        .map((item) => (
          <Link href={`/post/${item.slug}`} key={item.id}>
            <ArticleCard data={item} />
          </Link>
        ))}

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className=" h-[190px] sm:h-[200px] md:h-2 opacity-0"
        />
      )}

      {isFetchingNextPage && hasNextPage && (
        <p className="text-center py-4 text-gray-500">Loading more...</p>
      )}

      {/* {!hasNextPage && (
        <div className="md:hidden h-5  bg-red-4000">
           <Footer /> 
        </div>
      )} */}
    </div>
  );
}

export default ArticlesList;
