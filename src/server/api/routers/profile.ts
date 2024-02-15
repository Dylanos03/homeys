import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        fullname: z.string().min(1),
        bio: z.string().min(1),
        interests: z.string().min(1),
        university: z.string().min(1),
        userId: z.string().min(1),
        image: z.string().min(1),
        location: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.profile.create({
        data: {
          userId: input.userId,
          username: input.username,
          fullName: input.fullname,
          bio: input.bio,
          interests: input.interests,
          university: input.university,
          image: input.image,
          location: input.location,
        },
      });
    }),

  findOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.profile.findUnique({
      where: { userId: input },
      include: { friends: true, FriendReq: true, GroupReq: true },
    });
  }),

  checkIfFriends: publicProcedure
    .input(z.object({ userId: z.string().min(1), friendId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.profile.findFirst({
        where: {
          userId: input.userId,
          friends: {
            some: {
              userId: input.friendId,
            },
          },
        },
      });
    }),

  removeFriend: publicProcedure
    .input(z.object({ userId: z.string().min(1), friendId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user1 = await ctx.db.profile.findUnique({
        where: { userId: input.userId },
      });
      const user2 = await ctx.db.profile.findUnique({
        where: { userId: input.friendId },
      });
      if (!user1 || !user2) {
        throw new Error("User not found");
      }
      await ctx.db.profile.update({
        where: { userId: user1.userId },
        data: { friends: { disconnect: { ...user2 } } },
      });
      await ctx.db.profile.update({
        where: { userId: user2.userId },
        data: { friends: { disconnect: { ...user1 } } },
      });
    }),

  getAllFriends: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.profile.findUnique({
        where: { userId: input },
        include: { friends: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user.friends;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.profile.delete({ where: { userId: input } });
  }),

  getFriendRequests: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.profile.findUnique({
        where: { userId: input },
        include: { FriendReq: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user.FriendReq;
    }),
});
