import type { EditorCategory, EditorEntry } from "../types/editorTypes";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function CategoryForm({ category, onUpdateTitle, onDelete, onAddWord, onDeleteWord }: {
  category: EditorCategory;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onAddWord: (catId: string, word: EditorEntry) => void;
  onDeleteWord: (catId: string, wordId: string) => void;
}) {

  const totalEntries = category.entries.length;

  let status;
  if (totalEntries < 45) {
    status = <span>In progress</span>;
  } else if (totalEntries === 45) {
    status = <span>Complete</span>;
  } else {
    status = <span>Over capacity</span>;
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
    if (e.key === 'Escape') {
      e.currentTarget.value = category.title;
      e.currentTarget.blur();
    }
  }

  const handleNewWordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      onAddWord(category.id, buildEntry(value));
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
  };

  const buildEntry = (word: string): EditorEntry => ({
    id: crypto.randomUUID(),
    title: word
  })


  return (
    <li id={`category-${category.id}`} className="pl-2">
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <button
          type="button"
          onClick={() => onDelete(category.id)}
          aria-label="Delete category"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>

        <input
          defaultValue={category.title}
          onBlur={(e) => onUpdateTitle(category.id, e.currentTarget.value)}
          onKeyDown={(e) => handleTitleKeyDown(e)}
          className="w-full pr-10 text-2xl font-bold text-slate-800 bg-transparent border-0 border-b-2 border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none px-0 py-1"
        />

        <div>
          <div>Entries: {totalEntries}</div>
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
                  onClick={() => onDeleteWord(category.id, entry.id)}
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
