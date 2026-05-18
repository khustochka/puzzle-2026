import type { EditorBoardState, EditorCategory, EditorEntry } from "../types/editorTypes";
import { useState } from 'react';
import { CategoryForm } from "./CategoryForm";

export function EditorBoard({ initialState }: { initialState: EditorBoardState }) {

  const [state, setState] = useState(initialState);

  const addCategory = (title: string) => {
    setState({ ...state, categories: [...state.categories, buildCategory(title)] })
  }

  const buildCategory = (title: string): EditorCategory => ({
    id: crypto.randomUUID(),
    title: title,
    entries: []
  })

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (!value) return;
      addCategory(value);
      e.currentTarget.value = '';
    }
    if (e.key === 'Escape') {
      e.currentTarget.value = '';
    }
  };

  const updateCategoryTitle = (catId: string, newTitle: string) => {
    const updated = state.categories.map(category =>
      category.id === catId ? { ...category, title: newTitle } : category
    );
    setState({ ...state, categories: updated })
  }

  const deleteCategory = (catId: string) => {
    const updated = state.categories.filter(category =>
      category.id !== catId
    );
    setState({ ...state, categories: updated })
  }

  const handleAddWord = (catId: string, word: EditorEntry) => {
    const updated = state.categories.map(category =>
      category.id === catId ? { ...category, entries: [...category.entries, word] } : category
    );
    setState({ ...state, categories: updated })
  }

  const handleDeleteWord = (catId: string, wordId: string) => {
    const updated = state.categories.map(category =>
      category.id === catId ?
        {
          ...category,
          entries: category.entries.filter((word) => (word.id !== wordId))
        } :
        category
    );
    setState({ ...state, categories: updated })
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="w-full">
        <ol className="list-decimal pl-16 marker:text-3xl marker:font-bold marker:text-indigo-600 flex flex-col gap-6">
          {
            state.categories.map((category: EditorCategory) => (
              <CategoryForm
                key={category.id}
                category={category}
                onUpdateTitle={updateCategoryTitle}
                onDelete={deleteCategory}
                onAddWord={handleAddWord}
                onDeleteWord={handleDeleteWord}
              />
            ))
          }
        </ol>

        <div className="mt-8 mx-auto w-1/2 flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white/60 p-4">
          <label htmlFor="newCategory" className="text-sm font-medium text-slate-600 whitespace-nowrap">
            Add category:
          </label>
          <input
            id="newCategory"
            defaultValue=""
            onKeyDown={handleNewCategoryKeyDown}
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>
    </div>
  )
}
