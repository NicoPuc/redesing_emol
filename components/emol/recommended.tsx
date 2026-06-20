import type { NewsPreview } from "@/lib/news";
import { NewsCard } from "./news-card";

interface RecommendedProps {
  news: NewsPreview[];
  hrefSuffix?: string;
}

export function Recommended({ news: recommendedNews, hrefSuffix = "" }: RecommendedProps) {
  if (recommendedNews.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-foreground">
        Noticias recomendadas
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedNews.map((news) => (
          <NewsCard key={news.id} news={news} hrefSuffix={hrefSuffix} />
        ))}
      </div>
    </section>
  );
}
