import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getUserGroup: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input },
        select: { groupId: true },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      if (!userProfile.groupId) {
        throw new Error("User has no group");
      }

      return ctx.db.group.findUnique({
        where: { id: userProfile.groupId },
        include: { members: true },
      });
    }),
  createGroup: publicProcedure
    .input(z.object({ name: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input.userId },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      return ctx.db.group.create({
        data: {
          name: input.name,
          members: {
            connect: {
              userId: userProfile.userId,
            },
          },
        },
      });
    }),
  leaveGroup: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const userProfile = await ctx.db.profile.findUnique({
        where: { userId: input },
      });

      if (!userProfile) {
        throw new Error("User not found");
      }

      if (!userProfile.groupId) {
        throw new Error("User has no group");
      }

      await ctx.db.profile.update({
        where: { userId: userProfile.userId },
        data: {
          groupId: null,
        },
      });

      return ctx.db.group.update({
        where: { id: userProfile.groupId },
        data: {
          members: {
            disconnect: {
              userId: userProfile.userId,
            },
          },
        },
      });
    }),
});
