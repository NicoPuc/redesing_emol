"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "./news-card";

type Category = "chile" | "mundo" | "economia" | "deportes";

interface NewsSectionProps {
  title: string;
  category: Category;
  news: Array<{
    id: number;
    title: string;
    image: string;
    time: string;
    description?: string;
  }>;
}

const categoryColors: Record<Category, string> = {
  chile: "bg-[#FF6B35]",
  mundo: "bg-[#004da6]",
  economia: "bg-[#34A853]",
  deportes: "bg-[#F9AB00]",
};

export function NewsSection({ title, category, news }: NewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id={category} className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-6 rounded-full ${categoryColors[category]}`} />
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll overflow-y-hidden pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory touch-pan-x [-webkit-overflow-scrolling:touch] scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[85vw] max-w-sm md:w-72 snap-center"
          >
            <NewsCard
              title={item.title}
              image={item.image}
              category={category}
              time={item.time}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
