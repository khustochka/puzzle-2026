import { useState, useRef, useEffect } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorEntry } from "../types/editorTypes";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function EntryForm({ categoryId, entry }: {
  categoryId: string;
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
      dispatch({ type: 'updateEntry', categoryId: categoryId, entryId: entry.id, title: entryInputRef.current?.value });
    setIsEditing(false)
  }

  const handleEntryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEntryUpdate();
    if (e.key === 'Escape') setIsEditing(false)
  }

  return (
    <li
      className="inline-flex items-center gap-1 rounded-full bg-indigo-50 pl-3 pr-1 py-1 text-sm font-medium text-indigo-800 ring-1 ring-indigo-200"
    >
      {
        isEditing ?
          <div>
            <input
              defaultValue={entry.title}
              className="bg-transparent border-0 outline-none focus:ring-0 p-0 m-0 text-sm font-medium text-indigo-800"
              ref={entryInputRef}
              onKeyDown={handleEntryKeyDown}
            />
            <button onClick={handleEntryUpdate}>Save</button>
          </div> :
          <div>
            <span onClick={() => setIsEditing(true)}>
              {entry.title}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'deleteEntry', categoryId: categoryId, entryId: entry.id })}
              aria-label="Delete word"
              className="flex h-5 w-5 items-center justify-center rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
      }
    </li>
  )

}
