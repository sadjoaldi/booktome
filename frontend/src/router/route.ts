import { createBrowserRouter } from "react-router";
import BookSearchResult from "../pages/bookSearchResult";
import BooksInfo from "../pages/booksInfo";

const routes = [
  {
    path: "/",
    Component: BookSearchResult,
  },
  {
    path: "/books/:workId",
    Component: BooksInfo,
  },
];

export const router = createBrowserRouter(routes);
