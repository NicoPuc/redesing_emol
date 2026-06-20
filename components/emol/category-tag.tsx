import type { Category } from "@/lib/news";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: Category;
  className?: string;
  size?: "sm" | "default";
}

const categoryStyles: Record<
  Category,
  { bg: string; label: string; text: string }
> = {
  chile: {
    bg: "bg-tag-chile/10",
    text: "text-tag-chile",
    label: "Chile",
  },
  mundo: {
    bg: "bg-tag-mundo/10",
    text: "text-tag-mundo",
    label: "Mundo",
  },
  economia: {
    bg: "bg-tag-economia/10",
    text: "text-tag-economia",
    label: "Economía",
  },
  deportes: {
    bg: "bg-tag-deportes/10",
    text: "text-tag-deportes",
    label: "Deportes",
  },
};

export function CategoryTag({
  category,
  className,
  size = "default",
}: CategoryTagProps) {
  const styles = categoryStyles[category];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        styles.bg,
        styles.text,
        className,
      )}
    >
      {styles.label}
    </span>
  );
}
