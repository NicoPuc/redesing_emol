"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  commentInitials,
  commentsUpdatedEvent,
  relativeCommentTime,
} from "@/lib/comments";
import { trpcClient } from "@/trpc/client";

interface ArticleCommentsProps {
  articleId: number;
}

interface CommentView {
  id: number;
  articleId: number;
  authorName: string;
  body: string;
  createdAt: Date;
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState<CommentView[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    trpcClient.comments.list.query({ articleId }).then((items) => {
      if (isMounted) {
        setComments(items);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [articleId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body) {
      return;
    }

    try {
      setIsSubmitting(true);
      const comment = await trpcClient.comments.create.mutate({ articleId, body });
      setComments((current) => [comment, ...current]);
      window.setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent(commentsUpdatedEvent, {
            detail: { articleId },
          }),
        );
      }, 0);
      setDraft("");
    } finally {
      setIsSubmitting(false);
    }
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
            {isSubmitting ? "Publicando..." : "Publicar comentario"}
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
                {commentInitials(comment.authorName)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-foreground">
                    {comment.authorName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {relativeCommentTime(comment.createdAt)}
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
