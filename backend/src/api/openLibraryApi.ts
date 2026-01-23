import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl =
  process.env.OPEN_LIBRARY_API_BASE_URL || "https://openlibrary.org";

export interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  docs: OpenLibrarySearchDoc[];
}

export interface OpenLibraryBookDetail {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  authors?: { author: { key: string } }[];
}

export interface OpenLibraryAuthorDetail {
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
}

// Recherche de livres
export const searchBooks = async (
  query: string,
  author?: string,
  page: number = 1,
): Promise<OpenLibrarySearchResponse> => {
  const response = await axios.get<OpenLibrarySearchResponse>(
    `${baseUrl}/search.json`,
    {
      params: { q: query, author, page },
    },
  );

  return response.data;
};

// Détail d'un livre
export const getWorkById = async (
  workId: string,
): Promise<OpenLibraryBookDetail> => {
  const response = await axios.get<OpenLibraryBookDetail>(
    `${baseUrl}/works/${workId}.json`,
  );

  return response.data;
};

// Détail d'un auteur
export const getAuthorById = async (
  authorId: string,
): Promise<OpenLibraryAuthorDetail> => {
  const response = await axios.get<OpenLibraryAuthorDetail>(
    `${baseUrl}/authors/${authorId}.json`,
  );

  return response.data;
};
