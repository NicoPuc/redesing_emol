import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/emol/footer";
import { ScheduleTimeline } from "@/components/emol/schedule-timeline";
import { TopBar } from "@/components/emol/top-bar";
import {
  getDailySchedule,
  getMockDateFromTime,
  getScheduleItems,
  withMockTime,
} from "@/lib/news";

export const dynamic = "force-dynamic";

interface SchedulePageProps {
  searchParams: Promise<{ hora?: string }>;
}

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const { hora } = await searchParams;
  const now = getMockDateFromTime(hora);
  const hrefSuffix = withMockTime(hora);

  return (
    <div className="min-h-screen bg-background">
      <TopBar hrefSuffix={hrefSuffix} hora={hora} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href={`/${hrefSuffix}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a portada
        </Link>
        <ScheduleTimeline
          schedule={getDailySchedule(now)}
          items={getScheduleItems(now)}
          hrefSuffix={hrefSuffix}
        />
      </main>
      <Footer hrefSuffix={hrefSuffix} />
    </div>
  );
}
