import { useState } from "react";
import { useEditor } from "../hooks/useEditor";
import { findCategoryWithEntry } from "../reducers/validators";

export function AddEntryForm({ categoryId }: { categoryId: string }) {

  const { state: { categories }, dispatch } = useEditor();
  const [enteredEntryValue, setEnteredEntryValue] = useState('');

  const entryValue = enteredEntryValue.trim();

  // Do not run validation for empty input
  const categoryWithDup = entryValue && findCategoryWithEntry(categories, entryValue);

  const error = categoryWithDup ?
    `The entry "${entryValue}" already exists in category "${categoryWithDup.name}"` :
    null

  const handleAddEntry = () => {
    if (!entryValue || error) return;

    const id = crypto.randomUUID();
    dispatch({ type: 'addEntry', categoryId: categoryId, entryId: id, value: entryValue });

    setEnteredEntryValue('');
  };

  const handleNewEntryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEntry();
    }
    if (e.key === 'Escape') {
      setEnteredEntryValue('');
    }
  };

  return (
    <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-5">
      <div className="w-full sm:w-1/2 flex items-start gap-2">
        <label htmlFor={`newEntry-${categoryId}`} className="text-sm font-medium text-slate-500 whitespace-nowrap pt-1.5">
          Add entry:
        </label>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              id={`newEntry-${categoryId}`}
              value={enteredEntryValue}
              onChange={(e) => setEnteredEntryValue(e.currentTarget.value)}
              onKeyDown={handleNewEntryKeyDown}
              enterKeyHint="done"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `newEntry-${categoryId}-error` : undefined}
              className="flex-1 min-w-0 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="button"
              onClick={handleAddEntry}
              disabled={!entryValue || !!error}
              className="rounded-md bg-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-800 shadow-sm hover:bg-indigo-300 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          {error && (
            <p
              id={`newEntry-${categoryId}-error`}
              role="alert"
              className="text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
