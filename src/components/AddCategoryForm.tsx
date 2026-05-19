import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/useEditor";

export function AddCategoryForm() {

  const { state: { addCategoryError, newlyAddedCategoryId }, dispatch } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newlyAddedCategoryId && inputRef.current)
      inputRef.current.value = '';
  },
    [newlyAddedCategoryId])

  const handleAddCategory = (title: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addCategory', id: id, title: title });
  }

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'clearErrors' })
      const value = e.currentTarget.value.trim();
      if (!value) return;
      handleAddCategory(value);
    }
    if (e.key === 'Escape') {
      dispatch({ type: 'clearErrors' })
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 rounded-xl border-2 border-dashed border-slate-300 bg-white/60 px-3 py-2">
      <label htmlFor="newCategory" className="text-sm font-medium text-slate-600 whitespace-nowrap">
        Add category:
      </label>
      <input
        id='newCategory'
        ref={inputRef}
        defaultValue=""
        onKeyDown={handleNewCategoryKeyDown}
        onChange={() => dispatch({ type: 'clearErrors' })}
        aria-invalid={addCategoryError ? true : undefined}
        aria-describedby={addCategoryError ? "newCategory-error" : undefined}
        className={`rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none ${addCategoryError
          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          }`}
      />
      {addCategoryError && (
        <p
          id="newCategory-error"
          role="alert"
          className="col-start-2 text-sm font-medium text-red-600"
        >
          {addCategoryError}
        </p>
      )}
    </div>
  )
}
