import { Quote } from "lucide-react";

export function Editorial() {
  return (
    <section className="rounded-lg bg-foreground p-6 text-background md:p-8">
      <div className="flex items-start gap-4">
        <Quote className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
        <div>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary">
            Análisis del día
          </span>
          <blockquote className="mb-4 text-balance text-lg font-medium leading-relaxed md:text-xl">
            "Las nuevas políticas económicas representan un cambio de paradigma
            en la relación entre el Estado y el sector privado, con implicancias
            que se sentirán por décadas."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted-foreground/30" />
            <div>
              <p className="text-sm font-semibold">María González Fernández</p>
              <p className="text-xs text-muted-foreground">
                Editora de Economía
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
