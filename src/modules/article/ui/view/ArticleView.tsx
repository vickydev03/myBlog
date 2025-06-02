"use client";
import Categories from "@/modules/categories/ui/Categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Articles from "../component/Articles";

function ArticleView({ categorySlug }: { categorySlug?: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <>
      <div className="containers px-3 py-2  ">
        <Suspense fallback={<p>loading...</p>}>
          <Categories data={data} />
        </Suspense>
      </div>
      <div className="box ">
        <Articles categorySlug={categorySlug} />
      </div>
    </>
  );
}

export default ArticleView;
