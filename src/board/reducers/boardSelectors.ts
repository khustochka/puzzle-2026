import type { BoardState } from "../types/boardTypes";

export function findBoxById(state: BoardState, id: string) {
  if (!state.board) return null;
  
  for (const row of state.board.rows) {
    for (const box of row.cells) {
      if (box.id === id) return box;
    }
  }
  return null;
}
