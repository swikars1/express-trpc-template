import { z } from "zod";
import { publicProcedure, router } from "../server";
import { db } from "../prisma/prismaClient";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async (opts) => {
      const user = await db.user.findFirst({
        where: opts.input,
      });
      return user;
    }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).optional(),
        email: z.string().email(),
      })
    )
    .mutation(async (opts) => {
      return await db.user.create({
        data: opts.input,
      });
    }),
});
