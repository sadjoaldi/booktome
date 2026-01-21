import { publicProcedure, router } from "../trpc";

export const testRoute = router({
  greeting: publicProcedure.query(() => "hello from trpc server"),
});
