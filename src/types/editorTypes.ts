export type EditorEntry = {
  id: string
  value: string
}

export type EditorCategory = {
  id: string
  name: string
  entries: EditorEntry[]
}

export type EditorState = {
  categories: EditorCategory[];
  newlyAddedCategoryId: string | null;
  addCategoryError: string | null;
  addEntryError: { categoryId: string, message: string } | null;
};

export type EditorAction =
  | { type: 'addCategory'; id: string; name: string }
  | { type: 'updateCategoryName'; id: string; name: string }
  | { type: 'deleteCategory'; id: string }
  | { type: 'addEntry'; categoryId: string; entryId: string; value: string }
  | { type: 'updateEntry'; categoryId: string; entryId: string; value: string }
  | { type: 'deleteEntry'; categoryId: string; entryId: string }
  | { type: 'clearErrors' }
  | { type: 'replaceCategories', data: EditorCategory[] };
