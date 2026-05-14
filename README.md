## Entrega 2

IIC2182 - Interfaces y Experiencia de Usuario

Mario Ernst  
Nicolás Hörmann  
Joaquín Lorca

### Rediseño de Emol

## Requisitos

- Node.js 20 o superior
- pnpm 9 o superior

## Cómo correr la app

```bash
pnpm install
pnpm dev
```

Luego abrir http://localhost:3000.

## Scripts disponibles

- `pnpm dev`: servidor de desarrollo.
- `pnpm typecheck`: validación estricta de TypeScript.
- `pnpm build`: build de producción.
- `pnpm start`: sirve la build de producción.

## Tecnologías usadas

- Next.js 16 con App Router
- React 19
- TypeScript 5 en modo estricto
- Tailwind CSS 4
- Lucide React para iconografía
- Radix Slot solo para el patrón `asChild` del botón base

## Estructura principal

- `app/`: rutas, layout y composición de Server Components.
- `components/emol/`: componentes de la experiencia de noticias.
- `components/ui/`: componentes base reutilizables mínimos.
- `hooks/`: hooks reutilizables para estado de UI.
- `lib/`: utilidades, tipos y datos tipados de noticias.
- `public/`: recursos estáticos.

## Estrategia de rendering

- `/`: portada estática. La información usada por la maqueta está tipada en `lib/news.ts`, por lo que la página puede prerenderizarse.
- `/noticia/[id]`: SSR bajo demanda. La ruta depende de `params` y `searchParams` para alternar entre vista normal y modo lectura.
- Componentes client-side: `TopBar`, `NewsSection`, `Newsletter` y `ArticleComments`, porque manejan menú/búsqueda, carrusel horizontal o formularios con estado.
- Componentes server-side: layout, portada, hero, cards, footer y contenido principal de noticia, porque no necesitan estado del navegador.

## Modo lectura

- Vista normal: `/noticia/1`
- Modo lectura: `/noticia/1?vista=lectura`
