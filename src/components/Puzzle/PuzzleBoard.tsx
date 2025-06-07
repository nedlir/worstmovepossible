import React, { useEffect, useState } from "react";
import PuzzleContent from "./PuzzleContent";
import { usePuzzleStore } from "../../stores/usePuzzleStore";
import { Puzzle } from "../../types/Puzzle";
import PuzzleSidebar from "../PuzzleSidebar/PuzzleSidebar";
import "./PuzzleBoard.css";

type PuzzleBoardProps = {
  puzzle: Puzzle;
  onSolve: () => void;
};

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ puzzle, onSolve }) => {
  const [resetKey, setResetKey] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const { solvePuzzle } = usePuzzleStore();

  useEffect(() => {
    if (isSolved) {
      solvePuzzle(puzzle.id);
      onSolve();
    }
  }, [isSolved, puzzle.id, solvePuzzle, onSolve]);

  return (
    <div className="puzzle-component">
      <div className="puzzle-container">
        <PuzzleContent
          puzzle={puzzle}
          resetKey={resetKey}
          isSolved={isSolved}
          setIsSolved={setIsSolved}
          setResetKey={setResetKey}
          setAttempts={setAttempts}
        />
        <PuzzleSidebar
          puzzle={puzzle}
          isSolved={isSolved}
          attempts={attempts}
        />
      </div>
    </div>
  );
};

export default PuzzleBoard;
