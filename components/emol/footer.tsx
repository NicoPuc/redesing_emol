import Link from "next/link";

const footerLinks = {
  secciones: [
    { label: "Chile", href: "#chile" },
    { label: "Mundo", href: "#mundo" },
    { label: "Economía", href: "#economia" },
    { label: "Deportes", href: "#deportes" },
    { label: "Tendencias", href: "#tendencias" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "/" },
    { label: "Contacto", href: "/" },
    { label: "Trabaja con nosotros", href: "/" },
    { label: "Publicidad", href: "/" },
  ],
  legal: [
    { label: "Términos de uso", href: "/" },
    { label: "Política de privacidad", href: "/" },
    { label: "Cookies", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-12 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold">emol.</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              El Mercurio Online. Noticias de Chile y el mundo en tiempo real.
            </p>
          </div>

          <FooterColumn title="Secciones" links={footerLinks.secciones} />
          <FooterColumn title="Empresa" links={footerLinks.empresa} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-8 border-t border-muted-foreground/20 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 El Mercurio S.A.P. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-background"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
