import { baseProcedure, createTRPCRouter } from "@/trpc/init";
export const TagsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    // console.log(input, "singhajay");

    const data = await ctx.payload.find({
      collection: "tags",
      depth: 1,
      limit: 5,
      sort: "-createdAt",
      where: {
        isDisplay: {
          equals: true,
        },
      },
    });

    return data.docs;
  }),
});
