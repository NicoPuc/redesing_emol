import Image from "next/image";
import Link from "next/link";
import { TopBar } from "@/components/emol/top-bar";
import { CategoryTag } from "@/components/emol/category-tag";
import { Footer } from "@/components/emol/footer";
import {
  Clock,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  ArrowLeft,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - in a real app this would come from a database/API
const articleData = {
  id: 1,
  title:
    'Tras alto al fuego: Irán dice que será posible "el paso seguro" por el estrecho de Ormuz durante dos semanas',
  subtitle:
    '"Nuestras poderosas Fuerzas Armadas suspenderán sus operaciones defensivas", subrayó el jefe de la diplomacia iraní.',
  category: "mundo" as const,
  author: "Redacción Emol",
  date: "8 de abril de 2026",
  time: "20:25",
  comments: 93,
  image: "https://picsum.photos/seed/hero/1200/600",
  content: [
    "El ministro de Relaciones Exteriores de Irán, Hossein Amir-Abdollahian, anunció que durante las próximas dos semanas se garantizará el paso seguro por el estrecho de Ormuz, una de las rutas marítimas más importantes del mundo para el transporte de petróleo.",
    '"Nuestras poderosas Fuerzas Armadas suspenderán sus operaciones defensivas durante este período como muestra de buena voluntad", declaró el canciller en una conferencia de prensa celebrada en Teherán.',
    "Esta decisión llega tras intensas negociaciones diplomáticas mediadas por varios países y organizaciones internacionales, que buscaban reducir las tensiones en la región del Golfo Pérsico.",
    "El estrecho de Ormuz, ubicado entre Irán y la Península Arábiga, es un punto estratégico por el que transita aproximadamente el 20% del petróleo mundial. Cualquier interrupción en esta vía tiene impactos significativos en los mercados energéticos globales.",
    "Analistas internacionales han recibido con cautela este anuncio, señalando que el plazo de dos semanas es relativamente corto y que serán necesarios acuerdos más duraderos para estabilizar la situación en la región.",
    "Por su parte, Estados Unidos y sus aliados en la zona han indicado que monitorearán de cerca el cumplimiento de este compromiso, manteniendo su presencia naval en el área como medida de precaución.",
  ],
};

const relatedNews = [
  {
    id: 2,
    title: "Trump echa pie atrás y suspende ataque a Irán por dos semanas",
    category: "mundo" as const,
    time: "19:30",
  },
  {
    id: 3,
    title: "Desde el papa a exaliados: Crece presión sobre Trump tras amenazas",
    category: "mundo" as const,
    time: "18:45",
  },
  {
    id: 4,
    title: "Ultimátum: Forman cadenas humanas y dan pastillas de yodo",
    category: "mundo" as const,
    time: "17:20",
  },
];

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vista?: string }>;
}) {
  const { id } = await params;
  const { vista } = await searchParams;
  const isReadingMode = vista === "lectura";

  // In a real app, fetch the article based on id
  const article = articleData;

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
            ? "max-w-3xl mx-auto px-6 py-10"
            : "max-w-4xl mx-auto px-4 py-8"
        }
      >
        {/* Top controls */}
        <div className="mb-6 flex items-center justify-between gap-3">
          {!isReadingMode ? (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Newspaper className="h-4 w-4" />
              Vista normal
            </Link>
          ) : (
            <Link
              href={`/noticia/${id}?vista=lectura`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Modo lectura
            </Link>
          )}
        </div>

        {/* Article Header */}
        <article>
          <div className="mb-6">
            {!isReadingMode && (
              <div className="flex items-center gap-3 mb-4">
                <CategoryTag category={article.category} />
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{article.time}</span>
                  <span className="text-border">|</span>
                  <span>{article.date}</span>
                </div>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance mb-4">
              {article.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {article.subtitle}
            </p>

            <div className="flex items-center justify-between border-y border-border py-4 mb-6">
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
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div
            className={
              isReadingMode ? "max-w-none" : "prose prose-lg max-w-none"
            }
          >
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  isReadingMode
                    ? "leading-9 mb-8 text-lg md:text-xl text-[#1e1e1e]"
                    : "text-foreground leading-relaxed mb-6 text-base md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {!isReadingMode && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                Comentarios ({article.comments})
              </h2>

              <div className="bg-card rounded-lg p-6 mb-6">
                <textarea
                  placeholder="Escribe tu comentario..."
                  className="w-full h-24 bg-background border border-border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <div className="flex justify-end mt-4">
                  <Button>Publicar comentario</Button>
                </div>
              </div>

              {/* Sample comments */}
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="bg-card rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          U
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">
                          Usuario{index + 1}
                        </span>
                        <span className="text-muted-foreground text-sm ml-2">
                          hace {index + 1}h
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Este es un comentario de ejemplo. En una implementación
                      real, los comentarios vendrían de una base de datos.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {!isReadingMode && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Noticias relacionadas
            </h2>

            <div className="flex flex-col gap-4">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/noticia/${news.id}`}
                  className="group flex items-start gap-3 py-4 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryTag category={news.category} size="sm" />
                      <span className="text-muted-foreground text-xs">
                        {news.time}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
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
