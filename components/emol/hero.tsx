import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-s font-semibold text-[#004da6] uppercase tracking-wide">
          Mundo
        </span>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">
          Última actualización · Hoy 08:45
        </div>
      </div>

      <Link href="/noticia/1" className="group block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
          <Image
            src="https://picsum.photos/seed/hero/1200/600"
            alt="Noticia principal"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />

          {/* White fade over the image for desktop readability */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-white/70 via-white/35 to-transparent z-[1]" />

          {/* Category line on top-left image border */}
          <div className="absolute top-0 left-0 w-20 h-1 bg-[#004da6] z-10" />

          {/* Desktop title overlay */}
          <div className="hidden md:block absolute left-4 right-4 bottom-20 lg:left-6 lg:right-6 lg:bottom-24 z-10">
            <h1 className="text-2xl lg:text-4xl font-bold text-primary leading-tight text-balance group-hover:underline">
              Tras alto al fuego: Irán dice que será posible &quot;el paso
              seguro&quot; por el estrecho de Ormuz durante dos semanas
            </h1>
          </div>
        </div>

        {/* Mobile title */}
        <h1 className="text-2xl font-bold text-primary leading-tight text-balance group-hover:underline md:hidden">
          Tras alto al fuego: Irán dice que será posible &quot;el paso
          seguro&quot; por el estrecho de Ormuz durante dos semanas
        </h1>
      </Link>
    </section>
  );
}
