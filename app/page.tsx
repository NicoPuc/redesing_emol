import { Editorial } from "@/components/emol/editorial";
import { Footer } from "@/components/emol/footer";
import { Hero } from "@/components/emol/hero";
import { Newsletter } from "@/components/emol/newsletter";
import { NewsSection } from "@/components/emol/news-section";
import { Recommended } from "@/components/emol/recommended";
import { SearchResults } from "@/components/emol/search-results";
import { TopBar } from "@/components/emol/top-bar";
import { Trending } from "@/components/emol/trending";
import { YesterdayNews } from "@/components/emol/yesterday-news";
import {
  getHomeSections,
  getMockDateFromTime,
  getSearchResults,
  getYesterdayNews,
  withMockTime,
} from "@/lib/news";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{ hora?: string; buscar?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { hora, buscar = "" } = await searchParams;
  const now = getMockDateFromTime(hora);
  const homeSections = getHomeSections(now);
  const searchResults = getSearchResults(buscar, now);
  const yesterdayNews = getYesterdayNews(now);
  const hrefSuffix = withMockTime(hora);

  return (
    <div className="min-h-screen bg-background">
      <TopBar hrefSuffix={hrefSuffix} hora={hora} initialSearch={buscar} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-10 lg:col-span-2">
            <Hero now={now} hrefSuffix={hrefSuffix} />

            <SearchResults
              query={buscar}
              results={searchResults}
              hrefSuffix={hrefSuffix}
            />

            <div className="lg:hidden">
              <Trending now={now} hrefSuffix={hrefSuffix} />
            </div>

            <div className="lg:hidden">
              <Editorial />
            </div>

            {homeSections.map((section) => (
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
            <Trending now={now} hrefSuffix={hrefSuffix} />
            <Newsletter />
            <Editorial />
          </aside>
        </div>

        <div className="mt-10 lg:hidden">
          <Newsletter />
        </div>

        <div className="mt-12">
          <Recommended now={now} hrefSuffix={hrefSuffix} />
        </div>

        <div className="mt-12">
          <YesterdayNews news={yesterdayNews} hrefSuffix={hrefSuffix} />
        </div>
      </main>

      <Footer hrefSuffix={hrefSuffix} />
    </div>
  );
}
