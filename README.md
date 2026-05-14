## Entrega 2

IIC2182 – Interfaces y Experiencia de Usuario

Mario Ernst

Nicolás Hörmann

Joaquín Lorca

### Rediseño de Emol

## Requisitos

- Node.js 20 o superior
- pnpm 9 o superior

## Cómo correr la app

1. Instalar dependencias:

```bash
pnpm install
```

2. Ejecutar en modo desarrollo:

```bash
pnpm dev
```

3. Abrir en el navegador:

- http://localhost:3000

## Scripts disponibles

- Desarrollo:

```bash
pnpm dev
```

- Build de producción:

```bash
pnpm build
```

- Ejecutar build en producción:

```bash
pnpm start
```

- Lint:

```bash
pnpm lint
```

Nota: Si `pnpm lint` falla por `eslint` no reconocido, instala ESLint en el proyecto o en tu entorno.

## Tecnologías usadas

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Radix UI (componentes accesibles)
- Lucide React (iconografía)
- React Hook Form + Zod (formularios y validación)
- Vercel Analytics

## Estructura principal

- `app/`: páginas y layout de Next.js
- `components/emol/`: componentes de UI del sitio de noticias
- `components/ui/`: biblioteca de componentes base
- `styles/` y `app/globals.css`: estilos globales
- `public/`: recursos estáticos

## Modo lectura

La vista de noticia incluye un modo lectura sin distracciones.

- Vista normal: `/noticia/1`
- Modo lectura: `/noticia/1?vista=lectura`
