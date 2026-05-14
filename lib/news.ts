export type Category = "chile" | "mundo" | "economia" | "deportes";

export interface NewsPreview {
  id: number;
  title: string;
  image: string;
  time: string;
  category: Category;
  description?: string;
}

export interface NewsSectionData {
  title: string;
  category: Category;
  news: NewsPreview[];
}

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  category: Category;
  author: string;
  date: string;
  time: string;
  comments: number;
  image: string;
  content: string[];
}

export const navLinks = [
  { label: "Chile", href: "#chile" },
  { label: "Mundo", href: "#mundo" },
  { label: "Economía", href: "#economia" },
  { label: "Deportes", href: "#deportes" },
  { label: "Tendencias", href: "#tendencias" },
];

export const heroArticle: Article = {
  id: 1,
  title:
    'Tras alto al fuego: Irán dice que será posible "el paso seguro" por el estrecho de Ormuz durante dos semanas',
  subtitle:
    '"Nuestras poderosas Fuerzas Armadas suspenderán sus operaciones defensivas", subrayó el jefe de la diplomacia iraní.',
  category: "mundo",
  author: "Redacción Emol",
  date: "8 de abril de 2026",
  time: "20:25",
  comments: 93,
  image: "https://picsum.photos/seed/hero/1200/600",
  content: [
    "El ministro de Relaciones Exteriores de Irán, Hossein Amir-Abdollahian, anunció que durante las próximas dos semanas se garantizará el paso seguro por el estrecho de Ormuz, una de las rutas marítimas más importantes del mundo para el transporte de petróleo.",
    '"Nuestras poderosas Fuerzas Armadas suspenderán sus operaciones defensivas durante este período como muestra de buena voluntad", declaró el canciller en una conferencia de prensa celebrada en Teherán.',
    "Esta decisión llega tras intensas negociaciones diplomáticas mediadas por varios países y organizaciones internacionales, que buscaban reducir las tensiones en la región del Golfo Pérsico.",
    "El estrecho de Ormuz, ubicado entre Irán y la Península Arábiga, es un punto estratégico por el que transita aproximadamente el 20% del petróleo mundial. Cualquier interrupción en esta vía tiene impactos significativos en los mercados energéticos globales.",
    "Analistas internacionales han recibido con cautela este anuncio, señalando que el plazo de dos semanas es relativamente corto y que serán necesarios acuerdos más duraderos para estabilizar la situación en la región.",
    "Por su parte, Estados Unidos y sus aliados en la zona han indicado que monitorearán de cerca el cumplimiento de este compromiso, manteniendo su presencia naval en el área como medida de precaución.",
  ],
};

export const homeSections: NewsSectionData[] = [
  {
    title: "Chile",
    category: "chile",
    news: [
      {
        id: 2,
        title:
          "Minería chilena alcanza récord de producción de cobre en primer trimestre",
        image: "https://picsum.photos/seed/chile1/600/400",
        time: "Hace 1 hora",
        category: "chile",
        description:
          "Las exportaciones del metal rojo superan los US$15 mil millones.",
      },
      {
        id: 3,
        title:
          "Congreso aprueba histórica reforma al sistema de transporte público",
        image: "https://picsum.photos/seed/chile2/600/400",
        time: "Hace 2 horas",
        category: "chile",
        description:
          "El nuevo modelo incluye subsidios para electrificación de flotas.",
      },
      {
        id: 4,
        title: "Región de Valparaíso implementa plan de emergencia por sequía",
        image: "https://picsum.photos/seed/chile3/600/400",
        time: "Hace 3 horas",
        category: "chile",
        description:
          "Las autoridades llaman a racionalizar el consumo de agua.",
      },
      {
        id: 5,
        title:
          "Universidad de Chile inaugura moderno centro de investigación en IA",
        image: "https://picsum.photos/seed/chile4/600/400",
        time: "Hace 4 horas",
        category: "chile",
        description: "El proyecto contó con inversión de US$50 millones.",
      },
    ],
  },
  {
    title: "Mundo",
    category: "mundo",
    news: [
      {
        id: 6,
        title:
          "Unión Europea presenta ambicioso plan de transición energética",
        image: "https://picsum.photos/seed/mundo1/600/400",
        time: "Hace 1 hora",
        category: "mundo",
        description:
          "El objetivo es alcanzar la neutralidad de carbono para 2040.",
      },
      {
        id: 7,
        title:
          "Estados Unidos y China retoman diálogo comercial en cumbre bilateral",
        image: "https://picsum.photos/seed/mundo2/600/400",
        time: "Hace 2 horas",
        category: "mundo",
        description: "Ambas potencias buscan reducir tensiones arancelarias.",
      },
      {
        id: 8,
        title: "ONU alerta sobre crisis humanitaria en el Cuerno de África",
        image: "https://picsum.photos/seed/mundo3/600/400",
        time: "Hace 3 horas",
        category: "mundo",
        description:
          "Millones de personas enfrentan inseguridad alimentaria.",
      },
      {
        id: 9,
        title: "Japón lanza misión espacial para explorar lunas de Marte",
        image: "https://picsum.photos/seed/mundo4/600/400",
        time: "Hace 4 horas",
        category: "mundo",
        description: "La sonda recolectará muestras de Fobos y Deimos.",
      },
    ],
  },
  {
    title: "Economía",
    category: "economia",
    news: [
      {
        id: 10,
        title:
          "Mercados globales reaccionan positivamente a datos de empleo en EE.UU.",
        image: "https://picsum.photos/seed/eco1/600/400",
        time: "Hace 1 hora",
        category: "economia",
        description: "Wall Street cierra con alzas superiores al 2%.",
      },
      {
        id: 11,
        title:
          "Chile firma acuerdo comercial con países del sudeste asiático",
        image: "https://picsum.photos/seed/eco2/600/400",
        time: "Hace 2 horas",
        category: "economia",
        description:
          "El tratado abre nuevos mercados para exportaciones agrícolas.",
      },
      {
        id: 12,
        title:
          "Startups chilenas captan récord de US$500 millones en capital de riesgo",
        image: "https://picsum.photos/seed/eco3/600/400",
        time: "Hace 3 horas",
        category: "economia",
        description: "El sector fintech lidera las inversiones en el país.",
      },
      {
        id: 13,
        title:
          "Precios de la energía solar alcanzan mínimos históricos a nivel mundial",
        image: "https://picsum.photos/seed/eco4/600/400",
        time: "Hace 4 horas",
        category: "economia",
        description:
          "La caída impulsa la adopción de energías renovables.",
      },
    ],
  },
  {
    title: "Deportes",
    category: "deportes",
    news: [
      {
        id: 14,
        title: "La Roja Sub-23 clasifica al Mundial con histórica victoria",
        image: "https://picsum.photos/seed/dep1/600/400",
        time: "Hace 1 hora",
        category: "deportes",
        description:
          "El combinado nacional venció 3-1 a Argentina en el Sudamericano.",
      },
      {
        id: 15,
        title: "Garin avanza a cuartos de final en el ATP de Barcelona",
        image: "https://picsum.photos/seed/dep2/600/400",
        time: "Hace 2 horas",
        category: "deportes",
        description:
          "El tenista chileno derrotó al número 10 del ranking.",
      },
      {
        id: 16,
        title: "Colo Colo confirma fichaje de delantero brasileño",
        image: "https://picsum.photos/seed/dep3/600/400",
        time: "Hace 3 horas",
        category: "deportes",
        description:
          "El jugador llega procedente del Flamengo con contrato por 3 años.",
      },
      {
        id: 17,
        title: "Maratón de Santiago espera más de 30 mil participantes",
        image: "https://picsum.photos/seed/dep4/600/400",
        time: "Hace 4 horas",
        category: "deportes",
        description:
          "El evento deportivo más grande del país celebra su 20° aniversario.",
      },
    ],
  },
];

export const trendingNews = [
  {
    id: 18,
    title: "Senado aprueba proyecto de ley de pensiones en sesión histórica",
    time: "10:45",
  },
  {
    id: 19,
    title: "Terremoto de 6.2 grados sacude la zona norte del país",
    time: "10:30",
  },
  {
    id: 20,
    title: "La Roja confirma nómina para las eliminatorias sudamericanas",
    time: "10:15",
  },
  {
    id: 21,
    title: "Dólar registra fuerte caída y se ubica bajo los $900",
    time: "09:58",
  },
  {
    id: 22,
    title: "Científicos chilenos descubren nueva especie marina en Patagonia",
    time: "09:42",
  },
];

export const recommendedNews: NewsPreview[] = [
  {
    id: 23,
    title:
      "Las 10 ciudades más seguras de Chile según nuevo ranking internacional",
    image: "https://picsum.photos/seed/rec1/600/400",
    category: "chile",
    time: "Hace 2 horas",
    description:
      "Un estudio de The Economist evalúa factores como seguridad digital, salud y medio ambiente.",
  },
  {
    id: 24,
    title:
      "Cumbre del G20: líderes mundiales acuerdan medidas contra el cambio climático",
    image: "https://picsum.photos/seed/rec2/600/400",
    category: "mundo",
    time: "Hace 3 horas",
    description:
      "Los países se comprometen a reducir emisiones en un 50% para 2035.",
  },
  {
    id: 25,
    title:
      "Banco Central mantiene tasa de interés y proyecta inflación controlada",
    image: "https://picsum.photos/seed/rec3/600/400",
    category: "economia",
    time: "Hace 4 horas",
    description:
      "El ente rector confía en que la economía mantendrá su senda de crecimiento.",
  },
  {
    id: 26,
    title:
      "Colo Colo se prepara para enfrentar a Boca Juniors en Copa Libertadores",
    image: "https://picsum.photos/seed/rec4/600/400",
    category: "deportes",
    time: "Hace 5 horas",
    description:
      "El técnico albo confirmó la alineación para el duelo de octavos de final.",
  },
];

export const relatedNews = [
  {
    id: 2,
    title: "Trump echa pie atrás y suspende ataque a Irán por dos semanas",
    category: "mundo" as const,
    time: "19:30",
  },
  {
    id: 3,
    title: "Desde el papa a exaliados: Crece presión sobre Trump tras amenazas",
    category: "mundo" as const,
    time: "18:45",
  },
  {
    id: 4,
    title: "Ultimátum: Forman cadenas humanas y dan pastillas de yodo",
    category: "mundo" as const,
    time: "17:20",
  },
];

export function getArticleById(id: string) {
  return { ...heroArticle, id: Number(id) || heroArticle.id };
}
