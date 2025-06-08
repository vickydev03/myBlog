"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { RichText } from "@/lib/RichText";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SwiperComponent from "./SwiperComponent";
import { format } from "date-fns";
import { Media } from "@/payload-types";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {Richt}
const monts = Inter({
  weight: ["800"],
  subsets: ["latin"],
  // variable:[
});
// Montserrat

// interface DataProps {
//   id: string;
//   author: User
//   category: Category;
//   description: string;
//   isPrivate: boolean;
//   isTrending: boolean;
//   meta?: { description: string; title: string; image: Media };
//   poster: Media;
//   slug: string;
//   tags: Tag;
//   title: string;
//   content:SerializedEditorState
//   // Article & { author: User & { image: Media } } & { poster: Media }
// }
function ArticleViewOne({ slug }: { slug: string }) {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.articles.getOne.queryOptions({
      slug,
    })
  );
  const { data: trendData } = useSuspenseQuery(
    trpc.articles.trending.queryOptions()
  );

  const { data: relatedPost } = useSuspenseQuery(
    trpc.articles.relatedPost.queryOptions({
      categorySlug:
        data.category && typeof data.category === "object"
          ? data.category.name
          : data.category || "",
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag) => (typeof tag === "string" ? tag : tag.name))
        : [],
      currentPostSlug: slug,
    })
  );

  // let x:DataProps=data

  const formattedDate = format(data.createdAt, "dd MMM yyyy");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="content-box border-b pb-10 max-w-3xl mx-auto "
    >
      <div className="bg-red-2000  content w-full  mx-auto px-4 md:px-0 py-6 ">
        <h1
          className={cn(
            monts.className,
            "text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-4 dark:bg-white"
          )}
        >
          {data.title}
        </h1>

        <p className="text-lg text-gray-600 mb-6">{data.description}</p>
        {/* <div className="bg-red-200 mb-4">s</div> */}
        <div className="w-full flex items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9  gap-y-2 bg-red-2000  t b p-2">
          <div className="flex items-center gap-2">
            <div className="relative aspect-square">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    typeof data.author === "object" &&
                    data.author?.image &&
                    typeof data.author.image === "object"
                      ? data.author.image.url ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={
                    typeof data.author === "object"
                      ? data.author?.name || ""
                      : "Author"
                  }
                />
                <AvatarFallback>
                  {typeof data.author === "object"
                    ? data.author?.name || ""
                    : "Author"}
                </AvatarFallback>
              </Avatar>
            </div>
            <h5 className={cn("font-medium text-[#2f2e2e] text-sm md:text-md")}>
              <span className="font-semibold text-base ">
                {typeof data.author === "object"
                  ? data?.author?.name
                  : data.author || "Anonymous"}
              </span>
            </h5>
          </div>
          {/* time to read */}
          <p className="">
            <span className="font-semibold  time-read ">
              {data["read-time"]} min read
            </span>
          </p>
          <p className="">
            <span className="font-semibold  time-read ">{formattedDate}</span>
          </p>
        </div>

        {/* content */}
        <div className="mt-5 prose prose-lg prose-headings:scroll-mt-20 prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-lg prose-img:mx-auto">
          {data.content && <RichText data={data.content} />}
        </div>
      </div>
      <div className="py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:gap-6 lg:gap-8 gap-4 ">
        {trendData.totalDocs > 0 && (
          <div className={cn("pb-2 pt-2 px-10  sm-p-0 bg-red-2000")}>
            <SwiperComponent
              header="Populor posts"
              data={trendData.docs
                .filter((doc) => doc.poster && typeof doc.poster === "object")
                .map((doc) => ({
                  id: doc.id,
                  title: doc.title,
                  slug: doc.slug,
                  poster: doc.poster as Media,
                }))}
            />
          </div>
        )}
        {relatedPost.totalDocs > 0 && (
          <div className="pb-2 pt-2 px-10  sm-p-0">
            <SwiperComponent
              header="Related posts"
              data={relatedPost.docs
                .filter((doc) => doc.poster && typeof doc.poster === "object")
                .map((doc) => ({
                  id: doc.id,
                  slug: doc.slug,
                  title: doc.title,
                  poster: doc.poster as Media,
                }))}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ArticleViewOne;

export const ArticleSkeleton = () => {
  return (
    <div className="content border-b pb-10 max-w-3xl mx-auto animate-pulse">
      <div className="w-full mx-auto px-4 md:px-0 py-6 space-y-6">
        {/* Title */}
        <div className="h-9 bg-gray-200 rounded w-3/4" />

        {/* Description */}
        <div className="h-5 bg-gray-200 rounded w-full" />

        {/* Author Section */}
        <div className="flex items-center gap-6 pt-4">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Main Image Placeholder */}
        <div className="w-full aspect-video bg-gray-300 rounded-lg" />

        {/* Rich Text Placeholder (Paragraph lines) */}
        <div className="space-y-3 pt-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
          <div className="h-4 bg-gray-200 rounded w-9/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-8/12" />
        </div>
      </div>
    </div>
  );
};
