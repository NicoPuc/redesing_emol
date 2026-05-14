import { Editorial } from "@/components/emol/editorial";
import { Footer } from "@/components/emol/footer";
import { Hero } from "@/components/emol/hero";
import { Newsletter } from "@/components/emol/newsletter";
import { NewsSection } from "@/components/emol/news-section";
import { Publicidad } from "@/components/emol/publicidad";
import { Recommended } from "@/components/emol/recommended";
import { TopBar } from "@/components/emol/top-bar";
import { Trending } from "@/components/emol/trending";
import { homeSections } from "@/lib/news";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-10 lg:col-span-2">
            <Hero />

            <div className="lg:hidden">
              <Trending />
            </div>

            {homeSections.map((section) => (
              <NewsSection
                key={section.category}
                title={section.title}
                category={section.category}
                news={section.news}
              />
            ))}

            <Editorial />
          </div>

          <aside className="hidden space-y-6 lg:block">
            <Trending />
            <Newsletter />
            <Publicidad />
          </aside>
        </div>

        <div className="mt-10 lg:hidden">
          <Newsletter />
        </div>

        <div className="mt-12">
          <Recommended />
        </div>
      </main>

      <Footer />
    </div>
  );
}
