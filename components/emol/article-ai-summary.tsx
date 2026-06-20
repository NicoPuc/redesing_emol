import { Sparkles } from "lucide-react";
import type { Article } from "@/lib/news";
import { createTRPCCaller } from "@/trpc/server";
import { ArticleAiSummaryRetry } from "./article-ai-summary-retry";

interface ArticleAiSummaryProps {
  article: Article;
  hora?: string;
}

function buildSummary(article: Article) {
  return [
    `Qué pasó: ${article.description}`,
    `Por qué importa: esta historia de ${article.category} puede cambiar decisiones durante la jornada.`,
    `Qué viene ahora: seguiremos la evolución de la pauta y nuevas reacciones asociadas al tema.`,
  ];
}

export async function ArticleAiSummary({ article, hora }: ArticleAiSummaryProps) {
  let summary = buildSummary(article);
  let failed = false;

  try {
    const api = await createTRPCCaller();
    const aiSummary = await api.news.aiSummary({ articleId: article.id, hora });
    if (aiSummary.length > 0) {
      summary = aiSummary;
    }
  } catch {
    failed = true;
    summary = buildSummary(article);
  }

  if (failed) {
    return (
      <ArticleAiSummaryRetry
        articleId={article.id}
        hora={hora}
        initialSummary={summary}
      />
    );
  }

  return (
    <section className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 md:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-base font-bold text-foreground">
            Resumen inteligente
          </h2>
        </div>
      </div>

      <ul className="space-y-2">
        {summary.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
