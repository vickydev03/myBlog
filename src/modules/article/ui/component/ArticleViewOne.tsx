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
import { ArticleSchema, imageSchema,LogoSchema } from "@/lib/schema/index";
import Script from "next/script";
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
  // console.log(data,error,"singh");
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
  const schema = [ArticleSchema(data), imageSchema(data?.meta?.image),LogoSchema];

  // let x:DataProps=data

  const formattedDate = format(data.createdAt, "dd MMM yyyy");

  // if(!data){
  //   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
  //   {/* Animated background elements */}
  //   <div className="absolute inset-0 overflow-hidden">
  //     <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 animate-pulse"></div>
  //     <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full opacity-50 animate-pulse delay-1000"></div>
  //     <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-40 animate-bounce delay-500"></div>
  //     <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-l from-purple-200 to-pink-200 rounded-full opacity-30 animate-bounce delay-700"></div>
  //   </div>

  //   {/* Main content container */}
  //   <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
  //     {/* 404 Number with creative styling */}
  //     <div className="mb-8 relative">
  //       <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 select-none leading-none tracking-tight">
  //         404
  //       </h1>
  //       <div className="absolute inset-0 flex items-center justify-center">
  //         <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-gray-200 rounded-full animate-spin opacity-20"></div>
  //       </div>
  //     </div>

  //     {/* Error content */}
  //     <div className="mb-12 space-y-6">
  //       <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
  //         Oops! Page Not Found
  //       </h2>
  //       <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
  //         The page you are looking for might have been moved, deleted, or
  //         perhaps you just mistyped the URL.
  //       </p>
  //     </div>

  //     {/* Action buttons */}
  //     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
  //       <Link
  //         href="/"
  //         className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
  //       >
  //         {/* <Home size={20} /> */}
  //         <span className="font-medium">Back to Home</span>
  //       </Link>

  //       <button
  //         onClick={() => window.history.back()}
  //         className="group flex items-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
  //       >
  //         {/* <ArrowLeft size={20} /> */}
  //         <span className="font-medium">Go Back</span>
  //       </button>
  //     </div>

  //     {/* Helpful suggestions */}
  //     <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
  //       <h3 className="text-lg font-medium text-gray-800 mb-3">
  //         What can you do?
  //       </h3>
  //       <ul className="text-gray-600 space-y-2 text-sm md:text-base">
  //         <li>• Check if the URL is typed correctly</li>
  //         <li>• Go back to the previous page</li>
  //         <li>• Visit our homepage to find what you are looking for</li>
  //       </ul>
  //     </div>

  //     {/* Error details */}
  //     <div className="mt-8 text-gray-400 text-sm">
  //       <p>Error 404 • </p>
  //     </div>
  //   </div>

  //   {/* Decorative floating dots */}
  //   <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-40"></div>
  //   <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-300 opacity-30"></div>
  //   <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-pink-300 rounded-full animate-ping delay-700 opacity-25"></div>
  // </div>
  // }

  return (
    <>
      <Script id="finoblitz-seo" type="application/ld+json" strategy="lazyOnload">
        {JSON.stringify(schema)}
      </Script>
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
                <Avatar className="w-8 h-8 ">
                  <AvatarImage
                    className=" object-cover aspect-square"
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
              <h5
                className={cn("font-medium text-[#2f2e2e] text-sm md:text-md")}
              >
                <span className="font-semibold text-[14px]  md:text-base ">
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
          <div className=" relative mt-4 prose prose-lg prose-headings:scroll-mt-20 prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-lg prose-img:mx-auto prose-img:w-full prose-img:h-auto prose-img:max-h-[400px] sm:prose-img:max-h-[500px] md:prose-img:max-h-[600px] prose-img:object-contain prose-img:my-4">
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
    </>
  );
}

export default ArticleViewOne;

export const ArticleSkeleton = () => {
  return (
    // <div className="content  pb-10 max-w-3xl mx-auto animate-pulse">
    //   <div className="w-full mx-auto px-4 md:px-0 py-6 space-y-6">
    //     {/* Title */}
    //     <div className="h-9 bg-gray-200 rounded w-3/4" />

    //     {/* Description */}
    //     <div className="h-5 bg-gray-200 rounded w-full" />

    //     {/* Author Section */}
    //     <div className="flex items-center gap-6 pt-4">
    //       <div className="w-8 h-8 rounded-full bg-gray-300" />
    //       <div className="h-4 w-24 bg-gray-200 rounded" />
    //       <div className="h-4 w-16 bg-gray-200 rounded" />
    //       <div className="h-4 w-20 bg-gray-200 rounded" />
    //     </div>

    //     {/* Main Image Placeholder */}
    //     <div className="w-full aspect-video bg-gray-300 rounded-lg" />

    //     {/* Rich Text Placeholder (Paragraph lines) */}
    //     <div className="space-y-3 pt-4">
    //       <div className="h-4 bg-gray-200 rounded w-full" />
    //       <div className="h-4 bg-gray-200 rounded w-11/12" />
    //       <div className="h-4 bg-gray-200 rounded w-10/12" />
    //       <div className="h-4 bg-gray-200 rounded w-9/12" />
    //       <div className="h-4 bg-gray-200 rounded w-full" />
    //       <div className="h-4 bg-gray-200 rounded w-8/12" />
    //     </div>
    //   </div>
    // </div>

    <div className="content pb-12 px-4 sm:px-6 animate-pulse max-w-3xl mx-auto">
  <div className="w-full py-8 space-y-8">
    {/* Title */}
    <div className="h-10 bg-gray-200 rounded w-4/5 sm:w-3/4" />

    {/* Description */}
    <div className="h-6 bg-gray-200 rounded w-full" />

    {/* Author Section */}
    <div className="flex items-center gap-4 pt-6">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Main Image Placeholder */}
    <div className="w-full aspect-video bg-gray-300 rounded-xl" />

    {/* Rich Text Placeholder */}
    <div className="space-y-4 pt-6">
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-5 bg-gray-200 rounded w-11/12" />
      <div className="h-5 bg-gray-200 rounded w-10/12" />
      <div className="h-5 bg-gray-200 rounded w-9/12" />
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-5 bg-gray-200 rounded w-8/12" />
    </div>
  </div>
</div>

  );
};
