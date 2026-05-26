import Link from "next/link";
import { sectionLinks } from "@/lib/site-links";

const footerLinks = {
  empresa: [
    { label: "Sobre nosotros", href: "/informacion/sobre-nosotros" },
    { label: "Contacto", href: "/informacion/contacto" },
    {
      label: "Trabaja con nosotros",
      href: "/informacion/trabaja-con-nosotros",
    },
  ],
  legal: [
    { label: "Términos de uso", href: "/informacion/terminos-de-uso" },
    { label: "Política de privacidad", href: "/informacion/privacidad" },
    { label: "Cookies", href: "/informacion/cookies" },
  ],
  producto: [{ label: "Pauta del día", href: "/pauta" }],
};

interface FooterProps {
  hrefSuffix?: string;
}

export function Footer({ hrefSuffix = "" }: FooterProps) {
  const sectionFooterLinks = sectionLinks.map((link) => ({
    label: link.label,
    href: `/${hrefSuffix}#${link.hash}`,
  }));
  const companyLinks = footerLinks.empresa.map((link) => ({
    ...link,
    href: `${link.href}${hrefSuffix}`,
  }));
  const legalLinks = footerLinks.legal.map((link) => ({
    ...link,
    href: `${link.href}${hrefSuffix}`,
  }));
  const productLinks = footerLinks.producto.map((link) => ({
    ...link,
    href: `${link.href}${hrefSuffix}`,
  }));

  return (
    <footer className="mt-12 bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold">emol.</span>
            <p className="mt-3 text-sm leading-relaxed text-footer-muted">
              El Mercurio Online. Noticias de Chile y el mundo en tiempo real.
            </p>
          </div>

          <FooterColumn title="Secciones" links={sectionFooterLinks} />
          <FooterColumn title="Pauta" links={productLinks} />
          <FooterColumn title="Empresa" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-8 border-t border-footer-border pt-8 text-center">
          <p className="text-sm text-footer-muted">
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
              className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
