import Link from "next/link";
import { Zap } from "lucide-react";
import { trendingNews } from "@/lib/news";

export function Trending() {
  return (
    <section id="tendencias" className="rounded-lg border border-border bg-card p-4 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-[#fc0029]" />
        <h2 className="text-lg font-bold text-foreground">Último minuto</h2>
      </div>

      <ul className="space-y-4">
        {trendingNews.map((news, index) => (
          <li key={news.id}>
            <Link
              href={`/noticia/${news.id}`}
              className="-mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary/50"
            >
              <span className="min-w-12 text-sm font-medium text-muted-foreground">
                {news.time}
              </span>
              <span className="text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary">
                {news.title}
              </span>
            </Link>
            {index < trendingNews.length - 1 && (
              <div className="ml-14 mt-2 border-b border-border" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
