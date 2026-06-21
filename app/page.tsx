import { Editorial } from "@/components/emol/editorial";
import { Footer } from "@/components/emol/footer";
import { Hero } from "@/components/emol/hero";
import { Newsletter } from "@/components/emol/newsletter";
import { NewsSection } from "@/components/emol/news-section";
import { Recommended } from "@/components/emol/recommended";
import { ScheduleAutoRefresh } from "@/components/emol/schedule-auto-refresh";
import { SearchResults } from "@/components/emol/search-results";
import { TopBar } from "@/components/emol/top-bar";
import { Trending } from "@/components/emol/trending";
import { YesterdayNews } from "@/components/emol/yesterday-news";
import type { NewsSectionData } from "@/lib/news";
import { withMockTime } from "@/lib/news";
import { createTRPCCaller } from "@/trpc/server";
import { connection } from "next/server";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: Promise<{ hora?: string; buscar?: string }>;
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeContent({ searchParams }: HomePageProps) {
  await connection();
  const { hora, buscar = "" } = await searchParams;
  const api = await createTRPCCaller();
  const {
    heroArticle,
    sections: homeSections,
    searchResults,
    trendingNews,
    recommendedNews,
    yesterdayNews,
    schedule,
  } = await api.news.home({ hora, buscar });
  const hrefSuffix = withMockTime(hora);

  return (
    <div className="min-h-screen bg-background">
      {!hora && <ScheduleAutoRefresh delayMs={schedule.nextUpdateDelayMs} />}
      <TopBar hrefSuffix={hrefSuffix} hora={hora} initialSearch={buscar} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-10 lg:col-span-2">
            {heroArticle && <Hero article={heroArticle} hrefSuffix={hrefSuffix} />}

            <SearchResults
              query={buscar}
              results={searchResults}
              hrefSuffix={hrefSuffix}
            />

            <div className="lg:hidden">
              <Trending news={trendingNews} hrefSuffix={hrefSuffix} />
            </div>

            <div className="lg:hidden">
              <Editorial />
            </div>

            {homeSections.map((section: NewsSectionData) => (
              <NewsSection
                key={section.category}
                title={section.title}
                category={section.category}
                news={section.news}
                hrefSuffix={hrefSuffix}
              />
            ))}
          </div>

          <aside className="hidden space-y-6 lg:block">
            <Trending news={trendingNews} hrefSuffix={hrefSuffix} />
            <Newsletter />
            <Editorial />
          </aside>
        </div>

        <div className="mt-10 lg:hidden">
          <Newsletter />
        </div>

        <div className="mt-12">
          <Recommended news={recommendedNews} hrefSuffix={hrefSuffix} />
        </div>

        <div className="mt-12">
          <YesterdayNews news={yesterdayNews} hrefSuffix={hrefSuffix} />
        </div>
      </main>

      <Footer hrefSuffix={hrefSuffix} />
    </div>
  );
}
