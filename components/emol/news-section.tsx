"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category, NewsPreview } from "@/lib/news";
import { NewsCard } from "./news-card";

interface NewsSectionProps {
  title: string;
  category: Category;
  news: NewsPreview[];
  hrefSuffix?: string;
}

const categoryColors: Record<Category, string> = {
  chile: "bg-tag-chile",
  mundo: "bg-tag-mundo",
  economia: "bg-tag-economia",
  deportes: "bg-tag-deportes",
};

export function NewsSection({
  title,
  category,
  news,
  hrefSuffix = "",
}: NewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (news.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section id={category} className="scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-6 w-1 rounded-full ${categoryColors[category]}`} />
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => scroll("left")}
            aria-label={`Ver noticias anteriores de ${title}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => scroll("right")}
            aria-label={`Ver más noticias de ${title}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="w-[85vw] max-w-sm flex-shrink-0 snap-center md:w-72"
          >
            <NewsCard news={item} hrefSuffix={hrefSuffix} />
          </div>
        ))}
      </div>
    </section>
  );
}
