import { useCallback, useEffect, useRef } from "react";
import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useBoard } from "../hooks/useBoard"
import { Box } from "./Box";
import { useFxTriggers } from "./boxFx";
import type { BoardBox } from "../types/boardTypes";

export function PuzzleBoard() {
  const { state: { loading, loadingError, board, selectedBox }, dispatch } = useBoard();
  const { triggerShake, triggerBlink } = useFxTriggers();

  const selectedBoxRef = useRef(selectedBox);
  useEffect(() => { selectedBoxRef.current = selectedBox; }, [selectedBox]);

  const handleBoxClick = useCallback((box: BoardBox, capacity: number) => {
    const selected = selectedBoxRef.current;
    if (selected && selected.id !== box.id) {
      if (selected.category.id === box.category.id) {
        triggerBlink(box.id);
      } else {
        triggerShake(selected.id, box.id);
      }
    }
    dispatch({ type: 'boxClicked', box, capacity });
  }, [dispatch, triggerShake, triggerBlink]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 flex items-start justify-between gap-6 px-6 py-3 bg-yellow-200/80 backdrop-blur border-b border-yellow-300 shadow-sm">
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 inline-block">Puzzle 2026</h1>
            {board &&
              <span className="inline-block ml-2 text-lg text-gray-500">{board.size}x{board.size}</span>
            }
            <span className="inline-flex items-center align-middle ml-2 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
              Demo
            </span>
          </div>
          {loading ||
            <div className="mt-1 flex items-center gap-4">
              <span
                onClick={() => confirm("Do you want to reset? You will lose your progress.") && dispatch({ type: 'resetBoard' })}
                className="cursor-pointer text-sm text-red-500 underline decoration-dashed underline-offset-4 hover:text-red-700"
              >
                Reset
              </span>
              <a
                href={import.meta.env.BASE_URL + "edit.html"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-600 underline decoration-dashed underline-offset-4 hover:text-emerald-800"
              >
                Make your own!
              </a>
            </div>
          }
        </div>

        <p className="text-xs text-slate-500 text-right leading-relaxed">
          Puzzle-2026 by Vitalii Khustochka
          <br />
          Based on{" "}
          <a
            href="https://thomaswc.com/2025.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-600"
          >
            2025
          </a>{" "}
          by Thomas Colthurst.
          <br />
          Released under a{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-600"
          >
            Creative Commons Attribution-ShareAlike 4.0
          </a>{" "}
          license.
        </p>
      </header>

      {loadingError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <ExclamationTriangleIcon className="size-10 text-red-500" />
          <div className="text-lg font-medium text-slate-800">{loadingError}</div>
        </div>
      ) : loading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-600">
          <ArrowPathIcon className="size-10 animate-spin [animation-duration:1.8s]" />
          <div className="text-2xl text-slate-400">Loading the board</div>
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-4">
          {board &&
            board.rows.map((row) => (
              <div key={row.id} className="flex flex-row gap-2 flex-nowrap">
                {
                  row.cells.map((box) => (
                    <Box
                      key={box.id}
                      box={box}
                      capacity={board.size}
                      isSelected={selectedBox?.id === box.id}
                      onClick={handleBoxClick}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}
