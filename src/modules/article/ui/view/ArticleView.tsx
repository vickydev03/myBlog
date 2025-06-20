"use client";
// import Categories from "@/modules/categories/ui/Categories";
import { useTRPC } from "@/trpc/client";
import dynamic from "next/dynamic";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
// import { Loader } from "../component/Articles";
const Categories = dynamic(() => import("@/modules/categories/ui/Categories"));
const Articles = dynamic(() => import("../component/Articles"));
// import Articles from "../component/Articles";

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

      <main className="box ">
        {/* <Suspense fallback={<Loader />}> */}
          <Articles categorySlug={categorySlug} />
        {/* </Suspense> */}
      </main>
    </>
  );
}

export default ArticleView;
