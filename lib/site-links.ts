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
      "Emol es una maqueta editorial enfocada en noticias móviles, lectura rápida y actualización durante el día.",
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
      "Canales simulados para recibir comentarios editoriales, correcciones y consultas de lectores.",
    sections: [
      {
        title: "Redacción",
        body: "Para sugerencias de cobertura o correcciones, escribe a redaccion@emol.demo.",
      },
      {
        title: "Soporte",
        body: "Para problemas de navegación, comentarios o cuenta, escribe a soporte@emol.demo.",
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
        body: "Periodistas, diseñadores, desarrolladores frontend y especialistas de datos pueden sumarse a equipos multidisciplinarios.",
      },
      {
        title: "Postulación",
        body: "Envía tu portafolio o CV a talentos@emol.demo indicando el área de interés.",
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
        body: "Los contenidos de esta maqueta son demostrativos y no representan publicaciones reales.",
      },
      {
        title: "Interacción",
        body: "Los comentarios se guardan localmente en el navegador y deben usarse con respeto hacia otros lectores.",
      },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    eyebrow: "Legal",
    summary:
      "Resumen de cómo se tratan datos en esta maqueta sin backend ni cuentas reales.",
    sections: [
      {
        title: "Datos locales",
        body: "Los comentarios se almacenan en localStorage por noticia y no se envían a servidores externos.",
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
      "Esta maqueta no instala cookies propias para seguimiento publicitario.",
    sections: [
      {
        title: "Persistencia",
        body: "La persistencia disponible corresponde a localStorage para comentarios y estado de demo.",
      },
      {
        title: "Servicios externos",
        body: "Al abrir enlaces de redes sociales, esas plataformas pueden aplicar sus propias políticas.",
      },
    ],
  },
};

export type InfoPageSlug = keyof typeof infoPages;
