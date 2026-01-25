import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BookCard from "../components/bookCard";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import SearchBar from "../components/searchBar";
import { useDebounce } from "../hooks/useDebounce";
import "../styles/bookSearchResult.css";
import { trpc } from "../utils/trpc";

interface BooksData {
  total: number;
  page: number;
  books: Array<{
    id: string;
    title: string;
    authors: string[];
    year?: number;
    coverUrl: string | null;
  }>;
}

export default function BookSearchResult() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const RESULTS_PER_PAGE = 20;

  // Debounce les requêtes avec un délai de 500ms
  const debouncedQuery = useDebounce(searchQuery, 500);
  const debouncedAuthor = useDebounce(searchAuthor, 500);

  const findBooksData = useQuery({
    ...trpc.booksRoute.searchBooks.queryOptions({
      query: debouncedQuery,
      author: debouncedAuthor || undefined,
      page: currentPage,
    }),
    // Activer seulement si au moins 4 caractères ou auteur de 4+ caractères
    enabled: debouncedQuery.length >= 4 || debouncedAuthor.length >= 4,
  });

  const {
    data: books,
    isLoading,
    isPending,
  } = findBooksData as {
    data: BooksData | undefined;
    isLoading: boolean;
    isPending: boolean;
  };

  // Réinitialiser la page quand la recherche change
  const handleSearchChange = (type: "query" | "author", value: string) => {
    setCurrentPage(1);
    if (type === "query") {
      setSearchQuery(value);
    } else {
      setSearchAuthor(value);
    }
  };

  // Calculer le nombre total de pages
  const totalPages = books ? Math.ceil(books.total / RESULTS_PER_PAGE) : 0;

  return (
    <div className="search-books">
      <h1>Recherche de Livres</h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(value) => handleSearchChange("query", value)}
        searchAuthor={searchAuthor}
        setSearchAuthor={(value) => handleSearchChange("author", value)}
      />

      {searchQuery.length === 0 && searchAuthor.length === 0 ? (
        <p>Entrez un titre ou un auteur pour rechercher...</p>
      ) : debouncedQuery.length < 4 && debouncedAuthor.length < 4 ? (
        <span>Veuillez entrer au moins 4 caractères pour chercher...</span>
      ) : isLoading || isPending ? (
        <Loader />
      ) : books?.books && books.books.length > 0 ? (
        <div className="search-results">
          <BookCard books={books.books} />
          <p>
            Total résultats: <strong>{books.total}</strong> | Page
            <strong>
              {currentPage} / {totalPages}
            </strong>
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={books.total}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <p className="no-result">Aucun resultat trouvé</p>
      )}
    </div>
  );
}
