"use client";

import { useEffect, useMemo, useState } from "react";
import { Facebook, Link as LinkIcon, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleShareActionsProps {
  articleId: number;
  title: string;
}

export function ArticleShareActions({
  articleId,
  title,
}: ArticleShareActionsProps) {
  const fallbackUrl = `https://www.emol.com/noticia/${articleId}`;
  const [shareUrl, setShareUrl] = useState(fallbackUrl);
  const [status, setStatus] = useState("Copiar enlace");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/noticia/${articleId}`);
  }, [articleId]);

  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    };
  }, [shareUrl, title]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        setStatus("Compartido");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setStatus("Enlace copiado");
    } catch {
      setStatus("Abre el enlace");
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex items-center gap-1.5" aria-label="Compartir noticia">
      <Button asChild variant="ghost" size="icon-sm">
        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Facebook"
          title="Compartir en Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon-sm">
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en X"
          title="Compartir en X"
        >
          <X className="h-4 w-4" />
        </a>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleShare}
        aria-label={status}
        title={status}
      >
        {status === "Copiar enlace" ? (
          <Share2 className="h-4 w-4" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
