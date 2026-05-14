"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="rounded-lg border border-border bg-card p-4 md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Newsletter</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Recibe las noticias más importantes en tu correo cada mañana.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setIsSubscribed(false);
          }}
          required
        />
        <Button type="submit" className="w-full">
          Suscribirme
        </Button>
      </form>
      {isSubscribed && (
        <p className="mt-3 text-sm font-medium text-[#34a853]">
          Suscripción registrada.
        </p>
      )}
    </section>
  );
}
