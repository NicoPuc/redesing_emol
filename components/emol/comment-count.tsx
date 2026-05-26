"use client";

import { useEffect, useState } from "react";
import {
  type ArticleComment,
  commentsStorageKey,
  commentsUpdatedEvent,
  getSeededCommentCount,
} from "@/lib/comments";

interface CommentCountProps {
  articleId: number;
}

function readStoredCommentCount(articleId: number) {
  try {
    const raw = window.localStorage.getItem(commentsStorageKey(articleId));
    if (!raw) {
      return 0;
    }

    const comments = JSON.parse(raw) as ArticleComment[];
    return comments.filter((comment) => comment.articleId === articleId).length;
  } catch {
    return 0;
  }
}

export function CommentCount({ articleId }: CommentCountProps) {
  const [count, setCount] = useState(getSeededCommentCount(articleId));

  useEffect(() => {
    const updateCount = () => {
      setCount(getSeededCommentCount(articleId) + readStoredCommentCount(articleId));
    };

    const handleCommentsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ articleId: number }>;
      if (customEvent.detail.articleId === articleId) {
        updateCount();
      }
    };

    updateCount();
    window.addEventListener(commentsUpdatedEvent, handleCommentsUpdated);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener(commentsUpdatedEvent, handleCommentsUpdated);
      window.removeEventListener("storage", updateCount);
    };
  }, [articleId]);

  return <>{count}</>;
}
