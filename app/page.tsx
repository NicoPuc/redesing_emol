import { TopBar } from "@/components/emol/top-bar"
import { Hero } from "@/components/emol/hero"
import { Trending } from "@/components/emol/trending"
import { NewsSection } from "@/components/emol/news-section"
import { Editorial } from "@/components/emol/editorial"
import { Recommended } from "@/components/emol/recommended"
import { Newsletter } from "@/components/emol/newsletter"
import { Publicidad } from "@/components/emol/publicidad"
import { Footer } from "@/components/emol/footer"

// Sample news data
const chileNews = [
  { id: 1, title: "Minería chilena alcanza récord de producción de cobre en primer trimestre", image: "https://picsum.photos/seed/chile1/600/400", time: "Hace 1 hora", description: "Las exportaciones del metal rojo superan los US$15 mil millones." },
  { id: 2, title: "Congreso aprueba histórica reforma al sistema de transporte público", image: "https://picsum.photos/seed/chile2/600/400", time: "Hace 2 horas", description: "El nuevo modelo incluye subsidios para electrificación de flotas." },
  { id: 3, title: "Región de Valparaíso implementa plan de emergencia por sequía", image: "https://picsum.photos/seed/chile3/600/400", time: "Hace 3 horas", description: "Las autoridades llaman a racionalizar el consumo de agua." },
  { id: 4, title: "Universidad de Chile inaugura moderno centro de investigación en IA", image: "https://picsum.photos/seed/chile4/600/400", time: "Hace 4 horas", description: "El proyecto contó con inversión de US$50 millones." },
]

const mundoNews = [
  { id: 1, title: "Unión Europea presenta ambicioso plan de transición energética", image: "https://picsum.photos/seed/mundo1/600/400", time: "Hace 1 hora", description: "El objetivo es alcanzar la neutralidad de carbono para 2040." },
  { id: 2, title: "Estados Unidos y China retoman diálogo comercial en cumbre bilateral", image: "https://picsum.photos/seed/mundo2/600/400", time: "Hace 2 horas", description: "Ambas potencias buscan reducir tensiones arancelarias." },
  { id: 3, title: "ONU alerta sobre crisis humanitaria en el Cuerno de África", image: "https://picsum.photos/seed/mundo3/600/400", time: "Hace 3 horas", description: "Millones de personas enfrentan inseguridad alimentaria." },
  { id: 4, title: "Japón lanza misión espacial para explorar lunas de Marte", image: "https://picsum.photos/seed/mundo4/600/400", time: "Hace 4 horas", description: "La sonda recolectará muestras de Fobos y Deimos." },
]

const economiaNews = [
  { id: 1, title: "Mercados globales reaccionan positivamente a datos de empleo en EE.UU.", image: "https://picsum.photos/seed/eco1/600/400", time: "Hace 1 hora", description: "Wall Street cierra con alzas superiores al 2%." },
  { id: 2, title: "Chile firma acuerdo comercial con países del sudeste asiático", image: "https://picsum.photos/seed/eco2/600/400", time: "Hace 2 horas", description: "El tratado abre nuevos mercados para exportaciones agrícolas." },
  { id: 3, title: "Startups chilenas captan récord de US$500 millones en capital de riesgo", image: "https://picsum.photos/seed/eco3/600/400", time: "Hace 3 horas", description: "El sector fintech lidera las inversiones en el país." },
  { id: 4, title: "Precios de la energía solar alcanzan mínimos históricos a nivel mundial", image: "https://picsum.photos/seed/eco4/600/400", time: "Hace 4 horas", description: "La caída impulsa la adopción de energías renovables." },
]

const deportesNews = [
  { id: 1, title: "La Roja Sub-23 clasifica al Mundial con histórica victoria", image: "https://picsum.photos/seed/dep1/600/400", time: "Hace 1 hora", description: "El combinado nacional venció 3-1 a Argentina en el Sudamericano." },
  { id: 2, title: "Garin avanza a cuartos de final en el ATP de Barcelona", image: "https://picsum.photos/seed/dep2/600/400", time: "Hace 2 horas", description: "El tenista chileno derrotó al número 10 del ranking." },
  { id: 3, title: "Colo Colo confirma fichaje de delantero brasileño", image: "https://picsum.photos/seed/dep3/600/400", time: "Hace 3 horas", description: "El jugador llega procedente del Flamengo con contrato por 3 años." },
  { id: 4, title: "Maraton de Santiago espera más de 30 mil participantes", image: "https://picsum.photos/seed/dep4/600/400", time: "Hace 4 horas", description: "El evento deportivo más grande del país celebra su 20° aniversario." },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Desktop: 2-column layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Hero */}
            <Hero />
            
            {/* Mobile: Trending appears after hero */}
            <div className="lg:hidden">
              <Trending />
            </div>
            
            {/* News Sections */}
            <NewsSection title="Chile" category="chile" news={chileNews} />
            <NewsSection title="Mundo" category="mundo" news={mundoNews} />
            <NewsSection title="Economía" category="economia" news={economiaNews} />
            <NewsSection title="Deportes" category="deportes" news={deportesNews} />
            
            {/* Editorial */}
            <Editorial />
          </div>
          
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block space-y-6">
            <Trending />
            <Newsletter />
            <Publicidad />
          </aside>
        </div>
        
        {/* Mobile: Newsletter */}
        <div className="lg:hidden mt-10">
          <Newsletter />
        </div>
        
        {/* Recommended - Full width */}
        <div className="mt-12">
          <Recommended />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
