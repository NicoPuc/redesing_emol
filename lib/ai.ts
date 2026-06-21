import "server-only";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import type { Article } from "@/lib/news-types";

const summarySchema = z.object({
  bullets: z.array(z.string().min(20).max(180)).min(3).max(3),
});

const summaryJsonSchema = {
  type: "object",
  properties: {
    bullets: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
  },
  required: ["bullets"],
};

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  return new GoogleGenAI({ apiKey });
}

export function getGeminiModel() {
  return process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
}

function parseJsonResponse<T>(text: string | undefined, schema: z.ZodType<T>) {
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return schema.parse(JSON.parse(text));
}

export async function generateArticleSummary(article: Article) {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: getGeminiModel(),
    contents: [
      "Genera un resumen periodistico breve en espanol de Chile.",
      "Devuelve exactamente 3 bullets autonomos, concretos y utiles.",
      `Titulo: ${article.title}`,
      `Bajada: ${article.subtitle}`,
      `Categoria: ${article.category}`,
      `Cuerpo: ${article.content.join("\n\n")}`,
    ].join("\n"),
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: summaryJsonSchema,
    },
  });

  return parseJsonResponse(response.text, summarySchema).bullets;
}
