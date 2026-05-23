export type BoardEntry = {
  id: string;
  value: string;
}

export type BoardCategory = {
  id: string;
  name: string;
}

export type BoardBox = {
  id: string;
  category: BoardCategory;
  entries: BoardEntry[];
}

export type BoardRow = {
  id: string;
  cells: BoardBox[];
}

export type Board = BoardRow[]

export type BoardState = {
  board: Board;
}
