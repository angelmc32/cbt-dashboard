import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const communitiesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        deployedByAddress: z.string().trim().length(42),
        name: z.string().trim().min(1).max(32),
        symbol: z.string().trim().min(3).max(6),
        description: z.string().trim().min(20).max(140),
        imageUri: z.string().trim().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { deployedByAddress, name, symbol, description, imageUri } = input;

      const newCommunity = await ctx.prisma.community.create({
        data: {
          deployedByAddress,
          name,
          symbol,
          description,
          imageUri,
        },
      });

      return { newCommunity };
    }),
});
