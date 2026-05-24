import { createContext } from "react";
import type { BoardState, BoardAction } from "../types/boardTypes";

export const BoardContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
} | null>(null);
