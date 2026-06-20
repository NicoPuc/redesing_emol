export interface CommentUser {
  id: number;
  name: string;
}

export interface ArticleComment {
  id: number;
  articleId: number;
  user: CommentUser;
  body: string;
  createdAt: string;
  createdAtLabel?: string;
}

export const userNames = [
  "Isidora Vega",
  "Tomás Herrera",
  "Antonia Rivas",
  "Matías Castillo",
  "Catalina Soto",
  "Benjamín Reyes",
  "Florencia Lagos",
  "Gabriel Muñoz",
  "Josefa Morales",
  "Agustín Paredes",
];

const seedBodies = [
  "Esto necesita seguimiento, sobre todo por el impacto que puede tener durante el día.",
  "Buen resumen. Me gustaría ver cómo evoluciona con nuevos antecedentes.",
  "El punto clave es si las autoridades van a sostener esta medida en el tiempo.",
  "Tiene sentido mirarlo junto con lo que está pasando en redes y en regiones.",
  "Para quienes seguimos noticias desde el teléfono, estos hilos ayudan bastante.",
];

export const commentsUpdatedEvent = "emol:comments-updated";

function seedTimeLabel(index: number) {
  const minutes = (index + 1) * 45;
  if (minutes < 60) {
    return `hace ${minutes} min`;
  }

  return `hace ${Math.round(minutes / 60)} h`;
}

export function getSeededComments(articleId: number): ArticleComment[] {
  return seedBodies.slice(0, 3).map((body, index) => {
    const user = userNames[(articleId + index * 3) % userNames.length];

    return {
      id: articleId * 100 + index,
      articleId,
      user: {
        id: articleId * 10 + index,
        name: user,
      },
      body,
      createdAt: "",
      createdAtLabel: seedTimeLabel(index),
    };
  });
}

export function randomCommentUser(): CommentUser {
  const index = Math.floor(Math.random() * userNames.length);
  return {
    id: Date.now() + index,
    name: userNames[index],
  };
}

export function commentInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function relativeCommentTime(value: string | Date) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(0, Math.floor(diff / 60000));

  if (minutes < 1) {
    return "recién";
  }

  if (minutes < 60) {
    return `hace ${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} h`;
  }

  const days = Math.floor(hours / 24);
  return `hace ${days} d`;
}
