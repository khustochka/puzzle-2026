import { useEffect, useReducer } from "react";
import { EditorContext } from "../contexts/EditorContext";
import type { EditorState, EditorCategory, EditorAction } from "../types/editorTypes";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Returns the id of the category where duplicate was found
function validateWordUniqueness(categories: EditorCategory[], word: string): EditorCategory | null {
  const wordNormalized = word.toLowerCase();

  const categoryWithDup = categories.find(
    (category) => category.entries.some(e => e.title.toLowerCase() === wordNormalized )
  )

  if (categoryWithDup) return categoryWithDup;
  return null
}

function reducer(state: EditorState, action: EditorAction): EditorState {
  const { categories } = state;
  switch (action.type) {
    case 'addCategory': {
      const newTitleNormalized = action.title.toLowerCase();
      if (categories.some(c => c.title.toLowerCase() === newTitleNormalized))
        return {
          ...state,
          newlyAddedCategoryId: null,
          addCategoryError: "Category with this name already exists."
        };
      else return {
        ...state,
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
      {
        const categoryWithDup = validateWordUniqueness(categories, action.title);
      if (categoryWithDup) return {
        ...state,
        addWordError: {
          categoryId: action.categoryId,
          message: `The word "${action.title}" already exists in category "${categoryWithDup.title}"`
        }
      };
      else return {
        ...state,
        addWordError: null,
        categories: categories.map(category =>
          category.id === action.categoryId ?
            {
              ...category,
              entries: [...category.entries, { id: action.entryId, title: action.title }]
            } :
            category
        )
      };
    }
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
    case 'clearErrors':
      return { ...state, addCategoryError: null, addWordError: null }
  }
}

export function EditorProvider({ children, initialCategories }: { children: React.ReactNode, initialCategories: EditorCategory[] }) {
  const [savedCategories, setSavedCategories] = useLocalStorage('editor_categories', initialCategories)

  const initialState = {
    categories: savedCategories,
    newlyAddedCategoryId: null,
    addCategoryError: null,
    addWordError: null
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
