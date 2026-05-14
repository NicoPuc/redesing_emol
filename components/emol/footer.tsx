const footerLinks = {
  secciones: [
    { label: "Chile", href: "#" },
    { label: "Mundo", href: "#" },
    { label: "Economía", href: "#" },
    { label: "Deportes", href: "#" },
    { label: "Tendencias", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Trabaja con Nosotros", href: "#" },
    { label: "Publicidad", href: "#" },
  ],
  legal: [
    { label: "Términos de Uso", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold">emol.</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              El Mercurio Online. Noticias de Chile y el mundo en tiempo real.
            </p>
          </div>

          {/* Secciones */}
          <div>
            <h3 className="font-semibold mb-4">Secciones</h3>
            <ul className="space-y-2">
              {footerLinks.secciones.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 El Mercurio S.A.P. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
