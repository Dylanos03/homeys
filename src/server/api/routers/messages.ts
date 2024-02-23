import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServer } from "../../pusher";

export const messagesRouter = createTRPCRouter({
  getUserMessages: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const profileMessages = await ctx.db.profile.findUnique({
        where: { userId: input },
        select: {
          sentMessages: { include: { fromUser: true, toUser: true } },
          receivedMessages: { include: { fromUser: true, toUser: true } },
        },
      });
      if (!profileMessages) {
        throw new Error("No User");
      }
      const allMessages = [
        ...profileMessages.sentMessages,
        ...profileMessages.receivedMessages,
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return allMessages;
    }),
  createMessage: publicProcedure
    .input(
      z.object({
        senderId: z.string(),
        receiverId: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.privateMessage.create({
        data: {
          fromUserId: input.senderId,
          toUserId: input.receiverId,
          text: input.message,
        },
      });

      pusherServer
        .trigger(`chat-${input.senderId}`, "new-message", input.message)
        .catch((err) => {
          err;
        });
      pusherServer
        .trigger(`chat-${input.receiverId}`, "new-message", input.message)
        .catch((err) => {
          err;
        });

      return post;
    }),
  getPrivateChat: publicProcedure
    .input(z.object({ user1: z.string(), user2: z.string() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.db.privateMessage.findMany({
        where: {
          OR: [
            {
              fromUserId: input.user1,
              toUserId: input.user2,
            },
            {
              fromUserId: input.user2,
              toUserId: input.user1,
            },
          ],
        },
        include: { fromUser: true, toUser: true },
        orderBy: { createdAt: "asc" },
      });

      return messages;
    }),
});
