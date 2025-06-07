import React from "react";
import { Puzzle } from "../../types/Puzzle";
import QueenIcon from "../../assets/Icons/QueenIcon";
import "./PuzzleInstructions.css";

type PuzzleInstructionsProps = {
  puzzle: Puzzle;
};

const PuzzleInstructions: React.FC<PuzzleInstructionsProps> = ({ puzzle }) => {
  const activeColor = puzzle.fen.split(" ")[1];
  const whoseMove = activeColor === "w" ? "White" : "Black";

  return (
    <div className="puzzle-instructions">
      <div className="instructions-container">
        <div className="instructions-content">
          <span className="instructions-text">
            <QueenIcon
              width={24}
              height={24}
              color={activeColor === "w" ? "white" : "black"}
            />{" "}
            Your turn.
            <br />
            Find the <span className="instructions-text-worst">worst</span> move
            for {whoseMove.toLowerCase()}.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInstructions;
