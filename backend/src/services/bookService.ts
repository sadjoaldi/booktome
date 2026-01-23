import {
  getAuthorById,
  getWorkById,
  OpenLibrarySearchDoc,
  searchBooks,
} from "../api/openLibraryApi";

export class BookService {
  // Recherche de livres
  async searchBooks(query: string, author?: string, page: number = 1) {
    const data = await searchBooks(query, author, page);

    return {
      total: data.numFound,
      page,
      books: data.docs.map((book: OpenLibrarySearchDoc) => ({
        id: book.key,
        title: book.title,
        authors: book.author_name ?? [],
        year: book.first_publish_year,
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : null,
      })),
    };
  }

  // Détail d'un livre
  async getBookDetails(workId: string) {
    const work = await getWorkById(workId);

    const description =
      typeof work.description === "string"
        ? work.description
        : (work.description?.value ?? "Aucune description disponible");

    return {
      title: work.title,
      description,
      coverUrl: work.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg`
        : null,
      authors:
        work.authors?.map((auth) => auth.author.key.replace("/authors/", "")) ??
        [],
    };
  }

  // Détail d'un auteur
  async getAuthorDetail(authorId: string) {
    const author = await getAuthorById(authorId);

    return {
      name: author.name,
      bio: typeof author.bio === "string" ? author.bio : author.bio?.value,
      birth_date: author.birth_date,
      death_date: author.death_date,
      photoUrl: author.photos?.[0]
        ? `https://covers.openlibrary.org/b/id/${author.photos[0]}-L.jpg`
        : null,
    };
  }
}

export const bookService = new BookService();
