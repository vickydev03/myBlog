import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where } from "payload";
import { DEFAULT_LIMIT } from "@/constant";
import { TRPCError } from "@trpc/server";

export const ArticleRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "articles",
        where: {
          and: [
            {
              id: {
                equals: input.id,
              },
            },
            {
              isPrivate: {
                not_equals: true,
              },
            },
          ],
        },
        limit: 1,
      });

      if (!data.docs[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Article not found or is private",
        });
      }

      return data.docs[0];
    }),
  getMany: baseProcedure
    .input(
      z.object({
        search: z.string().nullable().optional(),
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        categorySlug: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay for testing
      const where: Where = {
        isPrivate: { not_equals: true },
      };

      if (input.categorySlug) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.categorySlug,
            },
          },
        });

        const category: Category | undefined = categoriesData.docs[0];
        if (category) {
          where["category.slug"] = {
            in: [category.slug],
          };
        }
      }

      if (Array.isArray(input.tags) && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      if (input.search) {
        where["title"] = {
          like: input.search,
        };
      }

      try {
        const data = await ctx.payload.find({
          collection: "articles",
          sort: "-createdAt",

          depth: 2,
          where,
          page: input.cursor,
          limit: input.limit,
        });

        console.log(data, "chirusingh");

        return data;
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch articles",
        });
      }
    }),

  trending: baseProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.payload.find({
        collection: "articles",
        limit: 5,
        sort: "-createdAt",
        where: {
          isTrending: {
            equals: true,
          },
          isPrivate: { not_equals: true },
        },
        select: {
          poster: true,
          title: true,
        },
      });

      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch articles",
      });
    }
  }),

  relatedPost: baseProcedure
    .input(
      z.object({
        categorySlug: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // const conditions = [];

      // if (input.categorySlug) {
      //   conditions.push({
      //     "category.slug": {
      //       equals: input.categorySlug,
      //     },
      //   });
      // }

      // if (input.tags && input.tags.length > 0) {
      //   conditions.push({
      //     "tags.slug": {
      //       in: input.tags,
      //     },
      //   });
      // }

      // if (conditions.length === 0) {
      //   return [];
      // }

      const data = await ctx.payload.find({
        collection: "articles",
        where: {
          or: [
            {
              "category.slug": {
                equals: input.categorySlug,
              },
            },
            {
              "tags.name": {
                in: input.tags,
              },
            },
          ],
        },
      });

      return data; // return .docs if you want only the array of articles
    }),
});
