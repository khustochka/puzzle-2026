import type { BoardState, BoardAction, BoardBox, Board } from "../types/boardTypes";
import { constructBoard } from "../data/constructBoard";

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'fileLoadResult':
      if (action.result.ok) {
        try {
          const board = constructBoard(action.result.data);
          return {
            board: board,
            loading: false,
            loadingError: null
          }
        }
        catch {
          return {
            board: null,
            loading: false,
            loadingError: "Failed to load board"
          }
        }
      }
      else
        return {
          board: null,
          loading: false,
          loadingError: "Failed to load board"
        }
    case 'mergeBoxes':
      if (!state.board) return state;
      return {
        ...state,
        board: mergeBoxes(state.board, action.source, action.target)
      }
    default: {
      const _exhaustive: never = action;
      void _exhaustive;
      return state;
    }
  }
}

function mergeBoxes(board: Board, source: BoardBox, target: BoardBox) {
  if (source.category.id !== target.category.id) return board;
  return {
    size: board.size,
    rows: board.rows.map((row) => (
      {
        ...row,
        cells: row.cells.map(
          (box) => box.id === target.id ? { ...box, entries: [...box.entries, ...source.entries] } : box
        ).filter(cell => cell.id !== source.id)
      }
    )).filter(row => row.cells.length !== 0)
  }
}
