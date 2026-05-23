import type { EditorCategory } from "../types/editorTypes";

export function findCategoryWithEntry(
  categories: EditorCategory[],
  entry: string,
  excludeEntryId?: string
): EditorCategory | null {
  const entryNormalized = entry.toLowerCase();
  return categories.find(
    (category) => category.entries.some(
      e => e.id !== excludeEntryId && e.value.toLowerCase() === entryNormalized
    )
  ) ?? null;
}

export function isCategoryNameTaken(
  categories: EditorCategory[],
  name: string,
  excludeCategoryId?: string
): boolean {
  const nameNormalized = name.toLowerCase();
  return categories.some(
    c => c.id !== excludeCategoryId && c.name.toLowerCase() === nameNormalized
  );
}
