## Entrega 2

IIC2182 - Interfaces y Experiencia de Usuario

Mario Ernst  
Nicolás Hörmann  
Joaquín Lorca

### Rediseño de Emol
https://redesing-emol.vercel.app/
## Requisitos

- Node.js 20 o superior
- pnpm 9 o superior
- PostgreSQL local disponible
- API key de Google AI Studio para Gemini

## Cómo correr la app

```bash
pnpm install
cp .env.example .env
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

Luego abrir http://localhost:3000. Configura `DATABASE_URL`,
`GEMINI_API_KEY` y opcionalmente `GEMINI_MODEL` en `.env`.

## Scripts disponibles

- `pnpm dev`: servidor de desarrollo.
- `pnpm typecheck`: validación estricta de TypeScript.
- `pnpm prisma:generate`: genera Prisma Client.
- `pnpm prisma:migrate`: aplica migraciones en PostgreSQL.
- `pnpm prisma:seed`: carga noticias y comentarios iniciales.
- `pnpm build`: build de producción.
- `pnpm start`: sirve la build de producción.

## Tecnologías usadas

- Next.js 16 con App Router
- React 19
- TypeScript 5 en modo estricto
- Tailwind CSS 4
- Prisma 7 con PostgreSQL
- tRPC 11 para queries y mutaciones tipadas
- Google GenAI SDK para resúmenes inteligentes
- Lucide React para iconografía
- Radix Slot solo para el patrón `asChild` del botón base

## Estructura principal

- `app/`: rutas, layout y composición de Server Components.
- `components/emol/`: componentes de la experiencia de noticias.
- `components/ui/`: componentes base reutilizables mínimos.
- `hooks/`: hooks reutilizables para estado de UI.
- `lib/`: utilidades, tipos, acceso a DB y servicios de noticias/IA.
- `prisma/`: schema, migraciones y seed de datos iniciales.
- `trpc/`: router tipado y cliente tRPC.
- `public/`: recursos estáticos.

## Estrategia de rendering

- `/`: Partial Prerendering con contenido dinámico transmitido bajo `Suspense`.
- `/noticia/[id]`: Partial Prerendering con resumen IA on-demand y cacheado en DB.
- Componentes client-side: `TopBar`, `NewsSection`, `Newsletter` y `ArticleComments`, porque manejan menú/búsqueda, carrusel horizontal o formularios con estado.
- Componentes server-side: layout, portada, hero, cards, footer y contenido principal de noticia, porque no necesitan estado del navegador.

## Modo lectura

- Vista normal: `/noticia/1`
- Modo lectura: `/noticia/1?vista=lectura`
