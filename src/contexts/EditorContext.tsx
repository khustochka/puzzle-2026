import { createContext } from "react";
import type { EditorState, EditorAction } from "../types/editorTypes";

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);
