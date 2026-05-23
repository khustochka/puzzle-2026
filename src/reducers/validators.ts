import type { EditorCategory } from "../types/editorTypes";

function normalize(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function findCategoryWithEntry(
  categories: EditorCategory[],
  entry: string,
  excludeEntryId?: string
): EditorCategory | null {
  const entryNormalized = normalize(entry);
  return categories.find(
    (category) => category.entries.some(
      e => e.id !== excludeEntryId && normalize(e.value) === entryNormalized
    )
  ) ?? null;
}

export function isCategoryNameTaken(
  categories: EditorCategory[],
  name: string,
  excludeCategoryId?: string
): boolean {
  const nameNormalized = normalize(name);
  return categories.some(
    c => c.id !== excludeCategoryId && normalize(c.name) === nameNormalized
  );
}
