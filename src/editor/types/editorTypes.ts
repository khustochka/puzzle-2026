import type { Category } from "../../shared/types";

export type EditorState = {
  categories: Category[];
  newlyAddedCategoryId: string | null;
};

export type EntryLookupValue = { entryId: string; category: Category }
export type EntryLookupMap = Map<string, EntryLookupValue>

export type EditorAction =
  | { type: 'addCategory'; id: string; name: string }
  | { type: 'updateCategoryName'; id: string; name: string }
  | { type: 'deleteCategory'; id: string }
  | { type: 'addEntry'; categoryId: string; entryId: string; value: string }
  | { type: 'updateEntry'; categoryId: string; entryId: string; value: string }
  | { type: 'deleteEntry'; categoryId: string; entryId: string }
  | { type: 'replaceCategories', data: Category[] };
