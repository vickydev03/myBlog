import { DEFAULT_LIMIT } from "@/constant";
import ArticleSidebar, {
  ArticleSidebarSkeleton,
} from "@/modules/article/ui/component/ArticleSidebar";

import ArticleView from "@/modules/article/ui/view/ArticleView";
export const dynamic = "force-dynamic";

import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{ category: string }>;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  try {
    const data = await caller.categories.getOne({ categorySlug: category });

    // console.log(data, "meta");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_APP_URL environment variable is not set");
    }
    return {
      title: data?.meta?.title,
      description: data?.meta?.description,
      openGraph: {
        title: data?.meta?.title as string,
        description: data?.meta?.description as string,
        images: data?.meta?.image
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
        canonical: `${baseUrl}/${category}}`,
      },
      twitter: {
        card: "summary_large_image",
        title: data.meta?.title || "",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      title: "category Not Found",
      description: "The requested category could not be found.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/category/${category}`,
      },
    };
  }
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
