import { useState, useRef, useEffect } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorCategory } from "../types/editorTypes";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EntryForm } from "./EntryForm";

export function CategoryForm({ category, ref }: {
  category: EditorCategory;
  ref: React.Ref<HTMLLIElement>
}) {

  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { state: { addWordError }, dispatch } = useEditor();

  useEffect(() => {
    if (isEditing) titleInputRef.current?.focus()
  },
    [isEditing]
  )

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

  const handleTitleUpdate = () => {
    if (titleInputRef.current)
      dispatch({ type: 'updateCategoryTitle', id: category.id, title: titleInputRef.current?.value?.trim() });
    setIsEditing(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleTitleUpdate();
    if (e.key === 'Escape') setIsEditing(false)
  }

  const handleDeleteCategory = () => {
    dispatch({ type: 'deleteCategory', id: category.id })
    console.log(`[Track] Deleted category "${category.title}" with entries:
      ${category.entries.map((entry) => entry.title).join(", ")}`)
  }

  const handleAddWord = (title: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addEntry', categoryId: category.id, entryId: id, title: title });
  }

  const handleNewWordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'clearErrors' });
      const value = e.currentTarget.value.trim();
      if (!value) return;
      handleAddWord(value);
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      dispatch({ type: 'clearErrors' });
      e.currentTarget.value = '';
    }
  };

  return (
    <li id={`category-${category.id}`} className="pl-2" ref={ref}>
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 pr-16 shadow-md">
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
            <div className="flex items-center gap-2">
              <input
                defaultValue={category.title}
                onKeyDown={(e) => handleTitleKeyDown(e)}
                ref={titleInputRef}
                className="flex-1 min-w-0 text-2xl font-bold leading-tight text-slate-800 bg-white rounded-md border border-slate-300 shadow-sm px-2 py-1 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={handleTitleUpdate}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                Save
              </button>
            </div> :
            <h2
              onClick={() => setIsEditing(true)}
              className="max-w-full text-2xl font-bold leading-tight text-slate-800 px-1 py-1 -mx-1 rounded cursor-text border-b-2 border-transparent hover:bg-yellow-100 transition"
            >
              {category.title}
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

        <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-5">
          <div className="w-1/2 flex items-start gap-2">
            <label htmlFor={`newWord-${category.id}`} className="text-sm font-medium text-slate-500 whitespace-nowrap pt-1.5">
              Add entry:
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <input
                id={`newWord-${category.id}`}
                defaultValue=""
                onKeyDown={handleNewWordKeyDown}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {addWordError && addWordError.categoryId == category.id && (
                <p
                  id="newCategory-error"
                  role="alert"
                  className="text-sm font-medium text-red-600"
                >
                  {addWordError.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
