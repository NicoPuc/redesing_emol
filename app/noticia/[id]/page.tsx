import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Facebook,
  MessageCircle,
  Newspaper,
  Share2,
  Twitter,
} from "lucide-react";
import { ArticleComments } from "@/components/emol/article-comments";
import { CategoryTag } from "@/components/emol/category-tag";
import { Footer } from "@/components/emol/footer";
import { TopBar } from "@/components/emol/top-bar";
import { Button } from "@/components/ui/button";
import { getArticleById, relatedNews } from "@/lib/news";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vista?: string }>;
}

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { id } = await params;
  const { vista } = await searchParams;
  const article = getArticleById(id);
  const isReadingMode = vista === "lectura";

  return (
    <div
      className={
        isReadingMode
          ? "min-h-screen bg-[#f7f3eb] text-[#1e1e1e]"
          : "min-h-screen bg-background"
      }
    >
      {!isReadingMode && <TopBar />}

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
              href="/"
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
              href={`/noticia/${id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Newspaper className="h-4 w-4" />
              Vista normal
            </Link>
          ) : (
            <Link
              href={`/noticia/${id}?vista=lectura`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              Modo lectura
            </Link>
          )}
        </div>

        <article>
          <div className="mb-6">
            {!isReadingMode && (
              <div className="mb-4 flex items-center gap-3">
                <CategoryTag category={article.category} />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.time}</span>
                  <span className="text-border">|</span>
                  <span>{article.date}</span>
                </div>
              </div>
            )}

            <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {article.subtitle}
            </p>

            <div className="mb-6 flex items-center justify-between border-y border-border py-4">
              <span className="text-sm text-muted-foreground">
                Por{" "}
                <span className="font-medium text-foreground">
                  {article.author}
                </span>
              </span>

              {!isReadingMode && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {article.comments} comentarios
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Compartir en Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Compartir en X"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Copiar enlace"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

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
            <ArticleComments initialCommentsCount={article.comments} />
          )}
        </article>

        {!isReadingMode && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Noticias relacionadas
            </h2>

            <div className="flex flex-col gap-4">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/noticia/${news.id}`}
                  className="group flex items-start gap-3 border-b border-border py-4 last:border-0"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <CategoryTag category={news.category} size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {news.time}
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
        )}
      </main>

      {!isReadingMode && <Footer />}
    </div>
  );
}
