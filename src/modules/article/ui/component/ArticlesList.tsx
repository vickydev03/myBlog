"use client";
import { DEFAULT_LIMIT } from "@/constant";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import ArticleCard from "./ArticleCard";
import { useArticleFilters } from "../../hooks/useArticleFilterHook";
import { InboxIcon } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/(app)/(home)/_component/Footer";
// import { trpc } from "@/trpc/server";
// interface Props {
//   id: string;
//   slug: string;
//   author: User & { image: Media };
//   description: string;
//   poster: Media;
//   title: string;
//   tags: Tag[];
//   createdAt: Date;
// }

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
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );
  // console.log(data, "server data");

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

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border  border-black border-dased  flex items-center  justify-center  p-8 flex-col   gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon className="" />
        <p className="text-base font-medium "> No Post found</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-5000">
      {data.pages
        .flatMap((e) => e.docs)
        .map((item) => (
          <Link href={`/post/${item.slug}`} key={item.id}>
            <ArticleCard data={item} />
          </Link>
        ))}

      {/* This empty div is observed for infinite scroll */}
      <div
        ref={loadMoreRef}
        className=" h-[190px] sm:h-[200px] md:h-2 opacity-0"
      />

      {isFetchingNextPage && (
        <p className="text-center py-4 text-gray-500">Loading more...</p>
      )}

      {!hasNextPage && (
        <div className="md:hidden h-10 bg-red-400">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
