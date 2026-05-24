import type { Board, BoardRow } from "../types/boardTypes";

export function createInitialBoard(): Board {
  const board: Board = [];

  for (let i = 1; i <= 45; i++) {
    const category = {
      id: crypto.randomUUID(),
      name: `C${i}`,
    };
    const row: BoardRow = { id: `C${i}`, cells: [] };
    for (let j = 1; j <= 45; j++) {
      row.cells.push({
        id: `C${i}-E${j}`,
        category: category,
        entries: [`C${i}-E${j}`],
      });
    }
    board.push(row);
  }

  return board;
}
