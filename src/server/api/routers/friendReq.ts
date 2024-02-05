import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const friendReqRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ userId: z.string().min(1), friendId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const reqSender = await ctx.db.profile.findUnique({
        where: { userId: input.friendId },
      });

      if (!reqSender) {
        throw new Error("User not found");
      }

      return ctx.db.friendReq.create({
        data: {
          friendName: reqSender.username,
          friendPic: reqSender.image,
          userId: input.userId,
          friendId: input.friendId,
        },
      });
    }),

  check: publicProcedure
    .input(z.object({ userId: z.string().min(1), friendId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.friendReq.findFirst({
        where: {
          userId: input.userId,
          friendId: input.friendId,
        },
      });
    }),

  reject: publicProcedure
    .input(z.number().min(1))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.friendReq.delete({ where: { id: input } });
    }),

  accept: publicProcedure
    .input(z.number().min(1))
    .mutation(async ({ ctx, input }) => {
      const friendReq = await ctx.db.friendReq.findUnique({
        where: { id: input },
      });
      if (!friendReq) {
        throw new Error("Friend request not found");
      }
      const user1 = await ctx.db.profile.findUnique({
        where: { userId: friendReq.friendId },
      });
      const user2 = await ctx.db.profile.findUnique({
        where: { userId: friendReq.userId },
      });
      if (!user1 || !user2) {
        throw new Error("User not found");
      }
      await ctx.db.profile.update({
        where: { userId: user1.userId },
        data: { friends: { connect: { ...user2 } } },
      });
      await ctx.db.profile.update({
        where: { userId: user2.userId },
        data: { friends: { connect: { ...user1 } } },
      });

      return ctx.db.friendReq.delete({ where: { id: input } });
    }),
});
