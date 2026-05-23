import { useState } from "react";
import { useEditor } from "../hooks/useEditor";
import { isCategoryNameTaken } from "../reducers/validators";

export function AddCategoryForm() {

  const { state: { categories }, dispatch } = useEditor();
  const [enteredCategoryName, setEnteredCategoryName] = useState('');
  const categoryName = enteredCategoryName.trim();

  const error = categoryName && isCategoryNameTaken(categories, categoryName) ?
    "Category with this name already exists." :
    null

  const handleAddCategory = () => {
    if (!categoryName || error) return;
    const id = crypto.randomUUID();
    dispatch({ type: 'addCategory', id: id, name: categoryName });
    setEnteredCategoryName('')
  };

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
    if (e.key === 'Escape') {
      setEnteredCategoryName('');
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 rounded-xl border-2 border-dashed border-slate-300 bg-white/60 px-3 py-2">
      <label htmlFor="newCategory" className="text-sm font-medium text-slate-600 whitespace-nowrap">
        Add category:
      </label>
      <input
        id='newCategory'
        value={enteredCategoryName}
        onKeyDown={handleNewCategoryKeyDown}
        onChange={(e) => setEnteredCategoryName(e.currentTarget.value)}
        enterKeyHint="done"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "newCategory-error" : undefined}
        className={`min-w-0 rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none ${error
          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          }`}
      />
      <button
        type="button"
        onClick={handleAddCategory}
        className="rounded-md bg-indigo-200 px-3 py-2 text-sm font-medium text-indigo-800 shadow-sm hover:bg-indigo-300 transition cursor-pointer"
      >
        Add
      </button>
      {error && (
        <p
          id="newCategory-error"
          role="alert"
          className="col-start-2 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}
