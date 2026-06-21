import { commentsRouter } from "@/trpc/routers/comments";
import { newsRouter } from "@/trpc/routers/news";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  news: newsRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
