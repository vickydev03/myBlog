import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
// import { CustomCategory } from "@/types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 2,
      pagination: false,
      sort: "name",
    });

    console.log(data, "mai hi hu data");

    // const formattedData: CustomCategory[] = data.docs.map((doc: any) => ({
    //   ...doc,
    //   subCategories:
    //     doc?.subCategories?.docs ??
    //     []?.map((doc) => ({ ...(doc as Category) })),
    //   subcategories: undefined,
    // }));

    const formattedData: Category[] = data.docs.map((doc: Category) => ({
      ...doc,
    }));

    return formattedData;
  }),
  getOne: baseProcedure
    .input(
      z.object({
        categorySlug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "categories",
        limit: 1,
        where: {
          slug: {
            equals: input.categorySlug,
          },
        },
      });

      console.log(data, "mai hi hu data");

      // const formattedData: CustomCategory[] = data.docs.map((doc: any) => ({
      //   ...doc,
      //   subCategories:
      //     doc?.subCategories?.docs ??
      //     []?.map((doc) => ({ ...(doc as Category) })),
      //   subcategories: undefined,
      // }));

      // const formattedData: Category[] = data.docs.map((doc: Category) => ({
      //   ...doc,
      // }));

      return {
        ...data.docs[0],
        meta: {
          ...data.docs[0]?.meta,
          image: data.docs[0]?.meta?.image as Media,
        },
      };
    }),
});
