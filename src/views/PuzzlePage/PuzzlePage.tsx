import React from "react";
import { useParams } from "react-router-dom";
import PuzzleBoard from "../../components/Puzzle/PuzzleBoard";
import puzzles from "../../data/puzzles.json";
import { usePuzzleStore } from "../../stores/usePuzzleStore";

const PuzzlePage: React.FC = () => {
  const { puzzleId } = useParams<{ puzzleId: string }>();
  const { solvePuzzle } = usePuzzleStore();
  const puzzle = puzzles.find((p) => p.id === puzzleId);

  const handleSolve = () => {
    if (puzzleId) solvePuzzle(puzzleId);
  };

  if (!puzzle) {
    return <div>Puzzle not found</div>;
  }

  return <PuzzleBoard puzzle={puzzle} onSolve={handleSolve} />;
};

export default PuzzlePage;
