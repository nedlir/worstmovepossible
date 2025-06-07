import { useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../types/Puzzle";

interface PuzzleSequenceState {
  isPlayingSequence: boolean;
  sequenceGame: Chess | null;
  showingSequence: boolean;
  hasSequence: boolean;
}

interface PuzzleSequenceActions {
  playSequence: () => Promise<void>;
  resetSequence: () => void;
  shouldFlipBoard: (fen: string) => boolean;
}

export const usePuzzleSequence = (
  puzzle: Puzzle
): [PuzzleSequenceState, PuzzleSequenceActions] => {
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [sequenceGame, setSequenceGame] = useState<Chess | null>(null);
  const [showingSequence, setShowingSequence] = useState(false);

  const hasSequence = !!(puzzle.move_sequence || puzzle.moves);

  const playSequence = async () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);
    setShowingSequence(true);
    const game = new Chess(puzzle.fen);
    setSequenceGame(game);
    const moves = [...(puzzle.moves || []), ...(puzzle.move_sequence || [])];
    for (const move of moves) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      game.move(move);
      setSequenceGame(new Chess(game.fen()));
    }
    setIsPlayingSequence(false);
  };

  const resetSequence = () => {
    setIsPlayingSequence(false);
    setSequenceGame(null);
    setShowingSequence(false);
  };

  const shouldFlipBoard = (fen: string): boolean => fen.split(" ")[1] === "b";

  return [
    { isPlayingSequence, sequenceGame, showingSequence, hasSequence },
    { playSequence, resetSequence, shouldFlipBoard },
  ];
};
