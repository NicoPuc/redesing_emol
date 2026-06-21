import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { prisma } from "@/lib/db";

export async function createTRPCContext() {
  return {
    prisma,
  };
}

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
