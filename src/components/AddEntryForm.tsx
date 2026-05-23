import { useRef } from "react";
import { useEditor } from "../hooks/useEditor";

export function AddEntryForm({ categoryId }: { categoryId: string }) {

  const { state: { addEntryError }, dispatch } = useEditor();

  const newEntryRef = useRef<HTMLInputElement>(null);

  const handleAddEntry = (value: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addEntry', categoryId: categoryId, entryId: id, value: value });
  }

  const submitNewEntry = () => {
    dispatch({ type: 'clearErrors' });
    const value = newEntryRef.current?.value.trim();
    if (!value) return;
    handleAddEntry(value);
    if (newEntryRef.current) newEntryRef.current.value = '';
    newEntryRef.current?.focus();
  };

  const handleNewEntryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitNewEntry();
    }
    if (e.key === 'Escape') {
      dispatch({ type: 'clearErrors' });
      e.currentTarget.value = '';
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
              ref={newEntryRef}
              defaultValue=""
              onKeyDown={handleNewEntryKeyDown}
              enterKeyHint="done"
              className="flex-1 min-w-0 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="button"
              onClick={submitNewEntry}
              className="rounded-md bg-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-800 shadow-sm hover:bg-indigo-300 transition cursor-pointer"
            >
              Add
            </button>
          </div>
          {addEntryError && addEntryError.categoryId == categoryId && (
            <p
              id="newCategory-error"
              role="alert"
              className="text-sm font-medium text-red-600"
            >
              {addEntryError.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
