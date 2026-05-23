import { useBoard } from "../hooks/useBoard"

export function PuzzleBoard() {
  const { state: { board } } = useBoard();

  return (
    <div className="inline-flex flex-col gap-2 p-4">
      {
        board.map((row) => (
          <div key={row.id} className="flex flex-row gap-2 flex-nowrap">
            {
              row.cells.map((box) => (
                <div
                  key={box.id}
                  className="w-24 h-16 shrink-0 border border-gray-300 rounded-md bg-white p-2 overflow-hidden text-xs flex items-center justify-center text-center"
                >
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
