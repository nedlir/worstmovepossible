export type Puzzle = {
  id: string;
  fen: string;
  moves: string[];
  makeFirstMove?: boolean;
  move_sequence?: string[];
  description: string;
};
