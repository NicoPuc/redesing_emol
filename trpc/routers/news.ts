import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import {
  createArticle,
  getArticleById,
  getDailySchedule,
  getFollowupNews,
  getHomeData,
  getOrCreateAiSummary,
  getScheduleItems,
} from "@/lib/news-service";
import { getMockDateFromTime } from "@/lib/news";

const categorySchema = z.enum(["chile", "mundo", "economia", "deportes"]);

function articleTimeSchema() {
  return z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/);
}

function splitContent(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export const newsRouter = createTRPCRouter({
  home: publicProcedure
    .input(
      z.object({
        hora: z.string().optional(),
        buscar: z.string().optional(),
      }),
    )
    .query(({ input }) =>
      getHomeData({
        now: getMockDateFromTime(input.hora),
        query: input.buscar ?? "",
      }),
    ),

  byId: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        hora: z.string().optional(),
      }),
    )
    .query(({ input }) => getArticleById(input.id, getMockDateFromTime(input.hora))),

  followup: publicProcedure
    .input(
      z.object({
        articleId: z.number().int().positive(),
        hora: z.string().optional(),
      }),
    )
    .query(({ input }) =>
      getFollowupNews(input.articleId, getMockDateFromTime(input.hora)),
    ),

  schedule: publicProcedure
    .input(z.object({ hora: z.string().optional() }))
    .query(async ({ input }) => {
      const now = getMockDateFromTime(input.hora);
      const [schedule, items] = await Promise.all([
        getDailySchedule(now),
        getScheduleItems(now),
      ]);
      return { schedule, items };
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(8).max(180),
        subtitle: z.string().trim().min(12).max(260),
        content: z.string().trim().min(40),
        category: categorySchema,
        publishedAt: articleTimeSchema(),
        readingMinutes: z.number().int().min(1).max(30),
      }),
    )
    .mutation(({ input }) =>
      createArticle({
        title: input.title,
        subtitle: input.subtitle,
        content: splitContent(input.content),
        category: input.category,
        publishedAt: input.publishedAt,
        readingMinutes: input.readingMinutes,
      }),
    ),

  aiSummary: publicProcedure
    .input(
      z.object({
        articleId: z.number().int().positive(),
        hora: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const article = await getArticleById(
        input.articleId,
        getMockDateFromTime(input.hora),
      );
      if (!article) return [];
      return getOrCreateAiSummary(article);
    }),
});
