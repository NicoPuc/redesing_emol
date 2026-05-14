"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription
    alert(`Gracias por suscribirte con: ${email}`)
    setEmail("")
  }

  return (
    <section className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Newsletter</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Recibe las noticias más importantes en tu correo cada mañana.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Suscribirme
        </Button>
      </form>
    </section>
  )
}
