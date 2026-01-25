import { bookService } from "@/services/bookService";
import z from "zod";
import { publicProcedure, router } from "../trpc";

export const booksRouter = router({
  // Pour la recherche de livre
  searchBooks: publicProcedure
    .input(
      z.object({
        query: z.string().min(0).optional().default(""),
        author: z.string().optional(),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ input }) => {
      return await bookService.searchBooks(
        input.query,
        input.author,
        input.page,
      );
    }),

  //Pour le detail sur un livre
  getWork: publicProcedure
    .input(
      z.object({
        workId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await bookService.getBookDetails(input.workId);
    }),

  // pour le detail sur l'auteur
  getAuthor: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ input }) => {
      return await bookService.getAuthorDetail(input.authorId);
    }),
});
