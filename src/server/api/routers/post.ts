import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        desc: z.string().min(1),
        userId: z.string().min(1),
        housePost: z.boolean(),
        authorName: z.string().min(1),
        authorImage: z.string().min(1),
        userLocation: z.string().min(1),
        userUniversity: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          desc: input.desc,
          authorId: input.userId,
          housePost: input.housePost,
          authorName: input.authorName,
          authorImage: input.authorImage,
          userLocation: input.userLocation,
          userUniversity: input.userUniversity,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({ orderBy: { createdAt: "desc" } });
  }),

  getByLoc: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.post.findMany({
      where: { userLocation: input },
      orderBy: { createdAt: "desc" },
    });
  }),

  getUserPosts: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { authorId: input },
        orderBy: { createdAt: "desc" },
      });
    }),

  deletePost: publicProcedure
    .input(z.number().min(1))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({ where: { id: input } });
    }),

  editPost: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        desc: z.string().min(1),
        id: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { name: input.name, desc: input.desc },
      });
    }),
});
