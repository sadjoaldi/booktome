import "../styles/booksInfoCard.css";

interface BookDetailsProps {
  bookDetailProps: {
    authors?: Array<{ author: { key: string } }>;
    title: string;
    description?: string | { value: string };
    coverUrl?: string;
  };
}

export default function BooksInfoCard({ bookDetailProps }: BookDetailsProps) {
  return (
    <div className="book-info-card">
      <h1>{bookDetailProps.title} </h1>
      {bookDetailProps.coverUrl && (
        <img src={bookDetailProps.coverUrl} alt={bookDetailProps.title} />
      )}

      {bookDetailProps.description && (
        <div>
          <h3>Description</h3>
          <p>
            {typeof bookDetailProps.description === "string"
              ? bookDetailProps.description
              : bookDetailProps.description.value}{" "}
          </p>
        </div>
      )}
    </div>
  );
}
