import { createContext } from "react";
import type { EditorCategory, EditorAction } from "../types/editorTypes";

export const EditorContext = createContext<{
  categories: EditorCategory[];
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);
