import "../styles/authorInfoCard.css";

interface AuthorDetailsProps {
  authorDetailProps: {
    name: string;
    bio?: string;
    birth_date?: number;
    death_date?: number;
    photoUrl?: string;
  };
}

export default function AuthorInfoCard({
  authorDetailProps,
}: AuthorDetailsProps) {
  return (
    <div className="author-info-card">
      <h1>{authorDetailProps.name}</h1>

      {authorDetailProps.photoUrl && (
        <img src={authorDetailProps.photoUrl} alt={authorDetailProps.name} />
      )}

      {(authorDetailProps.birth_date || authorDetailProps.death_date) && (
        <div className="author-dates">
          {authorDetailProps.birth_date && (
            <p>
              <strong>Né:</strong> {authorDetailProps.birth_date}
            </p>
          )}
          {authorDetailProps.death_date && (
            <p>
              <strong>Décédé:</strong> {authorDetailProps.death_date}
            </p>
          )}
        </div>
      )}

      {authorDetailProps.bio && (
        <div className="author-bio">
          <h3>Biographie</h3>
          <p>{authorDetailProps.bio}</p>
        </div>
      )}
    </div>
  );
}
