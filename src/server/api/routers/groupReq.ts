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
      const senderProfile = await ctx.db.profile.findUnique({
        where: { userId: input.senderId },
        include: { Group: true },
      });

      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input.userId },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      if (!senderProfile) {
        throw new Error("Sender not found");
      }

      if (!senderProfile.Group) {
        throw new Error("Sender has no group");
      }

      if (!senderProfile.groupId) {
        throw new Error("Sender has no group");
      }

      return ctx.db.groupReq.create({
        data: {
          senderId: input.senderId,
          userId: input.userId,
          groupId: senderProfile.groupId,
          senderName: senderProfile.fullName,
          groupName: senderProfile.Group?.name,
        },
      });
    }),
  findAllGroupReq: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input },
        include: { GroupReq: true },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      return userProfile.GroupReq;
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.groupReq.delete({
      where: { id: input },
    });
  }),
  accept: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const groupReq = await ctx.db.groupReq.findUnique({
      where: { id: input },
    });

    if (!groupReq) {
      throw new Error("Group Request not found");
    }

    await ctx.db.profile.update({
      where: { userId: groupReq.userId },
      data: {
        groupId: groupReq.groupId,
      },
    });

    return ctx.db.groupReq.delete({
      where: { id: input },
    });
  }),
});
