import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Newspaper } from "lucide-react";
import { ArticleAiSummary } from "@/components/emol/article-ai-summary";
import { ArticleComments } from "@/components/emol/article-comments";
import { ArticleFollowup } from "@/components/emol/article-followup";
import { ArticleHeader } from "@/components/emol/article-header";
import { Footer } from "@/components/emol/footer";
import { TopBar } from "@/components/emol/top-bar";
import {
  getArticleById,
  getMockDateFromTime,
  getRecommendedNewsForArticle,
  getRelatedNews,
  withArticleParams,
  withMockTime,
} from "@/lib/news";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vista?: string; hora?: string }>;
}

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { id } = await params;
  const { vista, hora } = await searchParams;
  const now = getMockDateFromTime(hora);
  const article = getArticleById(id, now);
  const relatedNews = getRelatedNews(article.id, now);
  const recommendedNews = getRecommendedNewsForArticle(article.id, now);
  const isReadingMode = vista === "lectura";
  const hrefSuffix = withMockTime(hora);
  const normalParams = withArticleParams({ hora });
  const readingParams = withArticleParams({ hora, vista: "lectura" });

  return (
    <div
      className={
        isReadingMode
          ? "min-h-screen bg-[#f7f3eb] text-[#1e1e1e]"
          : "min-h-screen bg-background"
      }
    >
      {!isReadingMode && <TopBar hrefSuffix={hrefSuffix} hora={hora} />}

      <main
        className={
          isReadingMode
            ? "mx-auto max-w-3xl px-6 py-10"
            : "mx-auto max-w-4xl px-4 py-8"
        }
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          {!isReadingMode ? (
            <Link
              href={`/${hrefSuffix}`}
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a portada</span>
            </Link>
          ) : (
            <div />
          )}

          {isReadingMode ? (
            <Link
              href={`/noticia/${id}${normalParams}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Newspaper className="h-4 w-4" />
              Vista normal
            </Link>
          ) : (
            <Link
              href={`/noticia/${id}${readingParams}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              Modo lectura
            </Link>
          )}
        </div>

        <article>
          <ArticleHeader article={article} isReadingMode={isReadingMode} />

          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <ArticleAiSummary article={article} />

          <div className={isReadingMode ? "max-w-none" : "max-w-none"}>
            {article.content.map((paragraph) => (
              <p
                key={paragraph}
                className={
                  isReadingMode
                    ? "mb-8 text-lg leading-9 text-[#1e1e1e] md:text-xl"
                    : "mb-6 text-base leading-relaxed text-foreground md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {!isReadingMode && (
            <ArticleComments articleId={article.id} />
          )}
        </article>

        {!isReadingMode && (
          <ArticleFollowup
            relatedNews={relatedNews}
            recommendedNews={recommendedNews}
            hrefSuffix={hrefSuffix}
          />
        )}
      </main>

      {!isReadingMode && <Footer hrefSuffix={hrefSuffix} />}
    </div>
  );
}
