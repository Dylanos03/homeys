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
    return ctx.db.profile.findUnique({ where: { userId: input } });
  }),
});
