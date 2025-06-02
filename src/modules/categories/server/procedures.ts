import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
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
});
