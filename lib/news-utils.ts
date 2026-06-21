import type { Article, ArticleSeed, Category, NewsPreview } from "./news-types";

export const categoryLabels: Record<Category, string> = {
  chile: "Chile",
  mundo: "Mundo",
  economia: "Economía",
  deportes: "Deportes",
};

export function buildContent(article: ArticleSeed) {
  const label = categoryLabels[article.category].toLowerCase();
  return [
    `${article.title}. ${article.description}`,
    `La redacción sigue esta historia de ${label} con foco en sus efectos inmediatos, las respuestas de autoridades y el impacto para los lectores durante la jornada.`,
    "Fuentes consultadas señalan que el tema seguirá moviéndose durante el día, por lo que la actualización horaria de la portada permite revisar el avance sin perder contexto.",
    `El antecedente central es que ${article.description.toLowerCase()} La evolución de esta noticia será clave para entender las siguientes decisiones del sector.`,
  ];
}

export function minutesSinceMidnight(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatArticleDate(
  article: Pick<ArticleSeed, "dayOffset">,
  now = new Date(),
) {
  const date = new Date(now);
  date.setDate(date.getDate() + (article.dayOffset ?? 0));
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(
  article: Pick<
    ArticleSeed,
    "publishedAt" | "publishHour" | "publishMinute" | "dayOffset"
  >,
  now = new Date(),
) {
  if ((article.dayOffset ?? 0) < 0) {
    return `Ayer ${article.publishedAt}`;
  }

  const publishedMinutes = article.publishHour * 60 + article.publishMinute;
  const diff = Math.max(0, minutesSinceMidnight(now) - publishedMinutes);
  if (diff < 5) return "Ahora";
  if (diff < 60) return `Hace ${diff} min`;
  const hours = Math.floor(diff / 60);
  return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
}

export function toArticle(article: ArticleSeed, now = new Date()): Article {
  return {
    ...article,
    date: formatArticleDate(article, now),
    time: formatRelativeTime(article, now),
    content: buildContent(article),
  };
}

export function toPreview(article: Article): NewsPreview {
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

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
