import { MAX_SIZE, type Board, type BoardRow } from "../types/boardTypes";

export function createInitialBoard(): Board {
  const board: Board = [];

  for (let i = 1; i <= MAX_SIZE; i++) {
    const category = {
      id: crypto.randomUUID(),
      name: `C${i}`,
    };
    const row: BoardRow = { id: `C${i}`, cells: [] };
    for (let j = 1; j <= MAX_SIZE; j++) {
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
