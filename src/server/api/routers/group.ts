import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getUserGroup: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      return ctx.db.profile.findUnique({
        where: { userId: input },
        include: { Group: true },
      });
    }),
});
