import { articleSeeds } from "./news-data";
import { minutesSinceMidnight } from "./news-utils";
import type { DailySchedule, ScheduleItem } from "./news-types";

export function getDailySchedule(now = new Date()): DailySchedule {
  const currentMinutes = minutesSinceMidnight(now);
  const publishedCount =
    articleSeeds.filter(
      (article) =>
        (article.dayOffset ?? 0) === 0 &&
        article.publishHour * 60 + article.publishMinute <= currentMinutes,
    ).length || 1;
  const upcoming = articleSeeds.filter(
    (article) =>
      (article.dayOffset ?? 0) === 0 &&
      article.publishHour * 60 + article.publishMinute > currentMinutes,
  );

  return {
    publishedCount,
    totalCount: articleSeeds.filter((article) => (article.dayOffset ?? 0) === 0).length,
    currentTime: new Intl.DateTimeFormat("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now),
    nextUpdate: upcoming[0]?.publishedAt,
    nextTitle: upcoming[0]?.title,
    upcoming: upcoming
      .slice(0, 3)
      .map(({ id, title, publishedAt, category }) => ({
        id,
        title,
        publishedAt,
        category,
      })),
  };
}

export function getScheduleItems(now = new Date()): ScheduleItem[] {
  const currentMinutes = minutesSinceMidnight(now);
  return articleSeeds.filter((article) => (article.dayOffset ?? 0) === 0).map(
    ({
      id,
      title,
      publishedAt,
      category,
      description,
      publishHour,
      publishMinute,
    }) => ({
      id,
      title,
      publishedAt,
      category,
      description,
      isPublished: publishHour * 60 + publishMinute <= currentMinutes,
    }),
  );
}
