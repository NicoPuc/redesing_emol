import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getHeroArticle } from "@/lib/news";
import { CategoryTag } from "./category-tag";

interface HeroProps {
  now?: Date;
  hrefSuffix?: string;
}

export function Hero({ now, hrefSuffix = "" }: HeroProps) {
  const heroArticle = getHeroArticle(now);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <CategoryTag category={heroArticle.category} />
        <div className="flex items-center gap-1.5 text-right text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {heroArticle.time} · {heroArticle.readingMinutes} min
        </div>
      </div>

      <Link
        href={`/noticia/${heroArticle.id}${hrefSuffix}`}
        className="group block"
      >
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
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:hidden">
          {heroArticle.description}
        </p>
      </Link>
    </section>
  );
}
