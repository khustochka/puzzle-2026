import { useState } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorCategory, EditorEntry } from "../types/editorTypes";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { findCategoryWithEntry } from "../reducers/validators";

export function EntryForm({ category, entry }: {
  category: EditorCategory;
  entry: EditorEntry
}) {

  const [isEditing, setIsEditing] = useState(false);
  const { state: { categories }, dispatch } = useEditor()

  const [enteredEntryValue, setEnteredEntryValue] = useState(entry.value)
  const changedEntryValue = enteredEntryValue.trim();

  const categoryWithDup = isEditing &&
    changedEntryValue &&
    findCategoryWithEntry(categories, changedEntryValue, entry.id)

  const error = categoryWithDup ?
    `The entry "${changedEntryValue}" already exists in category "${categoryWithDup.name}"` :
    null

  const handleEntryUpdate = () => {
    if (!changedEntryValue || error) return;
    dispatch({ type: 'updateEntry', categoryId: category.id, entryId: entry.id, value: changedEntryValue });
    setIsEditing(false)
  }

  const handleEntryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEntryUpdate();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEnteredEntryValue(entry.value);
    }
  }

  const handleStartEditingKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(true);
    }
  }

  const handleDeleteEntry = () => {
    dispatch({ type: 'deleteEntry', categoryId: category.id, entryId: entry.id })
    console.log(`[Track] Deleted entry "${entry.value}" from category "${category.name}"`)
  }

  return (
    <li className="inline-flex flex-wrap items-center gap-1 max-w-full rounded-md bg-indigo-50 pl-2 pr-1 py-1 text-sm font-medium text-indigo-800 [counter-increment:entry] before:content-[counter(entry)_'.'] before:text-slate-400 before:text-xs before:tabular-nums before:mr-0.5 before:shrink-0">
      {
        isEditing ?
          <>
            <input
              value={enteredEntryValue}
              onChange={(e) => setEnteredEntryValue(e.currentTarget.value)}
              onKeyDown={handleEntryKeyDown}
              autoFocus
              enterKeyHint="done"
              maxLength={100}
              size={20}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `entry-${entry.id}-error` : undefined}
              className={`min-w-0 max-w-48 bg-white rounded-md border shadow-sm px-2 py-0.5 text-sm font-medium text-indigo-900 outline-none ${error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                }`}
            />
            <button
              type="button"
              onClick={handleEntryUpdate}
              disabled={!changedEntryValue || !!error}
              className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
            {error && (
              <p
                id={`entry-${entry.id}-error`}
                role="alert"
                className="basis-full text-xs font-medium text-red-600"
              >
                {error}
              </p>
            )}
          </> :
          <>
            <span
              tabIndex={0}
              onClick={() => setIsEditing(true)}
              onKeyDown={handleStartEditingKeyDown}
              aria-label={`Edit entry: ${entry.value}`}
              className="cursor-text rounded px-0.5 py-0.5 -mx-1 hover:bg-yellow-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
            >
              {entry.value}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-indigo-300 ml-2" />
            <button
              type="button"
              onClick={handleDeleteEntry}
              aria-label="Delete entry"
              className="flex h-5 w-5 items-center justify-center rounded text-red-500 hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </>
      }
    </li>
  )

}
