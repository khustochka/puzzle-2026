import type { EditorState, EditorCategory, EditorAction } from "../types/editorTypes";

function findCategoryWithEntry(categories: EditorCategory[], entry: string): EditorCategory | null {
  const entryNormalized = entry.toLowerCase();
  return categories.find(
    (category) => category.entries.some(e => e.title.toLowerCase() === entryNormalized)
  ) ?? null;
}

function isCategoryTitleTaken(categories: EditorCategory[], title: string): boolean {
  const titleNormalized = title.toLowerCase();
  return categories.some(c => c.title.toLowerCase() === titleNormalized);
}

function addCategory(state: EditorState, action: Extract<EditorAction, { type: 'addCategory' }>): EditorState {
  const { categories } = state;
  if (isCategoryTitleTaken(categories, action.title)) {
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
    categories: [...categories, { id: action.id, title: action.title, entries: [] }]
  };
}

function updateCategoryTitle(state: EditorState, action: Extract<EditorAction, { type: 'updateCategoryTitle' }>): EditorState {
  return {
    ...state,
    categories: state.categories.map(c => c.id === action.id ? { ...c, title: action.title } : c)
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
  const categoryWithDup = findCategoryWithEntry(categories, action.title);
  if (categoryWithDup) {
    return {
      ...state,
      addEntryError: {
        categoryId: action.categoryId,
        message: `The entry "${action.title}" already exists in category "${categoryWithDup.title}"`
      }
    };
  }
  return {
    ...state,
    addEntryError: null,
    categories: categories.map(category =>
      category.id === action.categoryId
        ? { ...category, entries: [...category.entries, { id: action.entryId, title: action.title }] }
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
              entry.id === action.entryId ? { ...entry, title: action.title } : entry
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
    case 'updateCategoryTitle': return updateCategoryTitle(state, action);
    case 'deleteCategory': return deleteCategory(state, action);
    case 'addEntry': return addEntry(state, action);
    case 'updateEntry': return updateEntry(state, action);
    case 'deleteEntry': return deleteEntry(state, action);
    case 'clearErrors': return clearErrors(state);
    case 'replaceCategories': return replaceCategories(state, action);
  }
}
