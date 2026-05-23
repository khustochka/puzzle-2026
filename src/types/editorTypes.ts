export type EditorEntry = {
  id: string
  title: string
}

export type EditorCategory = {
  id: string
  title: string
  entries: EditorEntry[]
}

export type EditorState = {
  categories: EditorCategory[];
  newlyAddedCategoryId: string | null;
  addCategoryError: string | null;
  addEntryError: { categoryId: string, message: string } | null;
};

export type EditorAction =
  | { type: 'addCategory'; id: string; title: string }
  | { type: 'updateCategoryTitle'; id: string; title: string }
  | { type: 'deleteCategory'; id: string }
  | { type: 'addEntry'; categoryId: string; entryId: string; title: string }
  | { type: 'updateEntry'; categoryId: string; entryId: string; title: string }
  | { type: 'deleteEntry'; categoryId: string; entryId: string }
  | { type: 'clearErrors' }
  | { type: 'replaceCategories', data: EditorCategory[] };
