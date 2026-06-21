export type {
  Article,
  Category,
  DailySchedule,
  NewsPreview,
  NewsSectionData,
  ScheduleItem,
} from "./news-types";

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
