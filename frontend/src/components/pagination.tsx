import "../styles/pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const MAX_PAGES_DISPLAY = 10;

  const getPageNumbers = () => {
    if (totalPages <= MAX_PAGES_DISPLAY) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_PAGES_DISPLAY / 2),
    );
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAY - 1);

    // Ajuster si on est près de la fin
    const adjustedStart = Math.max(1, endPage - MAX_PAGES_DISPLAY + 1);

    return Array.from(
      { length: endPage - adjustedStart + 1 },
      (_, i) => adjustedStart + i,
    );
  };

  const pagesToDisplay = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="btn-content">
        <button
          className="pagination-btn pagination-prev"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Précédent
        </button>

        <div className="pagination-numbers">
          {pagesToDisplay.map((page) => (
            <button
              key={page}
              className={`pagination-page ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn pagination-next"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
