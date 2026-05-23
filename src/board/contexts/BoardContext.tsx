import { createContext } from "react";
import type { BoardState } from "../types/boardTypes";
// import type { EditorState, EditorAction } from "../types/editorTypes";

export const BoardContext = createContext<{
  state: BoardState;
  //dispatch: React.Dispatch<EditorAction>;
} | null>(null);
