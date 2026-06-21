import Link from "next/link";
import { sectionLinks } from "@/lib/site-links";
import { TopBarControls } from "./top-bar-controls";

interface TopBarProps {
  hrefSuffix?: string;
  hora?: string;
  initialSearch?: string;
}

export function TopBar({
  hrefSuffix = "",
  hora,
  initialSearch = "",
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          <Link
            href={`/${hrefSuffix}`}
            className="flex items-center"
            aria-label="Ir a portada"
          >
            <span className="inline-flex items-end gap-1 text-3xl font-bold leading-none md:text-4xl">
              <span className="text-primary">emol</span>
              <span className="mb-[0.08em] inline-block h-[0.32em] w-[0.32em] rounded-[0.12em] bg-tag-chile" />
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {sectionLinks.map((link) => (
              <Link
                key={link.label}
                href={`/${hrefSuffix}#${link.hash}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <TopBarControls
            hrefSuffix={hrefSuffix}
            hora={hora}
            initialSearch={initialSearch}
          />
        </div>
      </div>
    </header>
  );
}
