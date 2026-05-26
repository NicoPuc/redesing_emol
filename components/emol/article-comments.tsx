"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ArticleComment,
  commentInitials,
  commentsStorageKey,
  commentsUpdatedEvent,
  getSeededComments,
  randomCommentUser,
  relativeCommentTime,
} from "@/lib/comments";

interface ArticleCommentsProps {
  articleId: number;
}

function readStoredComments(articleId: number): ArticleComment[] {
  try {
    const raw = window.localStorage.getItem(commentsStorageKey(articleId));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as ArticleComment[];
    return parsed.filter((comment) => comment.articleId === articleId);
  } catch {
    return [];
  }
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [draft, setDraft] = useState("");
  const [storedComments, setStoredComments] = useState<ArticleComment[]>([]);
  const baseComments = useMemo(() => getSeededComments(articleId), [articleId]);

  useEffect(() => {
    setStoredComments(readStoredComments(articleId));
  }, [articleId]);

  const comments = [...storedComments, ...baseComments];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body) {
      return;
    }

    const nextComments = [
      {
        id: Date.now(),
        articleId,
        user: randomCommentUser(),
        body,
        createdAt: new Date().toISOString(),
      },
      ...storedComments,
    ];

    setStoredComments(nextComments);
    window.localStorage.setItem(
      commentsStorageKey(articleId),
      JSON.stringify(nextComments),
    );
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(commentsUpdatedEvent, {
          detail: { articleId },
        }),
      );
    }, 0);
    setDraft("");
  };

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-foreground md:text-2xl">
        <MessageCircle className="h-6 w-6" />
        Comentarios ({comments.length})
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-lg border border-border bg-card p-4 md:p-6"
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Escribe tu comentario..."
          className="h-28 w-full resize-none rounded-lg border border-border bg-background p-4 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="mt-4 flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            Publicar comentario
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {commentInitials(comment.user.name)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-foreground">
                    {comment.user.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {comment.createdAtLabel ??
                      relativeCommentTime(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {comment.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
