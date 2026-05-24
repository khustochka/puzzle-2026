import { BoardProvider } from "./components/BoardProvider";
import { PuzzleBoard } from "./components/PuzzleBoard";
import type { Board, BoardRow } from "./types/boardTypes";

const initialBoard: Board = [];

for (let i = 1; i <= 45; i++) {
  const category = {
    id: crypto.randomUUID(),
    name: `C${i}`
  }
  const row: BoardRow = {id: `C${i}`, cells: []};
  for (let j = 1; j <= 45; j++) {
    row.cells.push(
      {
        id: `C${i}-E${j}`,
        category: category,
        entries: [`C${i}-E${j}`]
      }
    )
  }
  initialBoard.push(row);
}

export default function App() {
  return (
    // <ErrorBoundary>
    <BoardProvider initialBoard={initialBoard}>
      <PuzzleBoard />
    </BoardProvider>
    // </ErrorBoundary>
  )
}
