import { testRoute } from "./routers/test";
import { router } from "./trpc";

export const appRouter = router({
  testRoute: testRoute,
});

export type AppRouter = typeof appRouter;
