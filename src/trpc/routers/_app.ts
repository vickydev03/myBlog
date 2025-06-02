import { ArticleRouter } from "@/modules/article/server/procedures";
import {  createTRPCRouter } from "../init";
import { TagsRouter } from "@/modules/tags/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  tags: TagsRouter,
  articles:ArticleRouter
});

export type AppRouter = typeof appRouter;
