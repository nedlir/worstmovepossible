import PuzzlePage from "../views/PuzzlePage/PuzzlePage";
import AboutPage from "../views/AboutPage/AboutPage";
import ContributePage from "../views/ContributePage/ContributePage";
import { RandomPuzzleRedirect } from "./RandomPuzzleRedirect";

export const routes = [
  {
    path: "/puzzles/:puzzleId",
    element: <PuzzlePage />,
  },
  {
    path: "/puzzles/",
    element: <RandomPuzzleRedirect />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contribute",
    element: <ContributePage />,
  },
  {
    path: "/",
    element: <RandomPuzzleRedirect />,
  },
];
