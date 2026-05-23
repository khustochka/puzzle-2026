import type { EditorCategory, EntryLookupMap, EntryLookupValue } from "../types/editorTypes";

export const buildEntryLookup = (categories: EditorCategory[]): EntryLookupMap =>
  categories.reduce(
    (lookup, category) => {
      category.entries.forEach((entry) =>
        lookup.set(normalize(entry.value), { entryId: entry.id, category })
      );
      return lookup;
    },
    new Map<string, EntryLookupValue>()
  )

export function normalize(s: string): string {
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

export function lookupCategoryWithEntry(
  lookup: EntryLookupMap,
  entry: string,
  excludeEntryId?: string
): EditorCategory | null {
  const entryNormalized = normalize(entry);
  const found = lookup.get(entryNormalized);
  if (!found || found.entryId === excludeEntryId) return null;
  return found.category;
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
