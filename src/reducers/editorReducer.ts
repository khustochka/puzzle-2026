import type { EditorState, EditorCategory, EditorAction } from "../types/editorTypes";

function findCategoryWithEntry(categories: EditorCategory[], entry: string): EditorCategory | null {
  const entryNormalized = entry.toLowerCase();
  return categories.find(
    (category) => category.entries.some(e => e.value.toLowerCase() === entryNormalized)
  ) ?? null;
}

function isCategoryNameTaken(categories: EditorCategory[], name: string): boolean {
  const nameNormalized = name.toLowerCase();
  return categories.some(c => c.name.toLowerCase() === nameNormalized);
}

function addCategory(state: EditorState, action: Extract<EditorAction, { type: 'addCategory' }>): EditorState {
  const { categories } = state;
  if (isCategoryNameTaken(categories, action.name)) {
    return {
      ...state,
      newlyAddedCategoryId: null,
      addCategoryError: "Category with this name already exists."
    };
  }
  return {
    ...state,
    newlyAddedCategoryId: action.id,
    addCategoryError: null,
    categories: [...categories, { id: action.id, name: action.name, entries: [] }]
  };
}

function updateCategoryName(state: EditorState, action: Extract<EditorAction, { type: 'updateCategoryName' }>): EditorState {
  return {
    ...state,
    categories: state.categories.map(c => c.id === action.id ? { ...c, name: action.name } : c)
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
  const categoryWithDup = findCategoryWithEntry(categories, action.value);
  if (categoryWithDup) {
    return {
      ...state,
      addEntryError: {
        categoryId: action.categoryId,
        message: `The entry "${action.value}" already exists in category "${categoryWithDup.name}"`
      }
    };
  }
  return {
    ...state,
    addEntryError: null,
    categories: categories.map(category =>
      category.id === action.categoryId
        ? { ...category, entries: [...category.entries, { id: action.entryId, value: action.value }] }
        : category
    )
  };
}

function updateEntry(state: EditorState, action: Extract<EditorAction, { type: 'updateEntry' }>): EditorState {
  return {
    ...state,
    categories: state.categories.map(category =>
      category.id === action.categoryId
        ? {
            ...category,
            entries: category.entries.map(entry =>
              entry.id === action.entryId ? { ...entry, value: action.value } : entry
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
  return { ...state, addCategoryError: null, addEntryError: null };
}

function replaceCategories(_state: EditorState, action: Extract<EditorAction, { type: 'replaceCategories' }>): EditorState {
  return {
    categories: action.data,
    newlyAddedCategoryId: null,
    addCategoryError: null,
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
