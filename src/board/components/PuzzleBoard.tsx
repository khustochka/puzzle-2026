import { useBoard } from "../hooks/useBoard"
import { Box } from "./Box";

export function PuzzleBoard() {
  const { state: { loading, loadingError, board } } = useBoard();

  return (
    <div className="inline-flex flex-col gap-2 p-4">
      {loading &&
        <div>Loading...</div>
      }
      {loadingError &&
        <div>
          {loadingError}
        </div>
      }
      {board &&
        board.rows.map((row) => (
          <div key={row.id} className="flex flex-row gap-2 flex-nowrap">
            {
              row.cells.map((box) => (
                <Box
                  key={box.id} box={box} capacity={board.size} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
