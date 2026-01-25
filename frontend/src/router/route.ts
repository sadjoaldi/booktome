import { createBrowserRouter } from "react-router";
import BookDetail from "../pages/booksDetail";
import BookSearchResult from "../pages/bookSearchResult";

const routes = [
  {
    path: "/",
    Component: BookSearchResult,
  },
  {
    path: "/books/:workId",
    Component: BookDetail,
  },
];

export const router = createBrowserRouter(routes);
