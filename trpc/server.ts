import "server-only";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

export async function createTRPCCaller() {
  return appRouter.createCaller(await createTRPCContext());
}
