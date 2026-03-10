import { Link } from "react-router";
import "../styles/bookCard.css";

interface Book {
  id: string;
  title: string;
  authors: string[];
  year?: number;
  coverUrl: string | null;
}

interface Props {
  books: Book[];
}

export default function BookCard({ books }: Props) {
  return (
    <div className="book-card">
      <div className="card-content">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="card-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} />
              ) : (
                <div className="no-cover">Pas de couverture</div>
              )}

              <div className="book-author-info">
                <h3>{book.title}</h3>

                <p>
                  <strong>Auteur(s):</strong>{" "}
                  {book.authors.length > 0
                    ? book.authors.join(", ")
                    : "Auteur inconnu"}
                </p>

                {book.year && <p>Année: {book.year}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
