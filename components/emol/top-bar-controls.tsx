"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDisclosure } from "@/hooks/use-disclosure";
import { sectionLinks } from "@/lib/site-links";

interface TopBarControlsProps {
  hrefSuffix?: string;
  hora?: string;
  initialSearch?: string;
}

export function TopBarControls({
  hrefSuffix = "",
  hora,
  initialSearch = "",
}: TopBarControlsProps) {
  const router = useRouter();
  const menu = useDisclosure();
  const search = useDisclosure(Boolean(initialSearch));
  const [query, setQuery] = useState(initialSearch);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const focusSearch = () => {
    search.open();
    window.setTimeout(() => {
      const input = desktopSearchRef.current ?? mobileSearchRef.current;
      input?.focus();
      input?.select();
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") {
        event.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const cleanQuery = query.trim();
    if (hora) params.set("hora", hora);
    if (cleanQuery) params.set("buscar", cleanQuery);
    const queryString = params.toString();
    router.push(`/${queryString ? `?${queryString}` : ""}${cleanQuery ? "#busqueda" : ""}`);
    menu.close();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="hidden items-center md:flex">
          {search.isOpen ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input ref={desktopSearchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar noticias..." className="w-64" autoFocus />
              <Button type="button" variant="ghost" size="icon" onClick={search.close} aria-label="Cerrar búsqueda">
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <Button type="button" variant="ghost" size="icon" onClick={focusSearch} aria-label="Abrir búsqueda">
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        <Button type="button" variant="ghost" size="icon" className="md:hidden" onClick={focusSearch} aria-label="Buscar">
          <Search className="h-5 w-5" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="md:hidden" onClick={menu.toggle} aria-label="Abrir menú">
          {menu.isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {search.isOpen && (
        <div className="absolute left-0 right-0 top-20 border-b border-border bg-background px-4 pb-4 md:hidden">
          <form onSubmit={handleSubmit}>
            <Input ref={mobileSearchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar noticias..." className="w-full" autoFocus />
          </form>
        </div>
      )}

      {menu.isOpen && (
        <nav className={`${search.isOpen ? "top-36" : "top-20"} absolute left-0 right-0 border-b border-border bg-background px-4 pb-4 pt-4 md:hidden`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {sectionLinks.map((link) => (
              <Link key={link.label} href={`/${hrefSuffix}#${link.hash}`} className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={menu.close}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
