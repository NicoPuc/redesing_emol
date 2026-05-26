export type Category = "chile" | "mundo" | "economia" | "deportes";

export interface NewsPreview {
  id: number;
  title: string;
  image: string;
  time: string;
  publishedAt: string;
  readingMinutes: number;
  commentsCount: number;
  category: Category;
  description?: string;
}

export interface NewsSectionData {
  title: string;
  category: Category;
  news: NewsPreview[];
}

export interface Article extends NewsPreview {
  subtitle: string;
  author: string;
  date: string;
  content: string[];
}

export type ArticleSeed = Omit<Article, "date" | "time" | "content"> & {
  description: string;
  publishHour: number;
  publishMinute: number;
  dayOffset?: number;
};

export interface DailySchedule {
  publishedCount: number;
  totalCount: number;
  currentTime: string;
  nextUpdate?: string;
  nextTitle?: string;
  upcoming: Array<Pick<ArticleSeed, "id" | "title" | "publishedAt" | "category">>;
}

export interface ScheduleItem
  extends Pick<
    ArticleSeed,
    "id" | "title" | "publishedAt" | "category" | "description"
  > {
  isPublished: boolean;
}
