import { Sparkles } from "lucide-react";
import type { Article } from "@/lib/news";

interface ArticleAiSummaryProps {
  article: Article;
}

function buildSummary(article: Article) {
  return [
    `Qué pasó: ${article.description}`,
    `Por qué importa: esta historia de ${article.category} puede cambiar decisiones durante la jornada.`,
    `Qué viene ahora: seguiremos la evolución de la pauta y nuevas reacciones asociadas al tema.`,
  ];
}

export function ArticleAiSummary({ article }: ArticleAiSummaryProps) {
  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-4 md:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-base font-bold text-foreground">
            Resumen inteligente
          </h2>
          <p className="text-xs text-muted-foreground">
            Bullets generados para esta maqueta con apoyo de modelos LLM.
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {buildSummary(article).map((item) => (
          <li key={item} className="text-sm leading-relaxed text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
