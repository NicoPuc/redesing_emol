import type { ArticleSeed } from "./news-types";

const rawArticles = [
  [1, "mundo", "Tras alto al fuego: Irán dice que será posible \"el paso seguro\" por el estrecho de Ormuz durante dos semanas", "La cancillería iraní asegura que mantendrá una ventana de tránsito seguro en medio de negociaciones internacionales.", "Redacción Emol", "06:10", 4, 93, "hero"],
  [2, "chile", "Minería chilena alcanza récord de producción de cobre en primer trimestre", "Las exportaciones del metal rojo superan los US$15 mil millones.", "Valentina Rojas", "07:05", 3, 48, "chile1"],
  [3, "chile", "Congreso aprueba histórica reforma al sistema de transporte público", "El nuevo modelo incluye subsidios para electrificación de flotas.", "Equipo Nacional", "08:00", 4, 61, "chile2"],
  [4, "chile", "Región de Valparaíso implementa plan de emergencia por sequía", "Las autoridades llaman a racionalizar el consumo de agua.", "Camila Araya", "09:10", 3, 37, "chile3"],
  [5, "chile", "Universidad de Chile inaugura moderno centro de investigación en IA", "El proyecto contó con inversión de US$50 millones.", "Ignacio Mena", "10:20", 3, 29, "chile4"],
  [6, "mundo", "Unión Europea presenta ambicioso plan de transición energética", "El objetivo es alcanzar la neutralidad de carbono para 2040.", "Agencias", "07:20", 3, 42, "mundo1"],
  [7, "mundo", "Estados Unidos y China retoman diálogo comercial en cumbre bilateral", "Ambas potencias buscan reducir tensiones arancelarias.", "Martín Silva", "08:25", 4, 56, "mundo2"],
  [8, "mundo", "ONU alerta sobre crisis humanitaria en el Cuerno de África", "Millones de personas enfrentan inseguridad alimentaria.", "Agencias", "09:35", 3, 24, "mundo3"],
  [9, "mundo", "Japón lanza misión espacial para explorar lunas de Marte", "La sonda recolectará muestras de Fobos y Deimos.", "Sofía Carrasco", "10:45", 3, 33, "mundo4"],
  [10, "economia", "Mercados globales reaccionan positivamente a datos de empleo en EE.UU.", "Wall Street cierra con alzas superiores al 2%.", "Felipe Contreras", "07:40", 3, 40, "eco1"],
  [11, "economia", "Chile firma acuerdo comercial con países del sudeste asiático", "El tratado abre nuevos mercados para exportaciones agrícolas.", "Paula Vergara", "08:50", 4, 31, "eco2"],
  [12, "economia", "Startups chilenas captan récord de US$500 millones en capital de riesgo", "El sector fintech lidera las inversiones en el país.", "Nicolás Fuentes", "10:05", 3, 27, "eco3"],
  [13, "economia", "Precios de la energía solar alcanzan mínimos históricos a nivel mundial", "La caída impulsa la adopción de energías renovables.", "Javiera Muñoz", "11:15", 3, 38, "eco4"],
  [14, "deportes", "La Roja Sub-23 clasifica al Mundial con histórica victoria", "El combinado nacional venció 3-1 a Argentina en el Sudamericano.", "Cristóbal Díaz", "07:55", 3, 72, "dep1"],
  [15, "deportes", "Garin avanza a cuartos de final en el ATP de Barcelona", "El tenista chileno derrotó al número 10 del ranking.", "Diego Salinas", "09:00", 2, 35, "dep2"],
  [16, "deportes", "Colo Colo confirma fichaje de delantero brasileño", "El jugador llega procedente del Flamengo con contrato por 3 años.", "Mesa Deportes", "10:30", 3, 66, "dep3"],
  [17, "deportes", "Maratón de Santiago espera más de 30 mil participantes", "El evento deportivo más grande del país celebra su 20 aniversario.", "Andrea Pizarro", "11:25", 2, 22, "dep4"],
  [18, "chile", "Senado aprueba proyecto de ley de pensiones en sesión histórica", "La reforma avanza con cambios en cotización, solidaridad y gradualidad.", "Equipo Política", "12:00", 4, 105, "trend1"],
  [19, "chile", "Terremoto de 6.2 grados sacude la zona norte del país", "El movimiento fue percibido en varias regiones del norte grande.", "Mesa de Último Minuto", "12:15", 2, 88, "trend2"],
  [20, "deportes", "La Roja confirma nómina para las eliminatorias sudamericanas", "La selección inicia preparación para una fecha clave del calendario.", "Mesa Deportes", "12:30", 3, 59, "trend3"],
  [21, "economia", "Dólar registra fuerte caída y se ubica bajo los $900", "Operadores apuntan al precio del cobre y señales externas más favorables.", "Mesa Mercados", "12:45", 2, 45, "trend4"],
  [22, "chile", "Científicos chilenos descubren nueva especie marina en Patagonia", "La especie será incorporada a un catálogo de biodiversidad austral.", "Sofía Carrasco", "13:00", 3, 26, "trend5"],
  [23, "chile", "Las 10 ciudades más seguras de Chile según nuevo ranking internacional", "Un estudio internacional evalúa seguridad digital, salud y medio ambiente.", "Equipo Datos", "13:30", 3, 34, "rec1"],
  [24, "mundo", "Cumbre del G20: líderes mundiales acuerdan medidas contra el cambio climático", "Los países se comprometen a reducir emisiones en un 50% para 2035.", "Agencias", "14:00", 4, 41, "rec2"],
  [25, "economia", "Banco Central mantiene tasa de interés y proyecta inflación controlada", "El ente rector confía en que la economía mantendrá su senda de crecimiento.", "Mesa Economía", "14:30", 3, 52, "rec3"],
  [26, "deportes", "Colo Colo se prepara para enfrentar a Boca Juniors en Copa Libertadores", "El técnico albo confirmó la alineación para el duelo de octavos de final.", "Mesa Deportes", "15:00", 3, 64, "rec4"],
  [27, "chile", "Gobierno anuncia mesa técnica por seguridad en barrios críticos", "La instancia quedó citada para revisar medidas municipales y patrullajes preventivos.", "Equipo Nacional", "21:40", 3, 44, "ayer1", -1],
  [28, "mundo", "Tormentas dejan miles de evacuados en el sur de Brasil", "Autoridades locales habilitaron albergues y rutas alternativas por inundaciones.", "Agencias", "20:15", 3, 31, "ayer2", -1],
  [29, "economia", "Retail cierra jornada con alzas tras reporte de ventas online", "Analistas destacaron mejor desempeño en tecnología, vestuario y supermercados.", "Mesa Economía", "19:30", 2, 28, "ayer3", -1],
  [30, "deportes", "La UC rescata empate en el último minuto ante Audax", "El gol llegó tras una pelota detenida revisada por el VAR en tiempo agregado.", "Mesa Deportes", "18:50", 2, 53, "ayer4", -1],
  [31, "chile", "Lluvias dejan superávit parcial en embalses de la zona central", "Expertos advierten que el repunte no revierte por completo la sequía acumulada.", "Camila Araya", "17:25", 3, 36, "ayer5", -1],
] as const;

export const articleSeeds: ArticleSeed[] = rawArticles.map(
  ([id, category, title, description, author, publishedAt, readingMinutes, commentsCount, seed, dayOffset = 0]) => {
    const [publishHour, publishMinute] = publishedAt.split(":").map(Number);
    return {
      id,
      category,
      title,
      description,
      author,
      publishedAt,
      publishHour,
      publishMinute,
      readingMinutes,
      commentsCount,
      image: `https://picsum.photos/seed/${seed}/${id === 1 ? "1200/600" : "600/400"}`,
      subtitle: description,
      dayOffset,
    };
  },
);
