import { createContext } from "react";
import type { EditorState, EditorAction, EntryLookupMap } from "../types/editorTypes";

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  entryLookup: EntryLookupMap;
} | null>(null);
