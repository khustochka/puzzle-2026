import { useBoard } from "../hooks/useBoard"

export function PuzzleBoard() {
  const { state: { board } } = useBoard();

  return (
    <div>
      {
        board.map((row) => (
          <div key={row.id}>
            {
              row.cells.map((box) => (
                <div key={box.id} className="inline-block">
                  {box.entries.map((entry) => entry.value).join("; ")}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
