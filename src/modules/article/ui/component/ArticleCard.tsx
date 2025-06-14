"use client";
import { cn } from "@/lib/utils";
import { Media, Tag, User } from "@/payload-types";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Props {
  data: {
    id: string;
    slug: string;
    author: User & { image?: Media };
    description: string;
    poster: Media;
    title: string;
    tags: Tag[];
    createdAt: Date;
  };
}

function ArticleCard({ data }: Props) {
  // console.log(data,"select");

  // const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   const getSize = () => ({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });

  //   // Set initial size on mount
  //   setScreenSize(getSize());

  //   const handleResize = () => setScreenSize(getSize());
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, [setScreenSize]);

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  // const { width } = screenSize;
  const description = data.description;

  // if (width <= 400) description = data.description.slice(0, 30) + "...";
  // else if (width <= 500) description = data.description.slice(0, 50) + "...";
  // else if (width <= 800) description = data.description.slice(0, 90) + "...";
  // else if (width <= 1000) description = data.description.slice(0, 115) + "...";
  // else description = data.description.slice(0, 110) + "...";

  return (
    // <LazyMotion features={domAnimation} >
    <>
      {
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="max-w-[750px] grid grid-cols-[1fr_120px] sm:grid-cols-[1fr_180px] md:grid-cols-[1fr_210px] lg:grid-cols-[1fr_250px] min-h-48 b "
        >
          <div className="py-[15px] px-2 md:px-2 lg:px-2 flex flex-col gap-3">
            <div className="w-full flex items-center gap-2">
              <div className="relative aspect-square">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      data.author?.image?.url ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={data?.author?.image?.alt || "user"}
                  />
                  <AvatarFallback>
                    {data.author.name || "Unknown"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h5 className={cn("font-medium text-[#2f2e2e] text-sm")}>
                {data.author.name}
              </h5>
            </div>
            <div>
              <h2 className="font-bold header  leading-tighter text-pretty">
                {data.title}
              </h2>
            </div>
            <div className="description  line-clamp-2 md:line-clamp-3 lg:line-clamp-4 ">
              {description}
            </div>

            <div className="last-bar flex gap-18">
              <h4 className="text-sm">{timeAgo}</h4>
            </div>
          </div>

          <div className="w-full h-full relative aspect- flex items-center justify-center">
            <Image
              src={data.poster?.url || "/placeholder.png"}
              alt={data.poster.alt || "img"}
              width={100}
              height={100}
              className="object-cover w-24 sm:w-36 md:w-28 lg:w-48 h-[120px] max-h-[120px] object-top max-w-[170px]  min-h-[90px]"
            />
          </div>
        </motion.div>
      }
    </>
  );
}

export default ArticleCard;

export function ArticleCardSkeleton() {
  return (
    <div className="max-w-[750px] grid grid-cols-[1fr_120px] sm:grid-cols-[1fr_180px] md:grid-cols-[1fr_210px] lg:grid-cols-[1fr_250px] min-h-48 border-b animate-pulse">
      <div className="py-[15px] px-2 md:px-2 lg:px-2 flex flex-col gap-3">
        {/* Avatar + Name */}
        <div className="w-full flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-[100px]" />
        </div>

        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Time */}
        <div className="h-4 bg-gray-200 rounded w-[80px]" />
      </div>

      {/* Poster Image */}
      <div className="flex items-center justify-center px-4 py-2">
        <div className="w-24 sm:w-36 md:w-44 lg:w-48 h-[120px] bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
