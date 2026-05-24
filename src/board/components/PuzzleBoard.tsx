import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useBoard } from "../hooks/useBoard"
import { Box } from "./Box";

export function PuzzleBoard() {
  const { state: { loading, loadingError, board } } = useBoard();

  if (loadingError) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <ExclamationTriangleIcon className="size-10 text-red-500" />
        <div className="text-lg font-medium text-slate-800">{loadingError}</div>
      </div>
    );
  }

  if (loading && !loadingError) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-3 text-slate-600">
        <ArrowPathIcon className="size-10 animate-spin [animation-duration:1.8s]" />
        <div className="text-2xl text-slate-400">Loading the board</div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col gap-2 p-4">
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
