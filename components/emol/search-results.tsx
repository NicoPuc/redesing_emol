import type { NewsPreview } from "@/lib/news";
import { NewsCard } from "./news-card";

interface SearchResultsProps {
  query: string;
  results: NewsPreview[];
  hrefSuffix?: string;
}

export function SearchResults({
  query,
  results,
  hrefSuffix = "",
}: SearchResultsProps) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return null;
  }

  return (
    <section id="busqueda" className="scroll-mt-28 rounded-lg border border-border bg-card p-4 md:p-6">
      <div className="mb-5">
        <span className="text-xs font-semibold uppercase text-primary">
          Búsqueda
        </span>
        <h2 className="mt-1 text-xl font-bold text-foreground">
          Resultados para “{cleanQuery}”
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length === 1
            ? "1 noticia encontrada"
            : `${results.length} noticias encontradas`}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {results.map((news) => (
            <NewsCard key={news.id} news={news} hrefSuffix={hrefSuffix} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            No encontramos noticias publicadas para esa búsqueda. Prueba con
            Chile, economía, deporte, cobre, dólar o una palabra del titular.
          </p>
        </div>
      )}
    </section>
  );
}
