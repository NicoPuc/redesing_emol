import { cn } from "@/lib/utils";

type Category = "chile" | "mundo" | "economia" | "deportes";

interface CategoryTagProps {
  category: Category;
  className?: string;
  size?: "sm" | "default";
}

const categoryStyles: Record<
  Category,
  { bg: string; text: string; label: string }
> = {
  chile: {
    bg: "bg-[#fc0029]/10",
    text: "text-[#fc0029]",
    label: "Chile",
  },
  mundo: {
    bg: "bg-[#004da6]/10",
    text: "text-[#004da6]",
    label: "Mundo",
  },
  economia: {
    bg: "bg-[#34A853]/10",
    text: "text-[#34A853]",
    label: "Economía",
  },
  deportes: {
    bg: "bg-[#F9AB00]/10",
    text: "text-[#F9AB00]",
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
