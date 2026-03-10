import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import BooksInfoCard from "../components/booksInfoCard";
import Loader from "../components/loader";
import NavButton from "../components/navButton";
import "../styles/booksInfo.css";
import { trpc } from "../utils/trpc";

interface BookDetailType {
  authors?: Array<{ author: { key: string } }>;
  title: string;
  description?: string | { value: string };
  coverUrl?: string;
}

export default function BooksInfo() {
  const { workId } = useParams<{ workId: string }>();

  const bookDetailData = useQuery({
    ...trpc.booksRoute.getWork.queryOptions({
      workId: workId || "",
    }),
    enabled: !!workId,
  });

  const {
    data: bookInfo,
    isLoading,
    error,
  } = bookDetailData as {
    data: BookDetailType | undefined;
    isLoading: boolean;
    error: string | null;
  };

  if (!workId) {
    return <div>Erreur: ID du livre manquant</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>Erreur lors du chargement des détails du livre</p>
        <NavButton />
      </div>
    );
  }

  if (!bookInfo) {
    return <p>Aucun détail disponible</p>;
  }

  return (
    <div className="book-info">
      <NavButton />
      <BooksInfoCard bookDetailProps={bookInfo} />
      {/* <AuthorInfo authors={bookInfo.authors} /> */}
    </div>
  );
}
