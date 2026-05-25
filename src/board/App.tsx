import { BoardFxProvider } from "./components/BoardFxProvider";
import { BoardProvider } from "./components/BoardProvider";
import { PuzzleBoard } from "./components/PuzzleBoard";

export default function App() {
  return (
    <BoardProvider>
      <BoardFxProvider>
        <PuzzleBoard />
      </BoardFxProvider>
    </BoardProvider>
  )
}
