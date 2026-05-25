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
  score: number;
  mistakes: number;
}

export type BoxStatus = 'single' | 'multiple' | 'full';

export type BoardState = {
  loading: boolean;
  loadingError: string | null;
  board: Board | null;
  selectedBox: BoardBox | null;
}

export type BoardAction =
  | { type: 'selectBox', box: BoardBox | null}
  | { type: 'boxClicked'; box: BoardBox; capacity: number }
  | { type: 'gapClicked'; rowId: string; insertIndex: number }
  | { type: 'fileLoadResult'; result: { ok: true; data: unknown } | { ok: false; error: string } }
  | { type: 'resetBoard' };
