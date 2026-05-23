import type { Category, Entry } from "../../shared/types"

export type BoardBox = {
  category: Category;
  entries: Entry[];
}

export type BoardRow = BoardBox[]

export type Board = BoardRow[]

export type BoardState = {
  board: Board;
}
