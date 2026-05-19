import { useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorState, EditorCategory, EditorAction } from "../types/editorTypes";

function reducer(state: EditorState, action: EditorAction): EditorState {
  const { categories } = state;
  switch (action.type) {
    case 'addCategory':
      return {
        newlyAddedCategoryId: action.id,
        categories: [...categories, { id: action.id, title: action.title, entries: [] }]
      };
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
                entry.id === action.entryId ? {...entry, title: action.title} : entry
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
  }
}

export function EditorProvider({ children, categories }: { children: React.ReactNode, categories: EditorCategory[] }) {
  const initialState = {
    categories: categories,
    newlyAddedCategoryId: null
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
