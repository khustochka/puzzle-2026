import { useEffect, useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorCategory } from "../types/editorTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { editorReducer } from "../reducers/editorReducer";

export function EditorProvider({ children, initialCategories }: { children: React.ReactNode, initialCategories: EditorCategory[] }) {
  const [savedCategories, setSavedCategories] = useLocalStorage('editor_categories', initialCategories)

  const initialState = {
    categories: savedCategories,
    newlyAddedCategoryId: null,
    addCategoryError: null,
    addWordError: null
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
