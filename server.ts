import { initTRPC } from "@trpc/server";
import { z } from "zod";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import { userRouter } from "./routers";

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

const app = express();

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// base procedure
export const authorizedProcedure = publicProcedure
  .input(z.object({ email: z.string() }))
  .use((opts) => {
    if (opts.input.email !== "swikar@gmail.com") {
      throw new trpc.TRPCError({
        code: "FORBIDDEN",
        message: "We don't take kindly to out-of-town folk",
      });
    }

    return opts.next();
  });

app.listen(4000);
