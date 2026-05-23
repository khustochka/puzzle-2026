import { useEffect, useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorCategory } from "../types/editorTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { editorReducer } from "../reducers/editorReducer";

type LegacyEntry = { id: string; title: string };
type LegacyCategory = { id: string; title: string; entries: LegacyEntry[] };

function migrateLegacyStorage() {
  const OLD_KEY = 'editor_categories';
  const NEW_KEY = 'editor-categories-v2';
  if (localStorage.getItem(NEW_KEY) !== null) return;
  const raw = localStorage.getItem(OLD_KEY);
  if (raw === null) return;
  try {
    const legacy: LegacyCategory[] = JSON.parse(raw);
    const migrated: EditorCategory[] = legacy.map(c => ({
      id: c.id,
      name: c.title,
      entries: c.entries.map(e => ({ id: e.id, value: e.title })),
    }));
    localStorage.setItem(NEW_KEY, JSON.stringify(migrated));
    localStorage.removeItem(OLD_KEY);
  } catch {
    // malformed old data — leave it for inspection, don't block app start
  }
}
migrateLegacyStorage();

export function EditorProvider({ children, initialCategories }: { children: React.ReactNode, initialCategories: EditorCategory[] }) {
  const [savedCategories, setSavedCategories] = useLocalStorage('editor-categories-v2', initialCategories)

  const initialState = {
    categories: savedCategories,
    newlyAddedCategoryId: null,
    addEntryError: null
  }
  const [state, dispatch] = useReducer(editorReducer, initialState);

  useEffect(
    () => setSavedCategories(state.categories),
    [state.categories, setSavedCategories]
  )

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
