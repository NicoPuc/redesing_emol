"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDisclosure } from "@/hooks/use-disclosure";
import { navLinks } from "@/lib/news";

export function TopBar() {
  const menu = useDisclosure();
  const search = useDisclosure();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Ir a portada">
            <span className="inline-flex items-end gap-1 text-3xl font-bold leading-none md:text-4xl">
              <span className="text-[#004da6]">emol</span>
              <span className="mb-[0.08em] inline-block h-[0.32em] w-[0.32em] rounded-[0.12em] bg-[#fc0029]" />
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center md:flex">
              {search.isOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Buscar noticias..."
                    className="w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={search.close}
                    aria-label="Cerrar búsqueda"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={search.open}
                  aria-label="Abrir búsqueda"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={search.toggle}
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={menu.toggle}
              aria-label="Abrir menú"
            >
              {menu.isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {search.isOpen && (
          <div className="pb-4 md:hidden">
            <Input
              type="search"
              placeholder="Buscar noticias..."
              className="w-full"
              autoFocus
            />
          </div>
        )}

        {menu.isOpen && (
          <nav className="border-t border-border pb-4 pt-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={menu.close}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
