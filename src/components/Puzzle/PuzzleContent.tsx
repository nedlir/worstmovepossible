import React from "react";
import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import { Chessboard } from "react-chessboard";
import { Puzzle } from "../../types/Puzzle";
import PuzzleActions from "./PuzzleActions";
import { usePuzzleSequence } from "../../hooks/usePuzzleSequence";
import "./PuzzleContent.css";

type PuzzleContentProps = {
  puzzle: Puzzle;
  resetKey: number;
  isSolved: boolean;
  setIsSolved: (solved: boolean) => void;
  setResetKey: (fn: (prev: number) => number) => void;
  setAttempts: (fn: (prev: number) => number) => void;
};

const PuzzleContent: React.FC<PuzzleContentProps> = ({
  puzzle,
  resetKey,
  isSolved,
  setIsSolved,
  setResetKey,
  setAttempts,
}) => {
  const [sequenceState, sequenceActions] = usePuzzleSequence(puzzle);
  const { isPlayingSequence, sequenceGame, showingSequence, hasSequence } =
    sequenceState;
  const { playSequence, resetSequence, shouldFlipBoard } = sequenceActions;

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setIsSolved(false);
    setAttempts((prev) => prev + 1);
    resetSequence();
  };

  return (
    <div className="puzzle-content">
      <ChessPuzzle.Root
        key={`${puzzle.id}-${resetKey}`}
        puzzle={puzzle}
        onSolve={() => setIsSolved(true)}
      >
        <PuzzleActions
          sequenceState={{
            isPlaying: isPlayingSequence,
            isShowing: showingSequence,
            hasSequence,
          }}
          handlers={{ onReset: handleReset, onPlaySequence: playSequence }}
          isSolved={isSolved}
        />
        <div className="board-container">
          {showingSequence && sequenceGame ? (
            <Chessboard
              position={sequenceGame.fen()}
              boardOrientation={shouldFlipBoard(puzzle.fen) ? "black" : "white"}
            />
          ) : (
            <ChessPuzzle.Board />
          )}
        </div>
      </ChessPuzzle.Root>
    </div>
  );
};

export default PuzzleContent;
