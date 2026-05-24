import { BoardDnD } from "./components/BoardDnD";
import { BoardProvider } from "./components/BoardProvider";
import { PuzzleBoard } from "./components/PuzzleBoard";

export default function App() {
  return (
    <BoardProvider>
      <BoardDnD>
        <PuzzleBoard />
      </BoardDnD>
    </BoardProvider>
  )
}
