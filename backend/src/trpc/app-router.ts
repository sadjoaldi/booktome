import { booksRouter } from "./routers/books";
import { testRoute } from "./routers/test";
import { router } from "./trpc";

export const appRouter = router({
  testRoute: testRoute,
  booksRoute: booksRouter,
});

export type AppRouter = typeof appRouter;
