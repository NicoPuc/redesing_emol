import Image from "next/image";
import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";
import type { NewsPreview } from "@/lib/news";
import { CategoryTag } from "./category-tag";

interface NewsCardProps {
  news: NewsPreview;
  variant?: "default" | "compact";
  hrefSuffix?: string;
}

export function NewsCard({
  news,
  variant = "default",
  hrefSuffix = "",
}: NewsCardProps) {
  const href = `/noticia/${news.id}${hrefSuffix}`;

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex items-start gap-4">
        <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <CategoryTag category={news.category} className="mb-2" />
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span>{news.time}</span>
            <span>·</span>
            <span>{news.readingMinutes} min</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CategoryTag category={news.category} />
          <span className="text-xs text-muted-foreground">{news.time}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {news.title}
        </h3>
        {news.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {news.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {news.readingMinutes} min de lectura
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {news.commentsCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
