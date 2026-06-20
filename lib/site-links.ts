export const sectionLinks = [
  { label: "Chile", hash: "chile" },
  { label: "Mundo", hash: "mundo" },
  { label: "Economía", hash: "economia" },
  { label: "Deportes", hash: "deportes" },
  { label: "Tendencias", hash: "tendencias" },
];

export const infoPages = {
  "sobre-nosotros": {
    title: "Sobre nosotros",
    eyebrow: "Empresa",
    summary:
      "Emol es una experiencia editorial enfocada en noticias móviles, lectura rápida y actualización durante el día.",
    sections: [
      {
        title: "Propósito",
        body: "La experiencia prioriza titulares claros, contexto breve y acceso directo a noticias relacionadas para lectores que siguen la actualidad desde el teléfono.",
      },
      {
        title: "Cobertura",
        body: "El rediseño organiza contenidos de Chile, Mundo, Economía, Deportes y Último minuto con una pauta diaria que se desbloquea por horario.",
      },
    ],
  },
  contacto: {
    title: "Contacto",
    eyebrow: "Empresa",
    summary:
      "Canales para recibir comentarios editoriales, correcciones y consultas de lectores.",
    sections: [
      {
        title: "Redacción",
        body: "Para sugerencias de cobertura o correcciones, escribe a redaccion@emol.cl.",
      },
      {
        title: "Soporte",
        body: "Para problemas de navegación, comentarios o cuenta, escribe a soporte@emol.cl.",
      },
    ],
  },
  "trabaja-con-nosotros": {
    title: "Trabaja con nosotros",
    eyebrow: "Empresa",
    summary:
      "Buscamos perfiles editoriales, de producto y tecnología para construir una experiencia de noticias más rápida y participativa.",
    sections: [
      {
        title: "Perfiles",
        body: "Periodistas, diseñadores, ingenieros de producto y especialistas de datos pueden sumarse a equipos multidisciplinarios.",
      },
      {
        title: "Postulación",
        body: "Envía tu portafolio o CV a talentos@emol.cl indicando el área de interés.",
      },
    ],
  },
  "terminos-de-uso": {
    title: "Términos de uso",
    eyebrow: "Legal",
    summary:
      "Condiciones generales para usar esta experiencia informativa y sus funciones de interacción.",
    sections: [
      {
        title: "Uso del contenido",
        body: "Los contenidos publicados están protegidos por derechos de autor y pueden actualizarse durante la jornada.",
      },
      {
        title: "Interacción",
        body: "Los comentarios deben mantener un tono respetuoso y ajustarse a las normas de participación.",
      },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    eyebrow: "Legal",
    summary:
      "Resumen de cómo se tratan datos asociados a funciones editoriales e interacción de lectores.",
    sections: [
      {
        title: "Datos de interacción",
        body: "La información enviada por lectores se utiliza para operar las funciones disponibles y mejorar la experiencia.",
      },
      {
        title: "Compartir",
        body: "Los botones de Facebook y X abren enlaces externos de compartir administrados por esas plataformas.",
      },
    ],
  },
  cookies: {
    title: "Cookies",
    eyebrow: "Legal",
    summary:
      "Uso de cookies y tecnologías similares para mantener una experiencia estable y segura.",
    sections: [
      {
        title: "Preferencias",
        body: "Algunas preferencias pueden conservarse para facilitar la navegación y mantener continuidad entre visitas.",
      },
      {
        title: "Servicios externos",
        body: "Al abrir enlaces de redes sociales, esas plataformas pueden aplicar sus propias políticas.",
      },
    ],
  },
};

export type InfoPageSlug = keyof typeof infoPages;
