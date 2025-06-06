import { Category, User, Media, Tag } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where } from "payload";
import { DEFAULT_LIMIT } from "@/constant";
import { TRPCError } from "@trpc/server";

export const ArticleRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        and: [
          {
            slug: {
              equals: input.slug,
            },
          },
          {
            isPrivate: {
              not_equals: true,
            },
          },
        ],
      };

      const data = await ctx.payload.find({
        collection: "articles",
        where,
        limit: 1,
        select: {
          content: true,
          title: true,
          author: true,
          category: true,
          slug: true,
          createdAt: true,
          "read-time": true,
          tags: true,
          description: true,
        },
      });

      if (!data.docs[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This post is not found",
        });
      }

      return data.docs[0] ?? null;
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
        or: [
          {
            _status: {
              equals: "published",
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
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
          depth: 3,
          where,
          select: {
            author: true,
            description: true,
            slug: true,
            poster: true,
            title: true,
            createdAt: true,
            tags: true,
          },
          page: input.cursor,
          limit: input.limit,
        });

        // Transform the data to ensure correct types
        const transformedDocs = data.docs
          .filter(
            (doc) =>
              typeof doc.author === "object" &&
              doc.author &&
              "image" in doc.author &&
              typeof doc.poster === "object" &&
              doc.poster
          )
          .map((doc) => ({
            ...doc,
            createdAt: new Date(doc.createdAt),
            author: doc.author as User & { image: Media },
            poster: doc.poster as Media,
            tags: Array.isArray(doc.tags)
              ? doc.tags.filter(
                  (tag): tag is Tag => typeof tag === "object" && tag !== null
                )
              : [],
          }));

        return {
          ...data,
          docs: transformedDocs,
        };
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
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
          slug: true,
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
        currentPostSlug: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "articles",

        where: {
          slug: {
            not_equals: input.currentPostSlug,
          },

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
