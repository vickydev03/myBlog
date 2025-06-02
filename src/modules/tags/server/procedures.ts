import { baseProcedure, createTRPCRouter } from "@/trpc/init";
export const TagsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    // console.log(input, "singhajay");

    const data = await ctx.payload.find({
      collection: "tags",
      depth: 1,
      limit: 500,
    });

    const randomData = data.docs.sort(() => 0.5 - Math.random()).slice(0,5);

    return randomData;
  }),
});
