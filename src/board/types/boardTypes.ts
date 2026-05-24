export const MAX_SIZE = 5;

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

export type Board = BoardRow[]

export type BoxStatus = 'single' | 'multiple' | 'full';

export type BoardState = {
  board: Board;
}

export type BoardAction =
  | { type: 'mergeBoxes'; source: BoardBox; target: BoardBox };
