import { type Board, type BoardBox, type BoardRow } from "../types/boardTypes";

export function createInitialBoard(size: number): Board {
  const flatBoard = [];

  for (let i = 1; i <= size; i++) {
    const category = {
      id: `C${i}`,
      name: `C${i}`,
    };
    for (let j = 1; j <= size; j++) {
      flatBoard.push({
        id: `C${i}-E${j}`,
        category: category,
        entries: [`C${i}-E${j}`],
      });
    }
  }

  return {
    size: size,
    rows: applyRows(shuffleToGrid(flatBoard, size))
  }
}

function shuffleToGrid<T>(arr: T[], n: number): T[][] {
  if (arr.length !== n * n) {
    throw new Error(`Expected ${n * n} elements, got ${arr.length}`);
  }

  // Copy so we don't mutate the input
  const a = arr.slice();

  // Fisher-Yates shuffle
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  // Chunk into N rows of N
  const grid: T[][] = [];
  for (let i = 0; i < n; i++) {
    grid.push(a.slice(i * n, (i + 1) * n));
  }
  return grid;
}

function applyRows(arr: BoardBox[][]): BoardRow[] {
  return arr.map((row, idx) => ({id: `R${idx}`, cells: row}))
}
