export type BoardCategory = {
  id: string;
  name: string;
}

export type BoardBox = {
  id: string;
  category: BoardCategory;
  entries: string[];
}

export type BoardRow = {
  id: string;
  cells: BoardBox[];
}

export type Board = {
  size: number;
  rows: BoardRow[];
}

export type BoxStatus = 'single' | 'multiple' | 'full';

export type BoardState = {
  loading: boolean;
  loadingError: string | null;
  board: Board | null;
}

export type BoardAction =
  | { type: 'mergeBoxes'; source: BoardBox; target: BoardBox }
  | { type: 'fileLoadResult'; result: { ok: true; data: unknown } | { ok: false; error: string } };
