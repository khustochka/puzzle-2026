import { useState } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorCategory } from "../types/editorTypes";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EntryForm } from "./EntryForm";
import { AddEntryForm } from "./AddEntryForm";
import { isCategoryNameTaken } from "../reducers/validators";

export function CategoryForm({ category, ref }: {
  category: EditorCategory;
  ref: React.Ref<HTMLLIElement>
}) {

  const { state: { categories }, dispatch } = useEditor();
  const [isEditing, setIsEditing] = useState(false);

  const [enteredCategoryName, setEnteredCategoryName] = useState(category.name)
  const changedCategoryName = enteredCategoryName.trim();

  const nameUpdateError =
    isEditing &&
    changedCategoryName &&
    isCategoryNameTaken(categories, changedCategoryName, category.id) ?
    "Category with this name already exists." :
    null

  const totalEntries = category.entries.length;

  let status;
  let countColor;
  if (totalEntries < 45) {
    countColor = "text-amber-800";
    status = (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
        In progress
      </span>
    );
  } else if (totalEntries === 45) {
    countColor = "text-emerald-600";
    status = (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
        Complete
      </span>
    );
  } else {
    countColor = "text-red-600";
    status = (
      <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-red-700 ring-1 ring-red-200">
        Over capacity
      </span>
    );
  }

  const handleNameUpdate = () => {
    if (isEditing && changedCategoryName && !nameUpdateError) {
      dispatch({ type: 'updateCategoryName', id: category.id, name: changedCategoryName });
      setIsEditing(false);
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleNameUpdate();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEnteredCategoryName(category.name);
    }
  }

  const handleDeleteCategory = () => {
    dispatch({ type: 'deleteCategory', id: category.id })
    console.log(`[Track] Deleted category "${category.name}" with entries:
      ${category.entries.map((entry) => entry.value).join(", ")}`)
  }

  return (
    <li id={`category-${category.id}`} className="pl-1 sm:pl-2" ref={ref}>
      <div className="relative rounded-2xl border border-slate-200 bg-white p-3 pr-12 sm:p-6 sm:pr-16 shadow-md">
        <button
          type="button"
          onClick={handleDeleteCategory}
          aria-label="Delete category"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        {
          isEditing ?
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  value={enteredCategoryName}
                  onChange={(e) => setEnteredCategoryName(e.currentTarget.value)}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                  enterKeyHint="done"
                  maxLength={100}
                  aria-invalid={nameUpdateError ? true : undefined}
                  aria-describedby={nameUpdateError ? `category-${category.id}-name-error` : undefined}
                  className={`flex-1 min-w-0 text-2xl font-bold leading-tight text-slate-800 bg-white rounded-md border shadow-sm px-2 py-1 outline-none ${nameUpdateError
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    }`}
                />
                <button
                  type="button"
                  onClick={handleNameUpdate}
                  disabled={!changedCategoryName || !!nameUpdateError}
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
              {nameUpdateError && (
                <p
                  id={`category-${category.id}-name-error`}
                  role="alert"
                  className="text-sm font-medium text-red-600"
                >
                  {nameUpdateError}
                </p>
              )}
            </div> :
            <h2
              onClick={() => setIsEditing(true)}
              className="max-w-full text-2xl font-bold leading-tight text-slate-800 px-1 py-1 -mx-1 rounded cursor-text border-b-2 border-transparent hover:bg-yellow-100 transition"
            >
              {category.name}
            </h2>
        }

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold tabular-nums leading-none ${countColor}`}>
              {totalEntries}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              / 45 entries
            </span>
          </div>
          {status}
        </div>

        <ol className="mt-6 flex flex-wrap gap-2 list-none p-0 [counter-reset:entry]">
          {
            category.entries.map((entry) => (
              <EntryForm key={entry.id} entry={entry} category={category} />
            ))
          }
        </ol>

        <AddEntryForm categoryId={category.id} />
      </div>
    </li>
  )
}
