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
      <div className="mb-5">
        <span className="text-xs font-semibold uppercase text-primary">
          Archivo reciente
        </span>
        <h2 className="mt-1 text-xl font-bold text-foreground">Ayer</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} hrefSuffix={hrefSuffix} />
        ))}
      </div>
    </section>
  );
}
