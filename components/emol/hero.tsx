import Image from "next/image";
import Link from "next/link";
import { heroArticle } from "@/lib/news";

export function Hero() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold uppercase tracking-wide text-[#004da6]">
          Mundo
        </span>
        <div className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Última actualización · Hoy 08:45
        </div>
      </div>

      <Link href={`/noticia/${heroArticle.id}`} className="group block">
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg">
          <Image
            src={heroArticle.image}
            alt={heroArticle.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />

          <div className="absolute inset-0 z-[1] hidden bg-gradient-to-t from-white/70 via-white/35 to-transparent md:block" />
          <div className="absolute left-0 top-0 z-10 h-1 w-20 bg-[#004da6]" />

          <div className="absolute bottom-20 left-4 right-4 z-10 hidden md:block lg:bottom-24 lg:left-6 lg:right-6">
            <h1 className="text-balance text-2xl font-bold leading-tight text-primary group-hover:underline lg:text-4xl">
              {heroArticle.title}
            </h1>
          </div>
        </div>

        <h1 className="text-balance text-2xl font-bold leading-tight text-primary group-hover:underline md:hidden">
          {heroArticle.title}
        </h1>
      </Link>
    </section>
  );
}
