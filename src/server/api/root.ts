import { profileRouter } from "~/server/api/routers/profile";
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { friendReqRouter } from "./routers/friendReq";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profile: profileRouter,
  friendReq: friendReqRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
