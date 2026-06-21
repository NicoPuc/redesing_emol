import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/emol/footer";
import { ScheduleAutoRefresh } from "@/components/emol/schedule-auto-refresh";
import { ScheduleCreateArticleForm } from "@/components/emol/schedule-create-article-form";
import { ScheduleTimeline } from "@/components/emol/schedule-timeline";
import { TopBar } from "@/components/emol/top-bar";
import { withMockTime } from "@/lib/news";
import { createTRPCCaller } from "@/trpc/server";
import { connection } from "next/server";
import { Suspense } from "react";

interface SchedulePageProps {
  searchParams: Promise<{ hora?: string }>;
}

export default function SchedulePage({ searchParams }: SchedulePageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ScheduleContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ScheduleContent({ searchParams }: SchedulePageProps) {
  await connection();
  const { hora } = await searchParams;
  const api = await createTRPCCaller();
  const { schedule, items } = await api.news.schedule({ hora });
  const hrefSuffix = withMockTime(hora);

  return (
    <div className="min-h-screen bg-background">
      {!hora && <ScheduleAutoRefresh delayMs={schedule.nextUpdateDelayMs} />}
      <TopBar hrefSuffix={hrefSuffix} hora={hora} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href={`/${hrefSuffix}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a portada
        </Link>
        <ScheduleCreateArticleForm />
        <ScheduleTimeline
          schedule={schedule}
          items={items}
          hrefSuffix={hrefSuffix}
        />
      </main>
      <Footer hrefSuffix={hrefSuffix} />
    </div>
  );
}
