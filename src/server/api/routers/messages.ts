import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { PrivateMessage } from "@prisma/client";

const ee = new EventEmitter();

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
      ee.emit("add", post);
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
  onAdd: publicProcedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable<PrivateMessage>((emit) => {
      const onAdd = (data: PrivateMessage) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on("add", onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("add", onAdd);
      };
    });
  }),
});
