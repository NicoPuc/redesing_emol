"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpcClient } from "@/trpc/client";
import type { Category } from "@/lib/news";

const categories: Array<{ value: Category; label: string }> = [
  { value: "chile", label: "Chile" },
  { value: "mundo", label: "Mundo" },
  { value: "economia", label: "Economía" },
  { value: "deportes", label: "Deportes" },
];

export function ScheduleCreateArticleForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("chile");
  const [publishedAt, setPublishedAt] = useState("16:00");
  const [readingMinutes, setReadingMinutes] = useState(3);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      await trpcClient.news.create.mutate({
        title,
        subtitle,
        content,
        category,
        publishedAt,
        readingMinutes,
      });
      setTitle("");
      setSubtitle("");
      setContent("");
      setStatus("saved");
      router.refresh();
    } catch (mutationError) {
      setStatus("error");
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "No se pudo crear la noticia.",
      );
    }
  };

  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-4 md:p-6">
      <div className="mb-5 flex items-center gap-2">
        <FilePlus2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Crear noticia</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título"
          required
          minLength={8}
        />
        <Input
          value={subtitle}
          onChange={(event) => setSubtitle(event.target.value)}
          placeholder="Bajada"
          required
          minLength={12}
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Cuerpo de la noticia"
          required
          minLength={40}
          className="min-h-40 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base text-foreground outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Input
            type="time"
            value={publishedAt}
            onChange={(event) => setPublishedAt(event.target.value)}
            required
          />
          <Input
            type="number"
            min={1}
            max={30}
            value={readingMinutes}
            onChange={(event) =>
              setReadingMinutes(Number(event.target.value) || 1)
            }
            placeholder="Minutos de lectura"
            required
            className="sm:col-span-2"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            La imagen se genera automaticamente al publicar.
          </p>
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Publicando..." : "Publicar noticia"}
          </Button>
        </div>

        {status === "saved" && (
          <p className="text-sm font-medium text-tag-economia">
            Noticia publicada.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </section>
  );
}
