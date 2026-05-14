import { NewsCard } from "./news-card"

const recommendedNews = [
  {
    id: 1,
    title: "Las 10 ciudades más seguras de Chile según nuevo ranking internacional",
    image: "https://picsum.photos/seed/rec1/600/400",
    category: "chile" as const,
    time: "Hace 2 horas",
    description: "Un estudio de The Economist evalúa factores como seguridad digital, salud y medio ambiente.",
  },
  {
    id: 2,
    title: "Cumbre del G20: líderes mundiales acuerdan medidas contra el cambio climático",
    image: "https://picsum.photos/seed/rec2/600/400",
    category: "mundo" as const,
    time: "Hace 3 horas",
    description: "Los países se comprometen a reducir emisiones en un 50% para 2035.",
  },
  {
    id: 3,
    title: "Banco Central mantiene tasa de interés y proyecta inflación controlada",
    image: "https://picsum.photos/seed/rec3/600/400",
    category: "economia" as const,
    time: "Hace 4 horas",
    description: "El ente rector confía en que la economía mantendrá su senda de crecimiento.",
  },
  {
    id: 4,
    title: "Colo Colo se prepara para enfrentar a Boca Juniors en Copa Libertadores",
    image: "https://picsum.photos/seed/rec4/600/400",
    category: "deportes" as const,
    time: "Hace 5 horas",
    description: "El técnico albo confirmó la alineación para el duelo de octavos de final.",
  },
]

export function Recommended() {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-6">Noticias Recomendadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedNews.map((news) => (
          <NewsCard
            key={news.id}
            title={news.title}
            image={news.image}
            category={news.category}
            time={news.time}
            description={news.description}
          />
        ))}
      </div>
    </section>
  )
}
