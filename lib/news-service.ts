import "server-only";
import { cacheTag, revalidateTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { generateArticleSummary, getGeminiModel } from "@/lib/ai";
import { randomCommentUser, userNames } from "@/lib/comments";
import {
  categoryLabels,
  formatArticleDate,
  formatRelativeTime,
  minutesSinceMidnight,
  normalizeSearchText,
} from "@/lib/news-utils";
import type {
  Article,
  Category,
  DailySchedule,
  NewsPreview,
  NewsSectionData,
  ScheduleItem,
} from "@/lib/news-types";

export const newsCacheTag = "news";
export const commentsCacheTag = "comments";
export const aiSummaryCacheTag = "ai-summary";

const articleInclude = {
  _count: {
    select: {
      comments: true,
    },
  },
} satisfies Prisma.ArticleInclude;

type ArticleRecord = Prisma.ArticleGetPayload<{ include: typeof articleInclude }>;

const categories = ["chile", "mundo", "economia", "deportes"] as const;

function toCategory(value: string): Category {
  return categories.includes(value as Category) ? (value as Category) : "chile";
}

function toArticle(record: ArticleRecord, now = new Date()): Article {
  return {
    id: record.id,
    category: toCategory(record.category),
    title: record.title,
    description: record.description,
    subtitle: record.subtitle,
    author: record.author,
    image: record.image,
    time: formatRelativeTime(
      {
        publishedAt: record.publishedAt,
        publishHour: record.publishHour,
        publishMinute: record.publishMinute,
        dayOffset: record.dayOffset,
      },
      now,
    ),
    publishedAt: record.publishedAt,
    readingMinutes: record.readingMinutes,
    commentsCount: record.baseCommentsCount + record._count.comments,
    date: formatArticleDate(
      {
        dayOffset: record.dayOffset,
      },
      now,
    ),
    content: record.content,
  };
}

function toPreview(article: Article): NewsPreview {
  const {
    id,
    title,
    image,
    time,
    publishedAt,
    readingMinutes,
    commentsCount,
    category,
    description,
  } = article;

  return {
    id,
    title,
    image,
    time,
    publishedAt,
    readingMinutes,
    commentsCount,
    category,
    description,
  };
}

async function getAllArticles(now = new Date()) {
  "use cache";
  cacheTag(newsCacheTag);

  const records = await prisma.article.findMany({
    include: articleInclude,
    orderBy: [{ dayOffset: "asc" }, { publishHour: "asc" }, { publishMinute: "asc" }],
  });

  return records.map((record) => toArticle(record, now));
}

export async function getPublishedArticles(now = new Date()) {
  "use cache";
  cacheTag(newsCacheTag);

  const currentMinutes = minutesSinceMidnight(now);
  const records = await prisma.article.findMany({
    where: {
      dayOffset: 0,
      OR: [
        { publishHour: { lt: now.getHours() } },
        {
          publishHour: now.getHours(),
          publishMinute: { lte: now.getMinutes() },
        },
      ],
    },
    include: articleInclude,
    orderBy: [{ publishHour: "asc" }, { publishMinute: "asc" }],
  });

  if (records.length > 0) {
    return records.map((record) => toArticle(record, now));
  }

  const fallback = await prisma.article.findFirst({
    where: { dayOffset: 0 },
    include: articleInclude,
    orderBy: [{ publishHour: "asc" }, { publishMinute: "asc" }],
  });

  return fallback ? [toArticle(fallback, now)] : [];
}

export async function getHeroArticle(now = new Date()) {
  const published = await getPublishedArticles(now);
  return published[published.length - 1] ?? null;
}

export async function getHomeData({
  now = new Date(),
  query = "",
}: {
  now?: Date;
  query?: string;
}) {
  const [
    heroArticle,
    sections,
    searchResults,
    trendingNews,
    recommendedNews,
    yesterdayNews,
    schedule,
  ] =
    await Promise.all([
      getHeroArticle(now),
      getHomeSections(now),
      getSearchResults(query, now),
      getTrendingNews(now),
      getRecommendedNews(now),
      getYesterdayNews(now),
      getDailySchedule(now),
    ]);

  return {
    heroArticle,
    sections,
    searchResults,
    trendingNews,
    recommendedNews,
    yesterdayNews,
    schedule,
  };
}

export async function getHomeSections(now = new Date()): Promise<NewsSectionData[]> {
  const publishedArticles = await getPublishedArticles(now);
  const heroId = publishedArticles[publishedArticles.length - 1]?.id;

  return categories.map((category) => ({
    title: categoryLabels[category],
    category,
    news: publishedArticles
      .filter((article) => article.category === category && article.id !== heroId)
      .reverse()
      .slice(0, 4)
      .map(toPreview),
  }));
}

export async function getTrendingNews(now = new Date()) {
  return (await getPublishedArticles(now))
    .filter((article) => article.id >= 18 || article.commentsCount >= 55)
    .slice(-5)
    .reverse()
    .map(({ id, title, publishedAt, readingMinutes, time }) => ({
      id,
      title,
      publishedAt,
      time,
      readingMinutes,
    }));
}

export async function getRecommendedNews(now = new Date()): Promise<NewsPreview[]> {
  return (await getPublishedArticles(now))
    .filter((article) => article.id >= 23 || article.commentsCount >= 40)
    .slice(-4)
    .reverse()
    .map(toPreview);
}

export async function getYesterdayNews(now = new Date()): Promise<NewsPreview[]> {
  return (await getYesterdayArticles(now)).reverse().map(toPreview);
}

async function getYesterdayArticles(now = new Date()) {
  "use cache";
  cacheTag(newsCacheTag);

  const records = await prisma.article.findMany({
    where: { dayOffset: { lt: 0 } },
    include: articleInclude,
    orderBy: [{ dayOffset: "asc" }, { publishHour: "asc" }, { publishMinute: "asc" }],
  });

  return records.map((record) => toArticle(record, now));
}

export async function getArticleById(id: number, now = new Date()) {
  const [published, allArticles] = await Promise.all([
    getPublishedArticles(now),
    getAllArticles(now),
  ]);
  const article =
    published.find((candidate) => candidate.id === id) ??
    allArticles.find((candidate) => candidate.id === id) ??
    published[published.length - 1] ??
    allArticles[0] ??
    null;

  return article;
}

export async function getFollowupNews(articleId: number, now = new Date()) {
  const article = await getArticleById(articleId, now);
  const published = await getPublishedArticles(now);

  if (!article) {
    return { recommendedNews: [], relatedNews: [] };
  }

  const recommendedNews = published
    .filter((candidate) => candidate.id !== article.id)
    .sort((first, second) => {
      const firstScore =
        (first.category === article.category ? 100 : 0) + first.commentsCount;
      const secondScore =
        (second.category === article.category ? 100 : 0) + second.commentsCount;
      return secondScore - firstScore;
    })
    .slice(0, 4)
    .map(toPreview);

  const relatedNews = published
    .filter(
      (candidate) =>
        candidate.id !== article.id &&
        (candidate.category === article.category ||
          candidate.commentsCount >= article.commentsCount - 15),
    )
    .slice(0, 3)
    .map(toPreview);

  return { recommendedNews, relatedNews };
}

export async function getSearchResults(query: string, now = new Date()) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  return [...(await getPublishedArticles(now)), ...(await getYesterdayArticles(now))]
    .filter((article) => {
      const searchableText = [
        article.title,
        article.subtitle,
        article.description,
        article.author,
        categoryLabels[article.category],
        article.content.join(" "),
      ]
        .filter(Boolean)
        .join(" ");
      return normalizeSearchText(searchableText).includes(normalizedQuery);
    })
    .reverse()
    .map(toPreview);
}

export async function getDailySchedule(now = new Date()): Promise<DailySchedule> {
  "use cache";
  cacheTag(newsCacheTag);

  const currentMinutes = minutesSinceMidnight(now);
  const dayArticles = await prisma.article.findMany({
    where: { dayOffset: 0 },
    orderBy: [{ publishHour: "asc" }, { publishMinute: "asc" }],
  });
  const published = dayArticles.filter(
    (article) => article.publishHour * 60 + article.publishMinute <= currentMinutes,
  );
  const upcoming = dayArticles.filter(
    (article) => article.publishHour * 60 + article.publishMinute > currentMinutes,
  );

  const nextUpdateDelayMs = upcoming[0]
    ? Math.max(
        0,
        upcoming[0].publishHour * 60 * 60 * 1000 +
          upcoming[0].publishMinute * 60 * 1000 -
          (now.getHours() * 60 * 60 * 1000 +
            now.getMinutes() * 60 * 1000 +
            now.getSeconds() * 1000 +
            now.getMilliseconds()),
      ) + 1000
    : undefined;

  return {
    publishedCount: published.length || Math.min(dayArticles.length, 1),
    totalCount: dayArticles.length,
    currentTime: new Intl.DateTimeFormat("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now),
    nextUpdate: upcoming[0]?.publishedAt,
    nextUpdateDelayMs,
    nextTitle: upcoming[0]?.title,
    upcoming: upcoming.slice(0, 3).map(({ id, title, publishedAt, category }) => ({
      id,
      title,
      publishedAt,
      category: toCategory(category),
    })),
  };
}

export async function getScheduleItems(now = new Date()): Promise<ScheduleItem[]> {
  "use cache";
  cacheTag(newsCacheTag);

  const currentMinutes = minutesSinceMidnight(now);
  const articles = await prisma.article.findMany({
    where: { dayOffset: 0 },
    orderBy: [{ publishHour: "asc" }, { publishMinute: "asc" }],
  });

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    publishedAt: article.publishedAt,
    category: toCategory(article.category),
    description: article.description,
    isPublished: article.publishHour * 60 + article.publishMinute <= currentMinutes,
  }));
}

export async function getOrCreateAiSummary(article: Article) {
  const existing = await prisma.aiSummary.findUnique({
    where: { articleId: article.id },
  });

  if (existing) {
    return existing.bullets;
  }

  const bullets = await withTimeout(
    generateArticleSummary(article),
    300000,
    "Gemini summary timed out.",
  );
  const summary = await prisma.aiSummary.create({
    data: {
      articleId: article.id,
      bullets,
      model: getGeminiModel(),
    },
  });

  revalidateTag(aiSummaryCacheTag, "max");
  return summary.bullets;
}

export async function getComments(articleId: number) {
  return prisma.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createComment(articleId: number, body: string) {
  const user = randomCommentUser();
  const comment = await prisma.comment.create({
    data: {
      articleId,
      authorId: user.id,
      authorName: user.name,
      body,
    },
  });

  revalidateTag(commentsCacheTag, "max");
  revalidateTag(newsCacheTag, "max");
  return comment;
}

export async function createArticle(input: {
  title: string;
  subtitle: string;
  content: string[];
  category: Category;
  publishedAt: string;
  readingMinutes: number;
}) {
  const [publishHour, publishMinute] = input.publishedAt.split(":").map(Number);

  const article = await prisma.article.create({
    data: {
      title: input.title,
      description: input.subtitle,
      subtitle: input.subtitle,
      content: input.content,
      category: input.category,
      author: randomArticleAuthor(),
      image: randomNewsImageUrl(),
      publishedAt: input.publishedAt,
      publishHour,
      publishMinute,
      readingMinutes: input.readingMinutes,
      dayOffset: 0,
      baseCommentsCount: 0,
    },
    include: articleInclude,
  });

  revalidateTag(newsCacheTag, "max");
  return toArticle(article);
}

export function randomArticleAuthor() {
  return userNames[Math.floor(Math.random() * userNames.length)];
}

function randomNewsImageUrl() {
  const seed = `noticia-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return `https://picsum.photos/seed/${seed}/600/400`;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
