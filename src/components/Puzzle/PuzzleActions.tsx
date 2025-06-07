import React from "react";
import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import { ResetIcon, HintIcon, PlayIcon } from "../../assets/Icons";
import "./PuzzleActions.css";

type PuzzleActionsProps = {
  sequenceState: {
    isPlaying: boolean;
    isShowing: boolean;
    hasSequence: boolean;
  };
  handlers: {
    onReset: () => void;
    onPlaySequence: () => void;
  };
  isSolved: boolean;
};

const PuzzleActions: React.FC<PuzzleActionsProps> = ({
  sequenceState,
  handlers,
  isSolved,
}) => {
  const { isPlaying, isShowing, hasSequence } = sequenceState;
  const { onReset, onPlaySequence } = handlers;

  return (
    <div className="puzzle-actions">
      <ChessPuzzle.Reset asChild onReset={onReset}>
        <button className="action-button" disabled={isPlaying}>
          <ResetIcon /> Reset
        </button>
      </ChessPuzzle.Reset>
      <ChessPuzzle.Hint asChild>
        <button className="action-button" disabled={isShowing || isPlaying}>
          <HintIcon /> Hint
        </button>
      </ChessPuzzle.Hint>
      {isSolved && hasSequence && !isShowing && (
        <button
          className="action-button"
          onClick={onPlaySequence}
          disabled={isPlaying}
        >
          <PlayIcon /> {isPlaying ? "Playing..." : "Play Sequence"}
        </button>
      )}
    </div>
  );
};

export default PuzzleActions;
