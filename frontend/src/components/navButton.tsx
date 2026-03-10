import { useNavigate } from "react-router";
import "../styles/navButton.css";

export default function NavButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <span>← Retour</span>
      </button>
    </div>
  );
}
