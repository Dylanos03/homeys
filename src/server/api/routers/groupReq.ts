import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupReqRouter = createTRPCRouter({
  createGroupReq: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        senderId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input.senderId },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      if (!userProfile.groupId) {
        throw new Error("User has no group");
      }

      return ctx.db.groupReq.create({
        data: {
          senderId: input.senderId,
          userId: input.userId,
          groupId: userProfile.groupId,
        },
      });
    }),
});
