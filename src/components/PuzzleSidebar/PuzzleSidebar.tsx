import React from "react";

import Share from "../Puzzle/Share";
import { Puzzle } from "../../types/Puzzle";
import "./PuzzleSidebar.css";
import PuzzleInstructions from "./PuzzleInstructions";
import PuzzleNavigation from "./PuzzleNavigation";
import SolutionMessage from "./SolutionMessage";

type PuzzleSidebarProps = {
  puzzle: Puzzle;
  isSolved: boolean;
  attempts: number;
};

const PuzzleSidebar: React.FC<PuzzleSidebarProps> = ({
  puzzle,
  isSolved,
  attempts,
}) => {
  return (
    <div className="puzzle-sidebar">
      {isSolved ? (
        <SolutionMessage description={puzzle.description} />
      ) : (
        <PuzzleInstructions puzzle={puzzle} />
      )}
      <PuzzleNavigation
        puzzle={puzzle}
        isSolved={isSolved}
        attempts={attempts}
      />
      {isSolved && <Share puzzleId={puzzle.id} />}
    </div>
  );
};

export default PuzzleSidebar;
