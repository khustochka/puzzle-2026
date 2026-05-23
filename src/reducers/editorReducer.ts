import type { EditorState, EditorAction } from "../types/editorTypes";
import { findCategoryWithEntry, isCategoryNameTaken } from "./validators";

function addCategory(state: EditorState, action: Extract<EditorAction, { type: 'addCategory' }>): EditorState {
  const { categories } = state;
  const name = action.name.trim();
  if (isCategoryNameTaken(categories, name)) {
    return {
      ...state,
      newlyAddedCategoryId: null,
    };
  }
  return {
    ...state,
    newlyAddedCategoryId: action.id,
    categories: [...categories, { id: action.id, name: action.name, entries: [] }]
  };
}

function updateCategoryName(state: EditorState, action: Extract<EditorAction, { type: 'updateCategoryName' }>): EditorState {
  const name = action.name.trim();
  return {
    ...state,
    categories: state.categories.map(c => c.id === action.id ? { ...c, name } : c)
  };
}

function deleteCategory(state: EditorState, action: Extract<EditorAction, { type: 'deleteCategory' }>): EditorState {
  return {
    ...state,
    categories: state.categories.filter(c => c.id !== action.id)
  };
}

function addEntry(state: EditorState, action: Extract<EditorAction, { type: 'addEntry' }>): EditorState {
  const { categories } = state;
  const value = action.value.trim();
  const categoryWithDup = findCategoryWithEntry(categories, value);
  if (categoryWithDup) {
    return {
      ...state,
      addEntryError: {
        categoryId: action.categoryId,
        message: `The entry "${value}" already exists in category "${categoryWithDup.name}"`
      }
    };
  }
  return {
    ...state,
    addEntryError: null,
    categories: categories.map(category =>
      category.id === action.categoryId
        ? { ...category, entries: [...category.entries, { id: action.entryId, value }] }
        : category
    )
  };
}

function updateEntry(state: EditorState, action: Extract<EditorAction, { type: 'updateEntry' }>): EditorState {
  const value = action.value.trim();
  return {
    ...state,
    categories: state.categories.map(category =>
      category.id === action.categoryId
        ? {
            ...category,
            entries: category.entries.map(entry =>
              entry.id === action.entryId ? { ...entry, value } : entry
            )
          }
        : category
    )
  };
}

function deleteEntry(state: EditorState, action: Extract<EditorAction, { type: 'deleteEntry' }>): EditorState {
  return {
    ...state,
    categories: state.categories.map(category =>
      category.id === action.categoryId
        ? { ...category, entries: category.entries.filter(entry => entry.id !== action.entryId) }
        : category
    )
  };
}

function clearErrors(state: EditorState): EditorState {
  return { ...state, addEntryError: null };
}

function replaceCategories(_state: EditorState, action: Extract<EditorAction, { type: 'replaceCategories' }>): EditorState {
  return {
    categories: action.data,
    newlyAddedCategoryId: null,
    addEntryError: null
  };
}

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'addCategory': return addCategory(state, action);
    case 'updateCategoryName': return updateCategoryName(state, action);
    case 'deleteCategory': return deleteCategory(state, action);
    case 'addEntry': return addEntry(state, action);
    case 'updateEntry': return updateEntry(state, action);
    case 'deleteEntry': return deleteEntry(state, action);
    case 'clearErrors': return clearErrors(state);
    case 'replaceCategories': return replaceCategories(state, action);
  }
}
