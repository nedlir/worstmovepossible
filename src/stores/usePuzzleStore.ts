import { create } from "zustand";
import puzzles from "../data/puzzles.json";

interface PuzzleState {
  unsolvedPuzzles: Set<string>;
  solvedPuzzles: string[];
  solvePuzzle: (puzzleId: string) => void;
}

export const usePuzzleStore = create<PuzzleState>((set) => ({
  unsolvedPuzzles: new Set(puzzles.map((p) => p.id)),
  solvedPuzzles: [],
  solvePuzzle: (puzzleId) =>
    set((state) => {
      if (!state.unsolvedPuzzles.has(puzzleId)) return state;

      const newUnsolved = new Set(state.unsolvedPuzzles);
      newUnsolved.delete(puzzleId);

      return {
        unsolvedPuzzles: newUnsolved,
        solvedPuzzles: [...state.solvedPuzzles, puzzleId],
      };
    }),
}));
