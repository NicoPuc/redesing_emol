import { Clock, MessageCircle } from "lucide-react";
import type { Article } from "@/lib/news";
import { ArticleShareActions } from "./article-share-actions";
import { CategoryTag } from "./category-tag";
import { CommentCount } from "./comment-count";

interface ArticleHeaderProps {
  article: Article;
  isReadingMode: boolean;
}

export function ArticleHeader({ article, isReadingMode }: ArticleHeaderProps) {
  return (
    <div className="mb-6">
      {!isReadingMode && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryTag category={article.category} />
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{article.time}</span>
            <span className="text-border">|</span>
            <span>{article.date}</span>
            <span className="text-border">|</span>
            <span>{article.readingMinutes} min de lectura</span>
          </div>
        </div>
      )}

      <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
        {article.subtitle}
      </p>

      <div className="mb-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="min-w-0 text-sm text-muted-foreground">
          Por <span className="font-medium text-foreground">{article.author}</span>
        </span>

        {!isReadingMode && (
          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">
                <CommentCount articleId={article.id} /> comentarios
              </span>
            </div>
            <ArticleShareActions articleId={article.id} title={article.title} />
          </div>
        )}
      </div>
    </div>
  );
}
