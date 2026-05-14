import { Zap } from "lucide-react";

const trendingNews = [
  {
    id: 1,
    title: "Senado aprueba proyecto de ley de pensiones en sesión histórica",
    time: "10:45",
  },
  {
    id: 2,
    title: "Terremoto de 6.2 grados sacude la zona norte del país",
    time: "10:30",
  },
  {
    id: 3,
    title: "La Roja confirma nómina para las eliminatorias sudamericanas",
    time: "10:15",
  },
  {
    id: 4,
    title: "Dólar registra fuerte caída y se ubica bajo los $900",
    time: "09:58",
  },
  {
    id: 5,
    title: "Científicos chilenos descubren nueva especie marina en Patagonia",
    time: "09:42",
  },
];

export function Trending() {
  return (
    <section className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-[#fc0029]" />
        <h2 className="text-lg font-bold text-foreground">Último Minuto</h2>
      </div>

      <ul className="space-y-4">
        {trendingNews.map((news, index) => (
          <li key={news.id}>
            <a
              href="#"
              className="group flex gap-3 items-start hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-md transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">
                {news.time}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                {news.title}
              </span>
            </a>
            {index < trendingNews.length - 1 && (
              <div className="border-b border-border mt-2 ml-14" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
