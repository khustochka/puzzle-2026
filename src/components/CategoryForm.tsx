import { useState, useRef, useEffect } from "react";
import { useEditor } from "../hooks/useEditor";
import type { EditorCategory } from "../types/editorTypes";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function CategoryForm({ category, ref }: {
  category: EditorCategory;
  ref: React.Ref<HTMLLIElement>
}) {

  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useEditor();

  useEffect(() => {
    titleInputRef.current?.focus()
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
      dispatch({ type: 'updateCategoryTitle', id: category.id, title: titleInputRef.current?.value });
    setIsEditing(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleTitleUpdate();
    if (e.key === 'Escape') setIsEditing(false)
  }

  const handleNewWordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      handleAddWord(value);
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
  };

  const handleAddWord = (title: string) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'addEntry', categoryId: category.id, entryId: id, title: title });
  }

  return (
    <li id={`category-${category.id}`} className="pl-2" ref={ref}>
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <button
          type="button"
          onClick={() => dispatch({ type: 'deleteCategory', id: category.id })}
          aria-label="Delete category"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        {
          isEditing ?
            <div>
              <input
                defaultValue={category.title}
                onKeyDown={(e) => handleTitleKeyDown(e)}
                ref={titleInputRef}
                className="w-full pr-10 text-2xl font-bold text-slate-800 bg-transparent border-0 border-b-2 border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none px-0 py-1"
              />
              <button onClick={handleTitleUpdate}>Save</button>
            </div> :
            <h2 className="hover:bg-yellow-100 inline-block" onClick={() => { setIsEditing(true) }}>
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

        <ol className="mt-4 flex flex-wrap gap-2 list-none p-0">
          {
            category.entries.map((entry) => (
              <li
                key={entry.id}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 pl-3 pr-1 py-1 text-sm font-medium text-indigo-800 ring-1 ring-indigo-200"
              >
                <input
                  defaultValue={entry.title}
                  className="bg-transparent border-0 outline-none focus:ring-0 p-0 m-0 text-sm font-medium text-indigo-800"
                  size={Math.max(entry.title.length, 4)}
                />
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'deleteEntry', categoryId: category.id, entryId: entry.id })}
                  aria-label="Delete word"
                  className="flex h-5 w-5 items-center justify-center rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </li>
            ))
          }
        </ol>

        <div className="mt-4 mx-auto w-1/2 flex items-center gap-2">
          <label htmlFor={`newWord-${category.id}`} className="text-sm font-medium text-slate-500 whitespace-nowrap">
            Add entry:
          </label>
          <input
            id={`newWord-${category.id}`}
            defaultValue=""
            onKeyDown={handleNewWordKeyDown}
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
    </li>
  )
}
