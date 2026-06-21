import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, BookOpen, Newspaper } from "lucide-react";
import { ArticleAiSummary } from "@/components/emol/article-ai-summary";
import { ArticleComments } from "@/components/emol/article-comments";
import { ArticleFollowup } from "@/components/emol/article-followup";
import { ArticleHeader } from "@/components/emol/article-header";
import { Footer } from "@/components/emol/footer";
import { TopBar } from "@/components/emol/top-bar";
import type { Article } from "@/lib/news";
import {
  withArticleParams,
  withMockTime,
} from "@/lib/news";
import { createTRPCCaller } from "@/trpc/server";
import { notFound } from "next/navigation";
import { connection } from "next/server";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vista?: string; hora?: string }>;
}

export const maxDuration = 300;

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ArticleContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function ArticleContent({ params, searchParams }: ArticlePageProps) {
  await connection();
  const { id } = await params;
  const { vista, hora } = await searchParams;
  const api = await createTRPCCaller();
  const article = (await api.news.byId({ id: Number(id), hora })) as Article | null;
  if (!article) {
    notFound();
  }
  const { relatedNews, recommendedNews } = await api.news.followup({
    articleId: article.id,
    hora,
  });
  const isReadingMode = vista === "lectura";
  const hrefSuffix = withMockTime(hora);
  const normalParams = withArticleParams({ hora });
  const readingParams = withArticleParams({ hora, vista: "lectura" });

  return (
    <div
      className={
        isReadingMode
          ? "min-h-screen bg-reading-background text-reading-foreground"
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
          <ArticleHeader
            article={article}
            isReadingMode={isReadingMode}
            aiSummary={
              <Suspense
                fallback={
                  <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                    Generando resumen inteligente...
                  </div>
                }
              >
                <ArticleAiSummary article={article} hora={hora} />
              </Suspense>
            }
          />

          {!isReadingMode && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className={isReadingMode ? "max-w-none" : "max-w-none"}>
            {article.content.map((paragraph: string) => (
              <p
                key={paragraph}
                className={
                  isReadingMode
                    ? "mb-8 text-lg leading-9 text-reading-foreground md:text-xl"
                    : "mb-6 text-base leading-relaxed text-foreground md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {!isReadingMode && (
            <ArticleFollowup
              relatedNews={relatedNews}
              recommendedNews={recommendedNews}
              hrefSuffix={hrefSuffix}
            />
          )}

          {!isReadingMode && <ArticleComments articleId={article.id} />}
        </article>
      </main>

      {!isReadingMode && <Footer hrefSuffix={hrefSuffix} />}
    </div>
  );
}
