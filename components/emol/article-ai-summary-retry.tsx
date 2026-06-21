"use client";

import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpcClient } from "@/trpc/client";

interface ArticleAiSummaryRetryProps {
  articleId: number;
  hora?: string;
  initialSummary: string[];
}

export function ArticleAiSummaryRetry({
  articleId,
  hora,
  initialSummary,
}: ArticleAiSummaryRetryProps) {
  const [summary, setSummary] = useState(initialSummary);
  const [status, setStatus] = useState<"failed" | "loading" | "ready">("failed");

  const handleRetry = async () => {
    setStatus("loading");

    try {
      const nextSummary = await trpcClient.news.aiSummary.query({
        articleId,
        hora,
      });
      if (nextSummary.length > 0) {
        setSummary(nextSummary);
        setStatus("ready");
        return;
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 md:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-base font-bold text-foreground">
              Resumen inteligente
            </h2>
            {status !== "ready" && (
              <p className="text-xs text-muted-foreground">
                Resumen no disponible por ahora.
              </p>
            )}
          </div>
        </div>

        {status !== "ready" && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleRetry}
            disabled={status === "loading"}
          >
            <RefreshCw className={status === "loading" ? "animate-spin" : ""} />
            {status === "loading" ? "Actualizando..." : "Reintentar"}
          </Button>
        )}
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
