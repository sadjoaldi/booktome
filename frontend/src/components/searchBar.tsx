import "../styles//searchBar.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchAuthor: string;
  setSearchAuthor: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchAuthor,
  setSearchAuthor,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rechercher par auteur..."
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)}
      />
    </div>
  );
}
