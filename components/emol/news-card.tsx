import Image from "next/image"
import { CategoryTag } from "./category-tag"

type Category = "chile" | "mundo" | "economia" | "deportes"

interface NewsCardProps {
  title: string
  image: string
  category: Category
  time: string
  description?: string
  variant?: "default" | "compact"
}

export function NewsCard({
  title,
  image,
  category,
  time,
  description,
  variant = "default",
}: NewsCardProps) {
  if (variant === "compact") {
    return (
      <a href="#" className="group flex gap-4 items-start">
        <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <CategoryTag category={category} className="mb-2" />
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <span className="text-xs text-muted-foreground mt-1 block">{time}</span>
        </div>
      </a>
    )
  }

  return (
    <a
      href="#"
      className="group block bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CategoryTag category={category} />
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </a>
  )
}
