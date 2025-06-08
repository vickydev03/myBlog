"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
const intel = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
// import CategoriesSideBar from "./CategoriesSideBar";

const CategoriesSideBar = dynamic(() => import("./CategoriesSideBar"), {
  ssr: false, 
});

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Category } from "@/payload-types";
import Link from "next/link";
import dynamic from "next/dynamic";


function Categories({ data }: { data: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const ViewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  // console.log(isSidebarOpen, "sidebar ");

  const params = useParams();
  const categoryParams = params.category as string | undefined;
  const activeCategory = categoryParams || "all";
  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const IsActiveCategoryHidden =
    visibleCount <= activeCategoryIndex && activeCategoryIndex !== -1;

  // console.log("here we go", activeCategoryIndex);

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !ViewAllRef.current) {
        return;
      }
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = ViewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data.length]);

  // console.log(visibleCount, "hiiklajklfja");

  return (
    <div className="relative w-full border-b overflow-hidden">
      <CategoriesSideBar
        open={isSidebarOpen}
        onOpenChange={setIsSideBarOpen}
        data={data}
      />
      <div
        className=" absolute top-9999 opacity-0 pointer-events-none flex "
        ref={measureRef}
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {/* hiddden meausre ref */}
        {data.map((e: Category) => {
          return (
            <div key={e.id} className=" relative ">
              <Link className="" href={e.slug}>
                {e.name}
              </Link>
            </div>
          );
        })}
      </div>

      {/* visible one */}
      <div
        className="flex flex-nowrap items-center"
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((e: Category) => (
          <div
            className="[&:not(:last-child)]:mr-3 md:[&:not(:last-child)]:mr-3 "
            key={e.id}
          >
            <Link
              href={e.slug}
              className={cn(intel.className, "text-[##242724]  text-[14px]")}
            >
              {e.name}
            </Link>
          </div>
        ))}

        <div className=" shrink-0 flex items-center py-[5px]" ref={ViewAllRef}>
          <Button
            onClick={() => setIsSideBarOpen(true)}
            className={cn(
              "h-9 px-su10 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              IsActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary"
            )}
          >
            Explore
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
