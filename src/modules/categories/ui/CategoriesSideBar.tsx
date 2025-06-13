"use client"
import React, { useState } from "react";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Category[]; //will be removed
}

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category } from "@/payload-types";

function CategoriesSideBar({ open, onOpenChange, data }: Props) {
  const handleClose = (open: boolean) => {
    onOpenChange(open);
    setParentCategories(null);
    setSelectedCategory(null);
  };
  const [parentCategories, setParentCategories] = useState<
    Category[] | null
  >(null);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const currentCategories = parentCategories ?? data ?? [];
  const router = useRouter();
  const handleback=()=>{
    if(parentCategories){
        setParentCategories(null)
        setSelectedCategory(null)
    }
  }
  const handleClick = (category: Category) => {
     
      if (parentCategories && selectedCategory) {
        router.push(`${selectedCategory.slug}/category/${category.slug}`);
      } else {
        if ("all" === category.slug) {
          router.push("/");
        } else {
          router.push(`/category/${category.slug}`);
        }
      }
      handleClose(false);
    
  };
  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={ handleback}
              className="w-full text-left p-4  hover:bg-black hover:text-white flex items-center text-base font-medium "
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleClick(category)}
              className="flex justify-between text-left items-center p-3 text-base font-medium w-full hover:bg-black hover:text-white cursor-pointer"
            >
              {category.name}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default CategoriesSideBar;
