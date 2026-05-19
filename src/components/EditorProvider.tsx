import { useEffect, useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorState, EditorCategory, EditorAction } from "../types/editorTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";

function reducer(state: EditorState, action: EditorAction): EditorState {
  const { categories } = state;
  switch (action.type) {
    case 'addCategory': {
      const newTitleNormalized = action.title.toLowerCase();
      if (categories.some(c => c.title.toLowerCase() === newTitleNormalized ))
        return {
          ...state,
          newlyAddedCategoryId: null,
          addCategoryError: "Category with this name already exists."
        };
      else return {
        newlyAddedCategoryId: action.id,
        addCategoryError: null,
        categories: [...categories, { id: action.id, title: action.title, entries: [] }]
      };
    }
    case 'updateCategoryTitle':
      return { ...state, categories: categories.map(c => c.id === action.id ? { ...c, title: action.title } : c) };
    case 'deleteCategory':
      return { ...state, categories: categories.filter(c => c.id !== action.id) };
    case 'addEntry':
      return {
        ...state, categories: categories.map(category =>
          category.id === action.categoryId ?
            {
              ...category,
              entries: [...category.entries, { id: action.entryId, title: action.title }]
            } :
            category
        )
      };
    case 'updateEntry':
      return {
        ...state, categories: categories.map(category =>
          category.id === action.categoryId ?
            {
              ...category,
              entries: category.entries.map(entry => (
                entry.id === action.entryId ? { ...entry, title: action.title } : entry
              ))
            } :
            category
        )
      };
    case 'deleteEntry':
      return {
        ...state, categories: categories.map(category =>
          category.id === action.categoryId ?
            {
              ...category,
              entries: category.entries.filter((word) => (word.id !== action.entryId))
            } :
            category
        )
      };
    case 'clearAddCategoryError':
      return {...state, addCategoryError: null }
  }
}

export function EditorProvider({ children, initialCategories }: { children: React.ReactNode, initialCategories: EditorCategory[] }) {
  const [savedCategories, setSavedCategories] = useLocalStorage('editor_categories', initialCategories)

  const initialState = {
    categories: savedCategories,
    newlyAddedCategoryId: null,
    addCategoryError: null
  }
  const [state, dispatch] = useReducer(reducer, initialState);

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
