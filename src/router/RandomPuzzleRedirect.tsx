import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePuzzleStore } from "../stores/usePuzzleStore";

export const RandomPuzzleRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { unsolvedPuzzles } = usePuzzleStore();

  useEffect(() => {
    if (unsolvedPuzzles.size === 0) {
      navigate("/");
      return;
    }

    const unsolvedArray = Array.from(unsolvedPuzzles);
    const randomIndex = Math.floor(Math.random() * unsolvedArray.length);
    const randomId = unsolvedArray[randomIndex];

    navigate(`/puzzles/${randomId}`);
  }, [navigate, unsolvedPuzzles]);

  return null;
};
