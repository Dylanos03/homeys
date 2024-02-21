import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServer } from "~/server/pusher";

export const groupMessagesRouter = createTRPCRouter({
  getGroupMessages: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.group.findUnique({
        where: { id: input },
        include: {
          Messages: { include: { user: true }, orderBy: { createdAt: "asc" } },
        },
      });
    }),
  createMessage: publicProcedure
    .input(
      z.object({
        senderId: z.string(),
        groupId: z.number(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.groupMessage.create({
        data: {
          text: input.message,
          userId: input.senderId,
          groupId: input.groupId,
        },
      });

      try {
        await pusherServer.trigger(
          `group-chat-${input.groupId}`,
          "new-message",
          post,
        );
      } catch (err) {
        console.error(err);
      }

      return post;
    }),
});
