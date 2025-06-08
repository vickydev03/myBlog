"use client";
import { Media } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { Suspense } from "react";
import { useArticleFilters } from "../../hooks/useArticleFilterHook";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "motion/react";
interface DataProps {
  id: string;
  title: string;
  poster?: string | Media | null;
  slug: string;
}

function ArticleSidebar() {
  const trpc = useTRPC();
  const [filters, setFilters] = useArticleFilters();
  const { data } = useSuspenseQuery(trpc.articles.trending.queryOptions());

  const { data: tags } = useSuspenseQuery(trpc.tags.getMany.queryOptions());

  // console.log(tags, "trending");

  function toggleTag(tag: string) {
    setFilters((prev) => {
      const hasTag = prev.tags.includes(tag);

      const newTags = hasTag
        ? prev.tags.filter((t) => t !== tag) // Remove if exists
        : [...prev.tags, tag]; // Add if not exists

      return {
        ...prev,
        tags: newTags,
      };
    });
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.4, // delay between each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      className="l h-full"
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className=" w-full relative h-full  px-3 py-5  ">
        <div className="sidebar flex flex-col ">
          <div className="trending-post flex flex-col px-3 gap-2 ">
            <h1 className="font-medium text-xl lg:text-2xl ">Trending Posts</h1>
            <motion.div
              variants={containerVariants}
              viewport={{ once: true }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1   pb-5  "
            >
              {/* trending post */}
              <Suspense fallback={<p>loading</p>}>
                {data.totalDocs > 0 &&
                  data.docs.map((e: DataProps) => (
                    <motion.div key={e.id} variants={itemVariants}>
                      <Link href={`/post/${e.slug}`} key={e.id}>
                        <motion.div
                          key={e.id}
                          variants={itemVariants}
                          className="flex  items-center space-y-2 space-x-3  "
                        >
                          <div className=" relative aspect-square flex items-center bg-red-3000  ">
                            <Image
                              className=" flex items-center object-top object-cover trend-img"
                              src={
                                typeof e.poster === "string"
                                  ? e.poster
                                  : e.poster?.url || ""
                              }
                              width={100}
                              height={100}
                              alt={e.title}
                            />
                          </div>
                          <h3 className="Trending-title font-medium leading-5">
                            {e.title}
                          </h3>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
              </Suspense>
            </motion.div>
          </div>

          {/* tags */}
          {tags.length > 0 && (
            <section className="   px-3 py-6 t pb-10">
              <h3 className="font-semibold text-lg mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-5 text-sm">
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag) => (
                    <button
                      key={tag.id}
                      className={cn(
                        "bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200",
                        filters.tags.includes(tag.name) &&
                          " underline bg-blue-100 "
                      )}
                      onClick={() => toggleTag(tag.name)}
                    >
                      #
                      {tag.name.charAt(0).toUpperCase() +
                        tag.name.slice(1).toLowerCase()}
                    </button>
                  ))}
              </div>
            </section>
          )}

          <section className="px-3 py-6 ">
            <h2 className="font-medium text-lg lg:text-2xl mb-3">
              Connect with me
            </h2>
            <div className="flex items-center gap-6">
              <Link href="/" aria-label="Twitter" className=" size-6">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.8 3H17l-4.1 6.1L8.3 3H3l6.9 9.9L3.5 21h4.9l3.9-5.8 4.1 5.8h5l-7.2-10.1L20.8 3z" />
                </svg>
              </Link>
              <Link href="/" aria-label="Facebook" className=" size-6">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.63 9.88v-7h-2v-2.88h2V9.4c0-2 1.2-3.11 3-3.11.87 0 1.79.16 1.79.16v2h-1c-1 0-1.31.62-1.31 1.26v1.51h2.22l-.35 2.88h-1.87v7A10 10 0 0022 12z" />
                </svg>
              </Link>
              <Link href="/" aria-label="LinkedIn" className=" size-6">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18v-9.99l8 6 8-6V18H4z" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </motion.section>
  );
}

export default ArticleSidebar;

export const ArticleSidebarSkeleton = () => {
  return (
    <div className="w-full relative h-full px-3 py-5 animate-pulse">
      <div className="sidebar flex flex-col gap-10">
        {/* Trending Posts Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-md shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Skeleton with 3+2 layout */}
        <div className="flex flex-col gap-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`line1-${i}`}
                  className="bg-gray-200 px-4 py-2 rounded-full w-20 h-6"
                />
              ))}
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={`line2-${i}`}
                  className="bg-gray-200 px-4 py-2 rounded-full w-20 h-6"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="flex items-center gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
