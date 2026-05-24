import type { Board, BoardBox, BoardRow } from "../types/boardTypes";
import type { EditorCategory, EditorEntry } from "../../shared/types";

const FailedToLoad = new Error('Failed to load board');

export function constructBoard(data: unknown): Board {
  assertArray(data);
  const size = data.length;

  const entries = constructEntries(data, size);

  return {
    size: size,
    rows: applyRows(shuffleToGrid(entries, size)),
  };
}

function constructEntries(data: unknown[], size: number): BoardBox[] {
  return data.reduce<BoardBox[]>(
    (memo, category) => {
      assertCategory(category);
      if (category.entries.length !== size) throw FailedToLoad;
      const boardCategory = {id: category.id, name: category.name}
      const boxes = category.entries.map((entry) => {
        assertEntry(entry);
        return {
          id: entry.id,
          category: boardCategory,
          entries: [entry.value]
        }
      })
      return [...memo, ...boxes]
    },
    []
  )
}

function assertArray(x: unknown): asserts x is unknown[] {
  if (!Array.isArray(x)) throw FailedToLoad;
}

function assertEntry(x: unknown): asserts x is EditorEntry {
  if (typeof x !== 'object' || x === null) throw FailedToLoad;
  if (!('id' in x) || typeof x.id !== 'string') throw FailedToLoad;
  if (!('value' in x) || typeof x.value !== 'string') throw FailedToLoad;
}

function assertCategory(x: unknown): asserts x is EditorCategory {
  if (typeof x !== 'object' || x === null) throw FailedToLoad;
  if (!('id' in x) || typeof x.id !== 'string') throw FailedToLoad;
  if (!('name' in x) || typeof x.name !== 'string') throw FailedToLoad;
  if (!('entries' in x)) throw FailedToLoad;
  assertArray(x.entries);
  for (const entry of x.entries) assertEntry(entry);
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
