import type { NewsPreview } from "@/lib/news";
import { NewsCard } from "./news-card";

interface YesterdayNewsProps {
  news: NewsPreview[];
  hrefSuffix?: string;
}

export function YesterdayNews({ news, hrefSuffix = "" }: YesterdayNewsProps) {
  if (news.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-foreground">
        Noticias de ayer
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} hrefSuffix={hrefSuffix} />
        ))}
      </div>
    </section>
  );
}
