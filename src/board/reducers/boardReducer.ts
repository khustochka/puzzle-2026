import type { BoardState, BoardAction } from "../types/boardTypes";

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'mergeBoxes':
      return {
        ...state,
        board: {
          size: state.board.size,
          rows: state.board.rows.map((row) => (
            {
              ...row,
              cells: row.cells.map(
                (box) => box.id === action.target.id ? { ...box, entries: [...box.entries, ...action.source.entries] } : box
              ).filter(cell => cell.id !== action.source.id)
            }
          )).filter(row => row.cells.length !== 0)
        }
      }
    default: {
      const _exhaustive: never = action.type;
      void _exhaustive;
      return state;
    }
  }
}
