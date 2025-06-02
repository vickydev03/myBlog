"use client";
import Articles from "@/modules/article/ui/component/Articles";
import React from "react";

function SearchView({ categorySlug }: { categorySlug?: string }) {
  
  return (
    <>
      <div className=" px-3 py-2 max-w-[750px] mx-auto ">
        <h3 className="text-2xl font-semibold mt-4">
          <span>Search Results</span>
        </h3>
      </div>
      <div className="box ">
        <Articles categorySlug={categorySlug} />
      </div>
    </>
  );
}

export default SearchView;
