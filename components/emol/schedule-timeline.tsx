import Link from "next/link";
import { CheckCircle2, Clock3 } from "lucide-react";
import type { DailySchedule, ScheduleItem } from "@/lib/news";
import { CategoryTag } from "./category-tag";

interface ScheduleTimelineProps {
  schedule: DailySchedule;
  items: ScheduleItem[];
  hrefSuffix?: string;
}

export function ScheduleTimeline({
  schedule,
  items,
  hrefSuffix = "",
}: ScheduleTimelineProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-4 md:p-6">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase text-primary">
          {schedule.currentTime}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-primary md:text-5xl">
          Pauta del día
        </h1>
        <p className="mt-3 text-muted-foreground">
          Esta vista simula una pauta editorial real: las noticias del día se
          publican progresivamente según el horario configurado en la maqueta.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {schedule.publishedCount} de {schedule.totalCount} noticias publicadas.
        </p>
      </div>

      <ol className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-border bg-background p-4">
            <Link href={`/noticia/${item.id}${hrefSuffix}`} className="group flex gap-3">
              <span className="mt-1 flex min-w-14 items-center gap-1 text-sm font-semibold text-primary">
                {item.isPublished ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock3 className="h-4 w-4" />
                )}
                {item.publishedAt}
              </span>
              <div className="min-w-0">
                <CategoryTag category={item.category} size="sm" className="mb-2" />
                <h2 className="font-semibold leading-snug text-foreground group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
