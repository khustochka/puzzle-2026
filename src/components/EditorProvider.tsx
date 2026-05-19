import { useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorCategory, EditorAction } from "../types/editorTypes";

function reducer(state: EditorCategory[], action: EditorAction): EditorCategory[] {
  switch (action.type) {
    case 'addCategory':
      return [...state, { id: action.id, title: action.title, entries: [] }];
    case 'updateCategoryTitle':
      return state.map(c => c.id === action.id ? { ...c, title: action.title } : c);
    case 'deleteCategory':
      return state.filter(c => c.id !== action.id);
    case 'addEntry':
      return state.map(category =>
        category.id === action.categoryId ?
          {
            ...category,
            entries: [...category.entries, { id: action.entryId, title: action.title }]
          } :
          category
      );
    case 'deleteEntry':
      return state.map(category =>
        category.id === action.categoryId ?
          {
            ...category,
            entries: category.entries.filter((word) => (word.id !== action.entryId))
          } :
          category
      );
  }
}

export function EditorProvider({ children, initialState }: { children: React.ReactNode, initialState: EditorCategory[] }) {
  const [categories, dispatch] = useReducer(reducer, initialState);
  return (
    <EditorContext.Provider value={{ categories, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
