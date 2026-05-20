import { useState, useRef, useEffect } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorCategory, EditorEntry } from "../types/editorTypes";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function EntryForm({ category, entry }: {
  category: EditorCategory;
  entry: EditorEntry
}) {

  const entryInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useEditor()

  useEffect(() => {
    if (isEditing) entryInputRef.current?.focus()
  },
    [isEditing]
  )
  const handleEntryUpdate = () => {
    if (entryInputRef.current)
      dispatch({ type: 'updateEntry', categoryId: category.id, entryId: entry.id, title: entryInputRef.current?.value?.trim() });
    setIsEditing(false)
  }

  const handleEntryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEntryUpdate();
    if (e.key === 'Escape') setIsEditing(false)
  }

  const handleDeleteEntry = () => {
    dispatch({ type: 'deleteEntry', categoryId: category.id, entryId: entry.id })
    console.log(`[Track] Deleted entry "${entry.title}" from category "${category.title}"`)
  }

  return (
    <li className="inline-flex items-center gap-1 max-w-full rounded-md bg-indigo-50 pl-2 pr-1 py-1 text-sm font-medium text-indigo-800 [counter-increment:entry] before:content-[counter(entry)_'.'] before:text-slate-400 before:text-xs before:tabular-nums before:mr-0.5 before:shrink-0">
      {
        isEditing ?
          <>
            <input
              defaultValue={entry.title}
              ref={entryInputRef}
              onKeyDown={handleEntryKeyDown}
              enterKeyHint="done"
              size={20}
              className="min-w-0 max-w-48 bg-white rounded-md border border-indigo-300 shadow-sm px-2 py-0.5 text-sm font-medium text-indigo-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="button"
              onClick={handleEntryUpdate}
              className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
            >
              Save
            </button>
          </> :
          <>
            <span
              onClick={() => setIsEditing(true)}
              className="cursor-text rounded px-0.5 py-0.5 -mx-1 hover:bg-yellow-100 transition"
            >
              {entry.title}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-indigo-300 ml-2" />
            <button
              type="button"
              onClick={handleDeleteEntry}
              aria-label="Delete word"
              className="flex h-5 w-5 items-center justify-center rounded text-red-500 hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </>
      }
    </li>
  )

}
