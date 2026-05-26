import { articleSeeds } from "./news-data";
import {
  categoryLabels,
  minutesSinceMidnight,
  normalizeSearchText,
  toArticle,
  toPreview,
} from "./news-utils";
import type {
  Article,
  Category,
  DailySchedule,
  NewsPreview,
  NewsSectionData,
  ScheduleItem,
} from "./news-types";

export type {
  Article,
  Category,
  DailySchedule,
  NewsPreview,
  NewsSectionData,
  ScheduleItem,
};
export { getDailySchedule, getScheduleItems } from "./schedule";

export function getMockDateFromTime(time?: string) {
  const match = time ? /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(time) : null;
  const date = new Date();
  if (match) date.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return date;
}

export function withMockTime(hora?: string) {
  return hora ? `?hora=${encodeURIComponent(hora)}` : "";
}

export function withArticleParams({
  hora,
  vista,
}: {
  hora?: string;
  vista?: string;
}) {
  const params = new URLSearchParams();
  if (vista) params.set("vista", vista);
  if (hora) params.set("hora", hora);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getPublishedArticles(now = new Date()) {
  const currentMinutes = minutesSinceMidnight(now);
  const published = articleSeeds.filter(
    (article) =>
      (article.dayOffset ?? 0) === 0 &&
      article.publishHour * 60 + article.publishMinute <= currentMinutes,
  );
  const fallback = articleSeeds.filter((article) => (article.dayOffset ?? 0) === 0);
  return (published.length > 0 ? published : fallback.slice(0, 1)).map(
    (article) => toArticle(article, now),
  );
}

export const allArticles = articleSeeds.map((article) => toArticle(article));
export function getHeroArticle(now = new Date()) {
  const publishedArticles = getPublishedArticles(now);
  return publishedArticles[publishedArticles.length - 1];
}
export const heroArticle = getHeroArticle();

export function getHomeSections(now = new Date()): NewsSectionData[] {
  const publishedArticles = getPublishedArticles(now);
  const heroId = getHeroArticle(now).id;
  return (["chile", "mundo", "economia", "deportes"] as const).map(
    (category) => ({
      title: categoryLabels[category],
      category,
      news: publishedArticles
        .filter((article) => article.category === category && article.id !== heroId)
        .reverse()
        .slice(0, 4)
        .map(toPreview),
    }),
  );
}

export function getTrendingNews(now = new Date()) {
  return getPublishedArticles(now)
    .filter((article) => article.id >= 18 || article.commentsCount >= 55)
    .slice(-5)
    .reverse()
    .map(({ id, title, publishedAt, readingMinutes }) => ({
      id,
      title,
      time: publishedAt,
      readingMinutes,
    }));
}

export function getRecommendedNews(now = new Date()): NewsPreview[] {
  return getPublishedArticles(now)
    .filter((article) => article.id >= 23 || article.commentsCount >= 40)
    .slice(-4)
    .reverse()
    .map(toPreview);
}

export function getYesterdayNews(now = new Date()): NewsPreview[] {
  return getYesterdayArticles(now).reverse().map(toPreview);
}

function getYesterdayArticles(now = new Date()) {
  return articleSeeds
    .filter((article) => (article.dayOffset ?? 0) < 0)
    .map((article) => toArticle(article, now));
}

export function getArticleById(id: string, now = new Date()) {
  const articleId = Number(id) || getHeroArticle(now).id;
  return (
    getPublishedArticles(now).find((article) => article.id === articleId) ??
    allArticles.find((article) => article.id === articleId) ??
    getHeroArticle(now)
  );
}

export function getRecommendedNewsForArticle(
  articleId: number,
  now = new Date(),
): NewsPreview[] {
  const article = getArticleById(String(articleId), now);
  return getPublishedArticles(now)
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
}

export function getRelatedNews(articleId: number, now = new Date()) {
  const article = getArticleById(String(articleId), now);
  return getPublishedArticles(now)
    .filter(
      (relatedArticle) =>
        relatedArticle.id !== article.id &&
        (relatedArticle.category === article.category ||
          relatedArticle.commentsCount >= article.commentsCount - 15),
    )
    .slice(0, 3)
    .map(toPreview);
}

export function getSearchResults(query: string, now = new Date()): NewsPreview[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  return [...getPublishedArticles(now), ...getYesterdayArticles(now)]
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

export const homeSections = getHomeSections();
export const trendingNews = getTrendingNews();
export const recommendedNews = getRecommendedNews();
