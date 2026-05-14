"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  author: string;
  body: string;
  createdAt: string;
}

interface ArticleCommentsProps {
  initialCommentsCount: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Usuario 1",
    body: "La medida necesita seguimiento internacional para ser creíble.",
    createdAt: "hace 1h",
  },
  {
    id: 2,
    author: "Usuario 2",
    body: "El plazo de dos semanas parece insuficiente para estabilizar la zona.",
    createdAt: "hace 2h",
  },
  {
    id: 3,
    author: "Usuario 3",
    body: "Es clave mirar el impacto en el precio del petróleo durante los próximos días.",
    createdAt: "hace 3h",
  },
];

export function ArticleComments({
  initialCommentsCount,
}: ArticleCommentsProps) {
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body) {
      return;
    }

    setComments((currentComments) => [
      {
        id: Date.now(),
        author: "Usuario",
        body,
        createdAt: "recién",
      },
      ...currentComments,
    ]);
    setDraft("");
  };

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
        <MessageCircle className="h-6 w-6" />
        Comentarios ({initialCommentsCount + comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-card p-6">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Escribe tu comentario..."
          className="h-24 w-full resize-none rounded-lg border border-border bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="mt-4 flex justify-end">
          <Button type="submit">Publicar comentario</Button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-lg bg-card p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium text-muted-foreground">
                  U
                </span>
              </div>
              <div>
                <span className="font-medium text-foreground">
                  {comment.author}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {comment.createdAt}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
