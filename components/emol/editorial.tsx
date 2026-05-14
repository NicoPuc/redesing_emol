import { Quote } from "lucide-react"

export function Editorial() {
  return (
    <section className="bg-foreground text-background rounded-lg p-6 md:p-8">
      <div className="flex items-start gap-4">
        <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 block">
            Análisis del día
          </span>
          <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-4 text-balance">
            {"\"Las nuevas políticas económicas representan un cambio de paradigma en la relación entre el Estado y el sector privado, con implicancias que se sentirán por décadas.\""}
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/30" />
            <div>
              <p className="font-semibold text-sm">María González Fernández</p>
              <p className="text-xs text-muted-foreground">Editora de Economía</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
