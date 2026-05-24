import { BoardDnD } from "./components/BoardDnD";
import { BoardProvider } from "./components/BoardProvider";
import { PuzzleBoard } from "./components/PuzzleBoard";
import { createInitialBoard } from "./data/initialBoard";

const initialBoard = createInitialBoard();

export default function App() {
  return (
    <BoardProvider initialBoard={initialBoard}>
      <BoardDnD>
        <PuzzleBoard />
      </BoardDnD>
    </BoardProvider>
  )
}
