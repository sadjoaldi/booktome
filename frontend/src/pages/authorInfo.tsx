import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuthorInfoCard from "../components/authorInfoCard";
import Loader from "../components/loader";
import "../styles/authorInfo.css";
import { trpc } from "../utils/trpc";

interface AuthorDetailType {
  name: string;
  bio?: string;
  birth_date?: number;
  death_date?: number;
  photoUrl?: string;
}

export default function AuthorInfo({
  authors,
}: {
  authors?: Array<{ author: { key: string } }>;
}) {
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  const authorDetailInfo = useQuery({
    ...trpc.booksRoute.getAuthor.queryOptions({
      authorId: selectedAuthorId || "",
    }),
    enabled: !!selectedAuthorId,
  });

  const {
    data: authorInfo,
    isLoading,
    error,
  } = authorDetailInfo as {
    data: AuthorDetailType | undefined;
    isLoading: boolean;
    error: string | null;
  };

  if (!authors || authors.length === 0) {
    return <div>Aucun auteur disponible pour ce livre</div>;
  }

  return (
    <div className="author-info-container">
      <div className="authors-list">
        <h2>Auteurs</h2>
        <div className="authors-buttons">
          {authors.map((author, index) => {
            const authorId = author.author.key.replace("/authors/", "");
            return (
              <button
                key={index}
                className={`author-btn ${
                  selectedAuthorId === authorId ? "active" : ""
                }`}
                onClick={() => setSelectedAuthorId(authorId)}
              >
                {authorId.replace(/_/g, " ")}
              </button>
            );
          })}
        </div>
      </div>

      {selectedAuthorId && (
        <div className="author-detail-section">
          {isLoading && <Loader />}

          {error && (
            <div className="error-message">
              <p>Erreur lors du chargement des détails de l'auteur</p>
            </div>
          )}

          {authorInfo && <AuthorInfoCard authorDetailProps={authorInfo} />}
        </div>
      )}
    </div>
  );
}
