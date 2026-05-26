import Link from "next/link";
import type { NewsPreview } from "@/lib/news";
import { CategoryTag } from "./category-tag";
import { NewsCard } from "./news-card";

interface ArticleFollowupProps {
  relatedNews: NewsPreview[];
  recommendedNews: NewsPreview[];
  hrefSuffix?: string;
}

export function ArticleFollowup({
  relatedNews,
  recommendedNews,
  hrefSuffix = "",
}: ArticleFollowupProps) {
  return (
    <>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Noticias relacionadas
        </h2>
        <div className="flex flex-col gap-4">
          {relatedNews.map((news) => (
            <Link
              key={news.id}
              href={`/noticia/${news.id}${hrefSuffix}`}
              className="group flex items-start gap-3 border-b border-border py-4 last:border-0"
            >
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <CategoryTag category={news.category} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    {news.time}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {news.readingMinutes} min de lectura
                  </span>
                </div>
                <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {news.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Noticias recomendadas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recommendedNews.map((news) => (
            <NewsCard key={news.id} news={news} hrefSuffix={hrefSuffix} />
          ))}
        </div>
      </section>
    </>
  );
}
