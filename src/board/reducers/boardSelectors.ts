import type { BoardState } from "../types/boardTypes";

export function findBoxById(state: BoardState, id: string) {
  for (const row of state.board) {
    for (const box of row.cells) {
      if (box.id === id) return box;
    }
  }
  return null;
}
