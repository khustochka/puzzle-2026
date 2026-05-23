import { useEffect, useMemo, useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorCategory } from "../types/editorTypes";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { editorReducer } from "../reducers/editorReducer";
import { buildEntryLookup } from "../reducers/validators";

type LegacyEntry = { id: string; title: string };
type LegacyEditorCategory = { id: string; title: string; entries: LegacyEntry[] };

function migrateLegacyStorage() {
  const OLD_KEY = 'editor_categories';
  const NEW_KEY = 'editor-categories-v2';
  if (localStorage.getItem(NEW_KEY) !== null) return;
  const raw = localStorage.getItem(OLD_KEY);
  if (raw === null) return;
  try {
    const legacy: LegacyEditorCategory[] = JSON.parse(raw);
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
  }
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const entryLookup = useMemo(
    () => buildEntryLookup(state.categories),
    [state.categories]
  )

  useEffect(
    () => setSavedCategories(state.categories),
    [state.categories, setSavedCategories]
  )

  return (
    <EditorContext.Provider value={{ state, dispatch, entryLookup }}>
      {children}
    </EditorContext.Provider>
  );
}
