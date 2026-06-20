import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { createComment, getComments } from "@/lib/news-service";

export const commentsRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ articleId: z.number().int().positive() }))
    .query(({ input }) => getComments(input.articleId)),

  create: publicProcedure
    .input(
      z.object({
        articleId: z.number().int().positive(),
        body: z.string().trim().min(1).max(1000),
      }),
    )
    .mutation(({ input }) => createComment(input.articleId, input.body)),
});
