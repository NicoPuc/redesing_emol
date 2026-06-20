import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/emol/footer";
import { TopBar } from "@/components/emol/top-bar";
import { infoPages, type InfoPageSlug } from "@/lib/site-links";
import { notFound } from "next/navigation";

interface InfoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(infoPages).map((slug) => ({ slug }));
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page = infoPages[slug as InfoPageSlug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a portada
        </Link>

        <article>
          <span className="mb-3 block text-xs font-semibold uppercase text-primary">
            {page.eyebrow}
          </span>
          <h1 className="text-balance text-3xl font-bold leading-tight text-primary md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {page.summary}
          </p>

          <div className="mt-10 space-y-6 border-t border-border pt-8">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
